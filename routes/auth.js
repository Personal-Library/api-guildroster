const express = require('express');
const passport = require('../auth/localStrat');
const { findUserByName } = require('../queries/authQueries');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

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

module.exports = router;
