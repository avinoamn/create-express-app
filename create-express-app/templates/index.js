const config = require('./src/config');

const Logger = require('./src/loaders/logger');

const getApp = require('./src/app');

function startServer() {
    const app = getApp();

    app.listen(config.port, () => {
        Logger.info(`
            ################################################
            🛡️  Server listening on port: ${config.port} 🛡️
            ################################################
        `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });

}

startServer();