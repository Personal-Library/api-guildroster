const pg = require('pg');

class Pool {
	_pool = null;

	connect(options) {
		this._pool = new pg.Pool(options);
		// Needed to validate our connection to the DB
		return this._pool.query('SELECT 1 + 1;');
	}

	close() {
		return this._pool.end();
	}

	query(sql, params) {
		return this._pool.query(sql, params);
	}
}

module.exports = new Pool();
