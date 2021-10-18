const buildQuery = (schema, buildQuery) => (req, res, next) => {
    const params = {...req.query, ...req.body.query};
    
    const query = Object.keys(params).reduce((query, param) => {
        const fieldQuery = buildQuery(param, params[param], schema[param]);

        return { ...query, ...fieldQuery };
    }, {});

    req.body.query = query;
    next();
};

module.exports = {
    buildQuery
};