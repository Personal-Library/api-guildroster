const express = require('express');
const passport = require('../auth/localStrat');
const { findUserByName, saveUser } = require('../queries/authQueries');
const requireAuth = require('../middlewares/requireAuth');
const bcrypt = require('bcrypt');
const router = express.Router();
const Joi = require('joi');
const { default: db } = require('node-pg-migrate/dist/db');
const { generateToken } = require('../auth/jwt');

/**
 * PASSPORT-LOCAL ROUTES
 */

router.get('/', async (req, res) => {
	const user = await findUserByName('guest');
	res.send(user);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.send({ msg: 'Success' });
});

router.get('/hello', requireAuth, (req, res) => {
	res.send({ msg: 'Hello from Auth Route!' });
});

/**
 * JWT ROUTES
 */

// Create new user, store hashed password
router.post('/jwt/signup', (req, res, next) => {
	const { username, password } = req.body;
	const usernameSchema = Joi.string().min(3).max(50).alphanum().required().trim();
	const passwordSchema = Joi.string().min(3).max(20).required().trim();

	// Validate password with Joi
	const passwordValidationRes = passwordSchema.validate(password);
	if (passwordValidationRes.error) {
		return res.status(400).send(passwordValidationRes.error.details);
	}

	// Validate username with Joi
	const usernameValidationRes = usernameSchema.validate(username);
	if (usernameValidationRes.error) {
		return res.status(400).send(usernameValidationRes.error.details);
	}

	bcrypt.hash(password, 10, async (err, hash) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ msg: 'An error occurred while hashing your password.' });
		}

		// Try saving user info to postgres
		const dbResponse = await saveUser(username, hash);
		if (typeof dbResponse === 'object') {
			// If db returns rows, that means the save was successful
			const token = generateToken({ username });
			res.status(200).json({ username: username, token: token });
		} else {
			// If we get a string back, then there was an error
			res.status(400).send({ msg: dbResponse });
		}
	});
});

// Login with token
router.post('/jwt/login', (req, res) => {
	res.send({ msg: 'login route' });
});

// Get current user from token
router.get('/jwt/refreshauthstate', (req, res) => {
	res.send({ msg: 'refresh auth state' });
});

module.exports = router;
