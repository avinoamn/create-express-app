const { Router } = require('express');
const hello = require('./routes/hello');
const express = require('./errorHandlers/express');

const routes = () => {
	const app = Router();
    hello(app);

	return app;
};

const errorHandlers = () => {
    const app = Router();
    express(app);

	return app;
};

module.exports = {
    routes,
    errorHandlers
};