const Joi = require('joi');

const memberSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(25).trim().required(),
	rank: Joi.string().alphanum().min(3).max(25).trim().required(),
	race: Joi.string().alphanum().min(3).max(25).trim().required(),
	class: Joi.string().alphanum().min(3).max(25).trim().required(),
});

modules.export = memberSchema;
