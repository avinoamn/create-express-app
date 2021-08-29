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
        defaultValue: 'mongo', // DB name
        valueParser: DBNameParser
    },
    mongo: {
        dependencies: ['mongoose'],
        defaultValue: {}, // Models Object
        valueParser: JSONModelsParser
    }
};

function getArgValue(arg, nextArg) {
    const isValue = !nextArg.startsWith('--');
    
    return isValue ?
        argsMap[arg].valueParser(value) :
        argsMap[arg].defaultValue;
}

function argsParser(args) {
    args.reduce((acc, curr, index) => {
        const isArg = curr.startsWith('--');
        const arg = curr.substr(2);
        const nextArg = acc[index + 1];

        // Check if current is a valid argument
        if (isArg && !argsMap[arg]) {
            throw new Error(`Invalid arg: ${arg}`);
        }

        return isArg ? {
            ...acc,
            [arg]: {
                dependencies: getArgDependencies(arg, nextArg),
                value: getArgValue(arg, nextArg)
            }
        } : acc;
    }, {});
}

function getDependencies(args) {
    return dependencies.default;
}

module.exports = {
    getDependencies,
    argsParser
};