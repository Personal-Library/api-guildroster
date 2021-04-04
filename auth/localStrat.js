const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserByName, findUserById } = require('../queries/authQueries');

passport.use(
	new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
		// Check DB to see if user with username exists
		const existingUser = await findUserByName(req.body.username);
		// console.log('From localStrat.js', existingUser);
		// If that user does not exist, send reply
		if (!existingUser) {
			return done(null, false, { msg: 'Incorrect username' });
		}

		// If the supplied password does not match, send reply
		if (existingUser.password !== req.body.password) {
			return done(null, false, { msg: 'Incorrect password' });
		}

		// Else we've made it pass the checks, reply with userInfo
		return done(null, existingUser);
	})
);

passport.serializeUser(async (user, done) => {
	console.log('SERIALIZING USER:', user.username);
	done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
	console.log('DESERIALIZING USER:', username);
	const user = await findUserByName(username);
	console.log(user);
	if (user) {
		done(null, user);
	} else {
		done(null, null);
	}
});

module.exports = passport;
