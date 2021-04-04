const jwt = require('jsonwebtoken');

const generateToken = (user) => {
	// Don't use password and other sensitive fields
	// Use fields that may be useful in other parts of the app
	const userObj = { username: user.username };

	const token = jwt.sign(userObj, process.env.JWT_SECRET, {
		expiresIn: 1800, // seconds, or 30 minutes
	});

	return token;
};

module.exports = {
	generateToken,
};
