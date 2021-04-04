const requireAuth = (req, res, next) => {
	console.log('FROM REQUIREAUTH:', req.user);
	if (req.user) {
		next();
	} else {
		res.send({ msg: 'You are not signed in' });
	}
};

module.exports = requireAuth;
