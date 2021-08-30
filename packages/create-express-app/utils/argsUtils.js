const {valuesMap, dependenciesMap, handlersMap} = require('../consts');

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

function handleArgs(args) {
    Object.keys(args).forEach(arg => {
        // app: {imports, loader, middleware}
        // api: {index: {import, route}, queryValidator: {imports, function, export}, queryBuilder: {imports, function, export}}
        const {config, app, consts, api} = handlersMap[arg](args[arg]);
    }, [[], [], [], []]);
}

function handleSessionArg() {

}

function handlePassportArg() {

}

const handleDBArg = (db) => function (models) {
    getConfig(db);
    createLoader(db);
    createModels(db, models);
    createRoutesMiddleware(db, models);
    createRoutes(models);
}

module.exports = {
    getDependencies,
    argsParser,
    handleArgs
};