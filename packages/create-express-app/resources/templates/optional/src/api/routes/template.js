const { Router } = require('express');
const passport = require('passport');
const { validateGetQueryParameters, validateCreateQueryParameters } = require('../middlewares/queryParamsValidator');
const { buildGetQuery, buildCreateQuery } = require('../middlewares/queryBuilder');
const { ROUTE_NAMEsQueryParams } = require('../../consts/queryParams');
const DB_NAME = require('../../controllers/DB_NAME');

const route = Router();

module.exports = (app) => {
    app.use('/ROUTE_NAMEs', route);

    // get ROUTE_NAMEs
    route.get(
        '/get',
        validateGetQueryParameters(ROUTE_NAMEsQueryParams.get),
        buildGetQuery(ROUTE_NAMEsQueryParams.get),
        DB_NAME.get('ROUTE_NAME')
    );

    // create ROUTE_NAME
    route.post(
        '/create',
        passport.authenticate('local'),
        validateCreateQueryParameters(ROUTE_NAMEsQueryParams.create),
        buildCreateQuery(ROUTE_NAMEsQueryParams.create),
        DB_NAME.create('ROUTE_NAME')
    );
};