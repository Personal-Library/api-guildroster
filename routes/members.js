const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send({ msg: 'Member router success!' });
});

module.exports = router;
