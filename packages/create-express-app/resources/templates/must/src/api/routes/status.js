const { Router } = require('express');

const route = Router();

module.exports = (app) => {
    app.use('/status', route);

    route.get('/', (req, res) => {
        res.status(200).end();
    });
    route.head('/', (req, res) => {
        res.status(200).end();
    });
};