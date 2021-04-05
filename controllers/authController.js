const Joi = require('joi');
const bcrypt = require('bcrypt');
const { findUserByName, saveUser } = require('../queries/authQueries');
const { generateToken } = require('../auth/jwt');

const postSignupUser = (req, res) => {
	let { username, password } = req.body;
	username = username.toLowerCase();

	const usernameSchema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required();
	const passwordSchema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,20}$')).required();

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
			console.error(err);
			return res.status(500).send({ msg: 'An error occurred while hashing your password.' });
		}

		// Try saving user info to postgres
		const dbResponse = await saveUser(username, hash);
		if (typeof dbResponse !== 'object') {
			// If we get a string back, then there was an error
			return res.status(400).send({ msg: dbResponse });
		}

		const token = generateToken({ username });
		res.status(200).json({ username: username, token: token });
	});
};

const postLogin = async (req, res) => {
	let { username, password } = req.body;
	username = username.toLowerCase();
	const dbResponse = await findUserByName(username);

	// If no user was found, dbResponse is 'undefined'
	if (typeof dbResponse !== 'object') {
		return res.status(400).send({ msg: 'Username was not found.' });
	}

	// If password does not match the stored password, passwordsMatch is falsy
	const passwordsMatch = await bcrypt.compare(password, dbResponse.password);
	if (dbResponse.username && passwordsMatch) {
		const token = generateToken({ username });
		res.status(200).json({ username: username, token: token });
	} else {
		res.status(400).send({ msg: 'Incorrect password.' });
	}
};

const testAuthStatus = (req, res) => {
	res.send({ success: true, msg: 'If you see this you are signed in.' });
};

module.exports = {
	postSignupUser,
	postLogin,
	testAuthStatus,
};
