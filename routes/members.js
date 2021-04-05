const express = require('express');
const {
	getAllMembers,
	getOneMember,
	createMember,
	deleteMember,
	putMember,
} = require('../controllers/membersController');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.get('/', getAllMembers);
router.get('/:id', getOneMember);
router.post('/', createMember);
router.delete('/:id', requireAuth, deleteMember);
router.put('/:id', requireAuth, putMember);

module.exports = router;
