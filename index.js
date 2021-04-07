require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// FILE IMPORTS
const membersRouter = require('./routes/members');
const authRouter = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');

// INSTANTIATE SERVER
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/members', membersRouter);
app.use('/auth', authRouter);
app.use(express.static('public'));

app.get('/docs', (req, res) => {
	res.sendFile(path.join(__dirname, '/public', 'docs.html'));
});

// ERROR CATCH-ALL
app.use(errorHandler);

module.exports = app;
