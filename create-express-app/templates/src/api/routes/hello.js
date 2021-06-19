const { Router } = require('express');

const route = Router();

module.exports = (app) => {
    app.use(route);

    /// says 'hello'
    app.get('/hello', (req, res) => {
        res.send('hello').status(200).end();
    });
};