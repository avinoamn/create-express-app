const {JSONModelsParser, DBNameParser} = require('../utils/parseUtils');

const dependenciesMap = {
    default: ['express', 'helmet', 'cors', 'compression', 'body-parser', 'winston', 'fs', 'path'],
    session: {
        default: ['cookie-parser', 'express-session'],
        mongo: ['connect-mongo']
    },
    passport: {
        default: ['passport']
    },
    mongo: {
        default: ['mongoose']
    }
};

const valuesMap = {
    session: {
        defaultValue: 'express', // session store
        valueParser: DBNameParser
    },
    passport: {
        defaultValue: 'mongo', // users db
        valueParser: DBNameParser
    },
    mongo: {
        defaultValue: {}, // mongo models
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
    dependenciesMap,
    valuesMap,
    typesMap
};