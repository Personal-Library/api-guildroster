const errorHandler = (error, req, res, next) => {
	res.status(res.statusCode || 500);
	res.send({
		error: error,
	});
};

module.exports = errorHandler;
