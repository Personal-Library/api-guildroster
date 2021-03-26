// General queries only

const pool = require('../db');

const testDBConnection = async () => {
	console.log('The test query is running!');
	const { rows } = await pool.query('SELECT 2 + 2;');
	return rows[0];
};

module.exports = { testDBConnection };
