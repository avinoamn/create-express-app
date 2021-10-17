const {Router} = require('express');
//<AUTH_MIDDLEWARE_IMPORT>//
const {validateQueryParams, validateDataParams} = require('../middlewares/paramsValidator');
const {buildQuery} = require('../middlewares/queryBuilder');
const {schema} = require('../../consts/ROUTE_NAMEs');
const ROUTE_NAMEs = require('../../controllers/ROUTE_NAMEs');

const queryParamsValidator = validateQueryParams(schema);
const dataParamsValidator = validateDataParams(schema);
const queryBuilder = buildQuery(schema, 'DB_NAME');

const route = Router();

module.exports = (app) => {
    app.use('/ROUTE_NAMEs', route);

    // get ROUTE_NAMEs
    route.get(
        '/get', //<GET_AUTH_MIDDLEWARE>//
        queryParamsValidator,
        queryBuilder,
        ROUTE_NAMEs.get
    );

    // create ROUTE_NAME
    route.post(
        '/create', //<CREATE_UPDATE_DELETE_AUTH_MIDDLEWARE>//
        dataParamsValidator,
        ROUTE_NAMEs.create
    );

    // update ROUTE_NAME
    route.patch(
        '/update', //<CREATE_UPDATE_DELETE_AUTH_MIDDLEWARE>//
        queryParamsValidator,
        dataParamsValidator,
        queryBuilder,
        ROUTE_NAMEs.update
    );

    // delete ROUTE_NAME
    route.delete(
        '/delete', //<CREATE_UPDATE_DELETE_AUTH_MIDDLEWARE>//
        queryParamsValidator,
        queryBuilder,
        ROUTE_NAMEs.deleteMany
    );
};