/**
 * 'members' is pluralized to match table name, any queries on the members
 * table will go below
 */
const pool = require('../db');

const find = async () => {
	const { rows } = await pool.query('SELECT * FROM members;');
	return rows;
};

const findById = async (id) => {
	const { rows } = await pool.query('SELECT * FROM members WHERE id = $1;', [id]);
	return rows;
};

// Note that 'class' is a reserved variable in JavaScript
const insert = async (username, rank, race, classname) => {
	const {
		rows,
	} = await pool.query(
		'INSERT INTO members (username, rank, race, class) VALUES ($1, $2, $3, $4) RETURNING *;',
		[username, rank, race, classname]
	);
	return rows;
};

const findByIdAndDelete = async (id) => {
	const { rows } = await pool.query('DELETE FROM members WHERE id = $1 RETURNING *;', [id]);
	return rows;
};

const findByIdAndUpdate = async (username, rank, race, classname, id) => {
	const {
		rows,
	} = await pool.query(
		'UPDATE members SET username = $1, rank = $2, race = $3, class = $4 WHERE id = $5 RETURNING *;',
		[username, rank, race, classname, id]
	);
	return rows;
};

module.exports = { find, findById, insert, findByIdAndDelete, findByIdAndUpdate };
