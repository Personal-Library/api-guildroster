const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).send({ msg: 'Please sign in' });

	// Take out the Bearer tag added on in the client
	token = token.replace('Bearer ', '');

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).json({
				success: false,
				msg: 'Please sign in',
			});
		} else {
			// user variable { username: 'test', ait: 123123123, exp: 123123123 }
			// Set req.user so other routes can use it
			req.user = user;
			next();
		}
	});
};

module.exports = requireAuth;
