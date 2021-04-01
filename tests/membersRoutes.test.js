const request = require('supertest');
const app = require('..');
const pool = require('../db/pool');

/**
 * Don't need a complicated CONTEXT setup, just connect to the
 * TESTING DATABASE and do the database setup here!
 * Check bottom for more notes.
 */

beforeAll(async () => {
	await pool.connect({
		connectionString: process.env.TEST_DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});
	await pool.query('DROP TABLE members');
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
		classname: 'Test',
		rank: 'Test',
		race: 'Test',
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
		username: 'TestPUT',
		classname: 'TestPUT',
		rank: 'TestPUT',
		race: 'TestPUT',
	};

	await request(app)
		.put('/members/1')
		.send(testData)
		.expect(200)
		.then((res) => {
			let data = res.body.data[0];
			expect(data.id).toBeDefined();
			expect(data.username).toBeDefined();
			expect(data.rank).toBeDefined();
			expect(data.race).toBeDefined();
			expect(data.classname).toBeDefined();
			expect(data.joined).toBeDefined();
			// console.log('From PUT test', data);
		});
});

test('DELETE /members/1 endpoint', async () => {
	await request(app)
		.delete('/members/1')
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
