const { Router } = require('express');

const route = Router();

module.exports = (app) => {
    app.use(route);

    /// catch 404 and forward to error handler
    route.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    route.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};