const authDBs = ['mongo'];
const sessionStoreDBs = ['mongo'];

const routesPrivileges = ['all', 'user', 'admin'];

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

// Args to default values Map
const defaultValuesMap = {
    session: 'express',
    passport: 'mongo',
    mongo: {}
}

// String of types to Objects of types Map
const typesMap = {
    'number': 'Number',
    'string': 'String',
    'boolean': 'Boolean',
    'date': 'Date',
    'array': 'Array',
    'buffer': 'Buffer',
    'any': 'Object'
};

module.exports = {
    authDBs,
    sessionStoreDBs,
    routesPrivileges,
    dependenciesMap,
    defaultValuesMap,
    typesMap,
};