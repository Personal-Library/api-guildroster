const pool = require('../db/pool');

const findUserByName = async (username, cb) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1;', [username]);
	return rows[0];
};

const findUserById = async (userId, cb) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [userId]);
	return rows[0];
};

const findPassword = async (username, password, cb) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2;', [
		username,
		password,
	]);
	return rows[0];
};

module.exports = {
	findUserByName,
	findUserById,
	findPassword,
};
