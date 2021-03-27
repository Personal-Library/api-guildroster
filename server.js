const app = require('./');

app.listen(process.env.PORT, () => {
	console.log(`App is live on port: ${process.env.PORT}`);
});
