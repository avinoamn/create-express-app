// Build Get query from url params 
const buildGetQuery = (buildQueryParams) => (req, res, next) => {
    buildQuery(req.query, buildQueryParams, req, next);
};

// Build Create query from body
const buildCreateQuery = (buildQueryParams) => (req, res, next) => {
    buildQuery(req.body, buildQueryParams, req, next);
};

const buildQuery = (queryParams, buildQueryParams, req, next) => {
    const dbQuery = Object.keys(queryParams).reduce((acc, param) => {
        const queryOperator = buildQueryParams[param].queryOperator;
        const queryValue = queryParams[param];
        const fieldQuery = getFieldQuery(queryOperator, queryValue);

        return { ...acc, [param]: fieldQuery };
    }, {});

    req.dbQuery = dbQuery;
    next();
};

module.exports = {
    buildGetQuery,
    buildCreateQuery
};