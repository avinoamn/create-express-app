const {dependenciesMap} = require('../consts');

function getArgDependencies(arg, value) {
    return [...dependenciesMap[arg].default, ...(dependenciesMap[arg][value] || [])];
}

function getDependencies(args) {
    return Object.keys(args).reduce((deps, currArg) => (
        [...deps, ...getArgDependencies(currArg, args[currArg])]
    ), dependenciesMap.default);
}

function handleSessionArg(args, sessionArg) {
    const db = args[sessionArg].value;

    getConfig(sessionArg, db);
    getApp(sessionArg, db);
}

function handlePassportArg(args, passportArg) {
    const db = args[passportArg].value;

    getConfig(passportArg);
    getApp(passportArg);

    createLoader(passportArg, db);
}

function handleDBArg(args, dbArg) {
    const models = args[dbArg].value;
    const includePassport = !!args.passport;

    getConfig(dbArg);
    getConsts(dbArg, models);
    getApi(Object.keys(models));
    getApp(dbArg);

    createLoader(dbArg);
    createModels(dbArg, models);
    createController(dbArg);
    createRoutes(models, includePassport);
}

function getArgHandler(arg) {
    switch (arg) {
        case 'session': return handleSessionArg;
        case 'passport': return handlePassportArg;
        case 'mongo': return handleDBArg;
    }
}

function handleArgs(args) {
    Object.keys(args).forEach(arg => {
        // app: {imports, init, middleware}
        // api: {index: {import, route}}
        // consts: {queryParams}
        const argHandler = getArgHandler(arg);
        const {config, app, consts, api} = argHandler(args, arg);
        
        updateConfig(config);
        updateApp(app);
        updateConsts(consts);
        updateApi(api);
    });
}

module.exports = {
    getDependencies,
    handleArgs
};