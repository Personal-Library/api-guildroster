const Joi = require('joi');
const {
	find,
	findById,
	insert,
	findByIdAndDelete,
	findByIdAndUpdate,
} = require('../queries/membersQueries');

const schema = Joi.object({
	username: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
	rank: Joi.string().valid('Officer', 'Member, Peon'),
	race: Joi.string().valid('Human', 'Dwarf', 'Night Elf', 'Gnome', 'Draenei', 'Worgen', 'Pandaren'),
	classname: Joi.string().valid(
		'Death Knight',
		'Demon Hunter',
		'Druid',
		'Hunter',
		'Mage',
		'Monk',
		'Paladin',
		'Priest',
		'Rogue',
		'Shaman',
		'Warlock',
		'Warrior'
	),
});

const getAllMembers = async (req, res) => {
	try {
		const data = await find();
		res.send(data);
	} catch (error) {
		console.error(error);
	}
};

const getOneMember = async (req, res) => {
	const id = req.params.id;
	try {
		const data = await findById(id);
		res.send(data);
	} catch (error) {
		res.send({ msg: 'That was probably an invalid id.' });
		console.error(error);
	}
};

// 'classname' must be on the request body, not 'class'!
const createMember = async (req, res) => {
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
			const data = await insert(username, rank, race, classname);
			res.status(201);
			res.send(data);
		} catch (error) {
			console.error(error);
		}
	}
};

const deleteMember = async (req, res) => {
	const id = req.params.id;
	try {
		const data = await findByIdAndDelete(id);
		res.send({ msg: 'Member successfully deleted.', data });
	} catch (error) {
		res.send({ msg: 'That was an invalid id.' });
		console.error(error);
	}
};

const putMember = async (req, res) => {
	const id = req.params.id;
	const { username, rank, race, classname } = req.body;

	const membersObject = { username, rank, race, classname };
	const { error } = schema.validate(membersObject);

	if (error) {
		res.status(400);
		res.send(error);
	} else {
		try {
			const data = await findByIdAndUpdate(username, rank, race, classname, id);
			res.send({ msg: 'Member successfully updated.', data });
		} catch (error) {
			res.send({ msg: 'That was an invalid id.' });
			console.error(error);
		}
	}
};

module.exports = {
	getAllMembers,
	getOneMember,
	createMember,
	deleteMember,
	putMember,
};
