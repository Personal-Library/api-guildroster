const express = require('express');
const Joi = require('joi');

const {
	getMembers,
	getOneMember,
	createMember,
	deleteMember,
	updateMember,
} = require('../queries/membersQueries');

const router = express.Router();

// Ended up defining schema here because it would not validate otherwise...
const schema = Joi.object({
	username: Joi.string().alphanum().min(3).max(25).trim().required(),
	rank: Joi.string().alphanum().min(3).max(25).trim().required(),
	race: Joi.string().alphanum().min(3).max(25).trim().required(),
	classname: Joi.string().alphanum().min(3).max(25).trim().required(),
});

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
		res.send({ msg: 'That was probably an invalid id.' });
		console.error(error);
	}
});

// 'classname' must be on the request body, not 'class'!
router.post('/', async (req, res) => {
	const { username, rank, race, classname } = req.body;

	// Create object to be validated from request body
	const memberObject = { username, rank, race, classname };
	const { error } = schema.validate(memberObject);

	// If validation error exists, then send error
	if (error) {
		res.status(400);
		res.send(error);
	} else {
		// Else try running the sql query
		try {
			const data = await createMember(username, rank, race, classname);
			res.status(201);
			res.send(data);
		} catch (error) {
			console.error(error);
		}
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const data = await deleteMember(id);
		res.send({ msg: 'Member successfully deleted.', data });
	} catch (error) {
		res.send({ msg: 'That was probably an invalid id.' });
		console.error(error);
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const { username, rank, race, classname } = req.body;

	const membersObject = { username, rank, race, classname };
	const { error } = schema.validate(membersObject);

	if (error) {
		res.status(400);
		res.send(error);
	} else {
		try {
			const data = await updateMember(username, rank, race, classname, id);
			res.send({ msg: 'Member successfully updated.', data });
		} catch (error) {
			res.send({ msg: 'That was probably an invalid id.' });
			console.error(error);
		}
	}
});

module.exports = router;
