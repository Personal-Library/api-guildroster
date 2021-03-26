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
app.use('/members', membersRouter)

// BASE ROUTES
app.get('/', (req, res) => {
	res.send({ msg: 'Hello World' });
});

app.get('/test', async (req, res) => {
	const responseFromDB = await testDBConnection();
	res.send(responseFromDB);
});

// SERVER BEGINS LISTENING
app.listen(PORT, () => {
	console.log(`App is live on PORT: ${PORT}`);
});
