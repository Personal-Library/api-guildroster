// Database connection and configuration
const { Pool } = require('pg');

// Pool will connect to your local postgress server or Heroku's provided by the URL
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = pool;
