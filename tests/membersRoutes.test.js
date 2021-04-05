const request = require('supertest');
const pool = require('../db/pool');
const app = require('..');

/**
 * We are able to make a create a user on the users table because the beforeAll
 * within the authRoutes.test.js file has already created it. We just define some
 * local state at the top of the file here with the bearer token for this new
 * user in order to access authorized routes.
 */

const testData = { username: 'Testuser1', password: 'Testpass1' };
let state = {};

beforeAll(async () => {
	await pool.connect({
		connectionString: process.env.TEST_DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});
	await pool.query('DROP TABLE members;');
	await pool.query(`
		CREATE TABLE members (
			id SERIAL PRIMARY KEY,
			username VARCHAR(25) NOT NULL,
			rank VARCHAR(25) NOT NULL,
			race VARCHAR(25) NOT NULL,
			classname VARCHAR(25) NOT NULL,
			joined TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
	`);
	await request(app)
		.post('/auth/jwt/signup')
		.send(testData)
		.expect(200)
		.then((res) => (state = res.body));
});

afterAll(() => {
	pool.close();
});

// Just to make sure the universe is right and Jest is working...
test('2 + 2 should equal 4', () => {
	expect(2 + 2).toBe(4);
});

test('POST /members endpoint', async () => {
	const testData = {
		username: 'Test',
		classname: 'Priest',
		rank: 'Member',
		race: 'Night Elf',
	};

	await request(app)
		.post('/members')
		.send(testData)
		.expect(201)
		.then((res) => {
			let data = res.body[0];
			expect(data.id).toBeDefined();
			expect(data.username).toBeDefined();
			expect(data.rank).toBeDefined();
			expect(data.race).toBeDefined();
			expect(data.classname).toBeDefined();
			expect(data.joined).toBeDefined();
			// console.log('From POST test', res.body[0]);
		});
});

test('GET /members endpoint', async () => {
	await request(app)
		.get('/members')
		.expect(200)
		.then((res) => {
			expect(Array.isArray(res.body)).toBeTruthy();
			// console.log('From GET ALL test', res.body);
		});
});

test('GET /members/1 endpoint', async () => {
	await request(app)
		.get('/members/1')
		.expect(200)
		.then((res) => {
			expect(Array.isArray(res.body)).toBeTruthy();
			let data = res.body[0];
			expect(data.id).toBeDefined();
			expect(data.username).toBeDefined();
			expect(data.rank).toBeDefined();
			expect(data.race).toBeDefined();
			expect(data.classname).toBeDefined();
			expect(data.joined).toBeDefined();
			// console.log('From GET ONE test', res.body);
		});
});

test('PUT /members/1 endpoint', async () => {
	const testData = {
		username: 'Test',
		classname: 'Warrior',
		rank: 'Officer',
		race: 'Human',
	};

	await request(app)
		.put('/members/1')
		.set('Authorization', `Bearer ${state.token}`)
		.send(testData)
		.expect(200)
		.then((res) => {
			let data = res.body.data[0];
			expect(data.id).toBe(1);
			expect(data.username).toBe('Test');
			expect(data.rank).toBe('Officer');
			expect(data.race).toBe('Human');
			expect(data.classname).toBe('Warrior');
			expect(data.joined).toBeDefined();
			// console.log('From PUT test', data);
		});
});

test('DELETE /members/1 endpoint', async () => {
	await request(app)
		.delete('/members/1')
		.set('Authorization', `Bearer ${state.token}`)
		.expect(200)
		.then((res) => {
			expect(res.ok).toBeTruthy();
			// console.log(res);
			// console.log(JSON.parse(res.text).msg);
		});
});

/**
 * Full CRUD route for testing, at the beginning we drop the members table and
 * create a brand new one, then we do our POST, GET, PUT, and DELETE requests
 * in that order so that none of them conflict with the other. If all of them pass
 * then the routes are working at least at a basic level!
 */
