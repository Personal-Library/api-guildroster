const errorHandler = (error, req, res, next) => {
	res.status(res.statusCode || 500);
	res.send({
		msg: 'There was an error',
		error: error,
	});
};

module.exports = errorHandler;
