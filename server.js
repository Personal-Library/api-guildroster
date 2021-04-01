const app = require('./');
const pool = require('./db/pool');

const establishConnections = async () => {
	try {
		await pool.connect({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		});
		console.log('Postgres connection established, trying main server now...');
		app.listen(process.env.PORT, () => {
			console.log(`Main server connected. Now listening on port: ${process.env.PORT}`);
		});
	} catch (error) {
		console.error(error);
	}
};

establishConnections();
