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
        // api: {index: {import, route}}
        // consts: {queryParams}
        const {config, app, consts, api} = handlersMap[arg](args, arg);
    }, [[], [], [], []]);
}

function handleSessionArg(args, sessionArg) {
    const db = args[sessionArg].value;

    
}

function handlePassportArg(args, passportArg) {
    const db = args[passportArg].value;
    const userModel = args[db].value.user;

    if (userModel) {
        
    } else {
        throw new Error('No User model was found');
    }
}

function handleDBArg(args, db) {
    const models = args[db].value;
    const includePassport = !!args.passport;

    getConfig(db);
    getConsts(db, models);
    getApi(Object.keys(models));
    getApp(db);

    createLoader(db);
    createModels(db, models);
    createController(db);
    createRoutes(models, includePassport);
}

module.exports = {
    getDependencies,
    argsParser,
    handleArgs,
    handleSessionArg,
    handlePassportArg,
    handleDBArg
};