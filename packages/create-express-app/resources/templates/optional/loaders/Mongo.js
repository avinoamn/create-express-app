const fs = require('fs');
const join = require('path').join;
const mongoose = require('mongoose');

const config = require('../src/config');
const Logger = require('../src/loaders/logger');
const models = join(__dirname, '../models/mongo');

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

const connect = () => {
    mongoose.connection
        .on('error', msg => Logger.error(msg))
        .on('disconnected', _ => setTimeout(connect, config.mongo.connectTimeout))
        .once('open', _ => Logger.info("Connected Successfully to mongodb"));
    return mongoose.connect(config.mongo.uri, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

module.exports = connect;