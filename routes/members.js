const express = require('express');
const { getMembers, getOneMember, createMember, deleteMember, updateMember } = require('../queries/membersQueries');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const data = await getMembers();
		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const data = await getOneMember(id);
		res.send(data);
	} catch (error) {
		console.error(error);
	}
});

// 'classname' must be on the request body, not 'class'!
router.post('/', async (req, res) => {
	const { username, rank, race, classname } = req.body;
	try {
		const data = await createMember(username, rank, race, classname);
		res.send(data);
	} catch (error) {
		console.error(error)
	}
})

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const data = await deleteMember(id);
		res.send({ msg: "Member successfully deleted.", data })
	} catch (error) {
		console.error(error)
	}	
})

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const { username, rank, race, classname } = req.body;
	try {
		const data = await updateMember(username, rank, race, classname, id)
		res.send({ msg: "Member successfully updated.", data})
	} catch (error) {
		console.error(error)
	}
})

module.exports = router;
