const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { postSignupUser, postLogin, testAuthStatus } = require('../controllers/authController');

router.get('/jwt/test', requireAuth, testAuthStatus);
router.post('/jwt/signup', postSignupUser);
router.post('/jwt/login', postLogin);

module.exports = router;
