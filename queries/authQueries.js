const pool = require('../db/pool');

const saveUser = async (username, hashedPassword) => {
	try {
		const { rows } = await pool.query(
			`
			INSERT INTO users (username, password) 
			VALUES ($1, $2) RETURNING *;
			`,
			[username, hashedPassword]
		);
		return rows[0];
	} catch (error) {
		console.log(error.detail); // is of type 'string'
		return error.detail;
	}
};

const findUserByName = async (username) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE username = $1;', [username]);
	return rows[0];
};

const findUserById = async (userId) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [userId]);
	return rows[0];
};

module.exports = {
	findUserByName,
	findUserById,
	saveUser,
};
