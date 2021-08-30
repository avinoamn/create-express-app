const {valuesMap, dependenciesMap} = require('../consts');

function getArgDependencies(arg, nextArg) {
    return [...dependenciesMap[arg].default, ...(dependenciesMap[arg][nextArg] || [])];
}

function getArgValue(arg, nextArg) {
    const isValue = nextArg && !nextArg.startsWith('--');
    
    return isValue ?
        valuesMap[arg].valueParser(nextArg) :
        valuesMap[arg].defaultValue;
}

function argsParser(args) {
    return args.reduce((acc, curr, index) => {
        const isArg = curr.startsWith('--');
        const arg = curr.substr(2);
        const nextArg = acc[index + 1];

        // Check if current is a valid argument
        if (isArg && !valuesMap[arg]) {
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
    return Object.keys(args).reduce((deps, currArg) => (
        [...deps, ...args[currArg].dependencies]
    ), dependenciesMap.default);
}

module.exports = {
    getDependencies,
    argsParser
};