const {JSONModelsParser, DBNameParser} = require('./parseUtils');

const dependencies = {
    default: ['express', 'helmet', 'cors', 'compression', 'body-parser', 'winston', 'fs', 'path']
};

const argsMap = {
    session: {
        dependencies: {
            default: ['cookie-parser', 'express-session'],
            mongo: ['connect-mongo']
        },
        defaultValue: 'mongo',
        valueParser: DBNameParser
    },
    passport: {
        dependencies: ['passport'],
        defaultValue: 'mongo',
        valueParser: DBNameParser
    },
    mongo: {
        dependencies: ['mongoose'],
        defaultValue: {},
        valueParser: JSONModelsParser
    }
};

const typesMap = {
    'number': Number,
    'string': String,
    'boolean': Boolean,
    'date': Date,
    'array': Array,
    'buffer': Buffer,
    'any': Object

};

module.exports = {
    dependencies,
    argsMap,
    typesMap
};