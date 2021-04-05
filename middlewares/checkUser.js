const bcrypt = require('bcrypt');

const checkPassword = async (plainTextPassword, hash) => {
	const match = await bcrypt.compare(plainTextPassword, hash);
	return match;
};

module.exports = checkPassword;
