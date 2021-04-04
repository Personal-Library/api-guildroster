require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// FILE IMPORTS
const membersRouter = require('./routes/members');
const authRouter = require('./routes/auth');
const requireAuth = require('./middlewares/requireAuth');
const corsOptions = {
	origin: 'http://localhost:3001',
	methods: 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
	credentials: true,
	allowedHeaders:
		'Origin, Content-Type, Authorization, X-Requested-With, X-IP, X-AUTHENTICATION, Accept, Access-Control-Allow-Origin, sessionId',
};

// SETUP
const app = express();


// MIDDLEWARES
app.use(cors(corsOptions));
// Default storage in memory, but should be moved to a db
app.use(express.json());
app.use(cookieParser('anything'));
app.use(
	session({
		secret: 'anything',
		resave: false,
		saveUninitialized: true,
		cookie: {
			sameSite: 'lax',
			secure: 'auto',
		},
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/members', membersRouter);
app.use('/auth', authRouter);

// BASE ROUTES
app.get('/', (req, res) => {
	res.send({ msg: 'Hello world!' });
});

app.get('/hello', requireAuth, (req, res) => {
	res.send({ msg: 'If you see this, you should be authorized' });
});

module.exports = app;
