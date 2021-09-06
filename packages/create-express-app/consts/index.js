const {JSONModelsParser, DBNameParser} = require('../utils/parseUtils');
const {handleSessionArg, handlePassportArg, handleDBArg} = require('../utils/argsUtils');

const supportedDBs = ['mongo'];
const sessionStoreDBs = ['mongo'];

// Args to Deps Map
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

// Args to Values Map
const valuesMap = {
    session: {
        defaultValue: 'express', // session store
        valueParser: DBNameParser(sessionStoreDBs)
    },
    passport: {
        defaultValue: 'mongo', // users db
        valueParser: DBNameParser(supportedDBs)
    },
    mongo: {
        defaultValue: {}, // mongo models
        valueParser: JSONModelsParser
    }
};

// Args to Handlers Map
const handlersMap = {
    session: handleSessionArg,
    passport: handlePassportArg,
    mongo: handleDBArg
};

// String of types to Objects of types Map
const typesMap = {
    'number': Number,
    'string': String,
    'boolean': Boolean,
    'date': Date,
    'array': Array,
    'buffer': Buffer,
    'any': Object
};


// Args to Configs Map
const configsMap = {
    session: [

    ].join(),
    passport: [

    ].join(),
    mongo: [

    ].join()
};

module.exports = {
    dependenciesMap,
    valuesMap,
    handlersMap,
    typesMap
};