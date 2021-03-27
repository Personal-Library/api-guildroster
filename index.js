require('dotenv').config();
const express = require('express');
const cors = require('cors');

// FILE IMPORTS
const { testDBConnection } = require('./queries');
const membersRouter = require('./routes/members');

// SETUP
const PORT = process.env.PORT;
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/members', membersRouter);

// BASE ROUTES
app.get('/', (req, res) => {
	res.send({ msg: 'Why hello there.' });
});

app.get('/test', async (req, res) => {
	try {
		const responseFromDB = await testDBConnection();
		res.status(418);
		res.send({ msg: 'If you see the result of 2+2, then everything is groovy!', responseFromDB });
	} catch (error) {
		res.status(400);
		res.send({ msg: 'There has been an error, likely with your connection params.' });
		console.error(error);
	}
});

// SERVER BEGINS LISTENING
app.listen(PORT, () => {
	console.log(`App is live on PORT: ${PORT}`);
});
