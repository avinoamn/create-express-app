const { Router } = require('express');

const route = Router();

module.exports = (app) => {
    app.use('/hello', route);

    /// says 'hello'
    route.get('/', (req, res) => {
        res.send('hello').status(200).end();
    });
};