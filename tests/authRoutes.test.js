const request = require('supertest');
const app = require('..');
const pool = require('../db/pool');

beforeAll(async () => {
	await pool.connect({
		connectionString: process.env.TEST_DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});
	await pool.query('DROP TABLE users;');
	await pool.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(200) NOT NULL
    );
  `);
});

afterAll(() => {
	pool.close();
});

// Store for state
let state = {};

// Just to make sure the universe is right and Jest is working...
test('2 + 2 should equal 4', () => {
	expect(2 + 2).toBe(4);
});

test('POST /auth/jwt/signup', async () => {
	const testData = {
		username: 'Testuser',
		password: 'Testpass',
	};

	await request(app)
		.post('/auth/jwt/signup')
		.send(testData)
		.expect(200)
		.then((res) => {
			state = res.body; // Initialize state for token here
			let data = res.body;
			expect(data.username).toBe('testuser');
			expect(data.token).toBeDefined();
		});
});

test('POST /auth/jwt/login', async () => {
	// ERROR HERE, USER SHOULD BE ABLE TO SIGN IN WITH CASE INSENSITIVITY
	const testData = {
		username: 'Testuser',
		password: 'Testpass',
	};

	await request(app)
		.post('/auth/jwt/login')
		.send(testData)
		.expect(200)
		.then((res) => {
			let data = res.body;
			expect(data.username).toBe('testuser');
			expect(data.token).toBeDefined();
		});
});

test('GET /auth/jwt/test', async () => {
	await request(app)
		.get('/auth/jwt/test')
		.set('Authorization', `Bearer ${state.token}`) // Use token state
		.expect(200)
		.then((res) => {
			let data = res.body;
			expect(data.success).toBeTruthy();
		});
});
