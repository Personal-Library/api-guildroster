const express = require('express');
const router = express.Router();
const { postSignupUser, postLogin } = require('../controllers/authController');

router.post('/jwt/signup', postSignupUser);
router.post('/jwt/login', postLogin);

module.exports = router;
