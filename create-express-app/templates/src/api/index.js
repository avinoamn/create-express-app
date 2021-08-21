const { Router } = require('express');
const hello = require('./routes/hello');
const status = require('./routes/status');
const express = require('./errorHandlers/express');

const statusEndpoints = () => {
    const app = Router();
    status(app);

	return app;
};

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
    statusEndpoints,
    routes,
    errorHandlers
};