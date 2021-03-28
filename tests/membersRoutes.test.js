const app = require('..');
const supertest = require('supertest');
const pool = require('../db');

afterAll((done) => {
	pool.end();
	done();
});

// This passes because 1 === 1
test('2 + 2 should equal 4', () => {
	expect(2 + 2).toBe(4);
});

test('GET /members endpoint', async () => {
	await supertest(app)
		.get('/members')
		.expect(200)
		.then((res) => {
			expect(Array.isArray(res.body)).toBeTruthy();
			// console.log(res.body);
		});
});

test('GET /members/1 endpoint', async () => {
	await supertest(app)
		.get('/members/1')
		.expect(200)
		.then((res) => {
			expect(Array.isArray(res.body)).toBeTruthy();
			let data = res.body[0];
			expect(data.id).toBe(1);
			expect(data.username).toBe('Rheyse');
			expect(data.rank).toBe('Officer');
			expect(data.race).toBe('NightElf');
			expect(data.class).toBe('Druid');
			expect(data.joined).toBeDefined();
			// console.log(res.body);
		});
});
