const config = require('./config');

const Logger = require('./loaders/logger');

const getApp = require('./app');

async function startServer() {
    const app = await getApp();

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