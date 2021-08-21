const express = require( 'express');
const helmet = require( 'helmet');
const cors = require( 'cors');
const compression = require( 'compression');
const bodyParser = require( 'body-parser');
const {errorHandlers, routes} = require( './api');
const config = require( './config');

function getApp() {
    // INIT
    const app = express();

    // HEALTH CHECK ENDPOINTS
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    if (process.env.NODE_ENV !== 'development') {
        // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
        // It shows the real origin IP in the heroku or Cloudwatch logs
        app.enable('trust proxy');
    }

    // MIDDLEWARE
    app.use(cors({origin: config.origins}));
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    // ROUTES
    app.use(config.api.prefix, routes());

    // ERROR HANDLERS
    app.use(errorHandlers());

    // EXPORTS
    return app;
}

module.exports = getApp;