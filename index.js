require('dotenv').config();
const express = require('express');
const cors = require('cors');

// FILE IMPORTS
const membersRouter = require('./routes/members');
const authRouter = require('./routes/auth');

// SETUP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/members', membersRouter);
app.use('/auth', authRouter);

// BASE ROUTES
app.get('/', (req, res) => {
	res.send({ msg: 'Hello world!' });
});

module.exports = app;
