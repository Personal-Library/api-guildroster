const express = require('express');
const {
	getAllMembers,
	getOneMember,
	createMember,
	deleteMember,
	putMember,
} = require('../controllers/membersController');

const router = express.Router();

router.get('/', getAllMembers);
router.get('/:id', getOneMember);
router.post('/', createMember);
router.delete('/:id', deleteMember);
router.put('/:id', putMember);

module.exports = router;