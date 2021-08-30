const getGetQueryValue = (searchOperator, searchValue) => {
    switch (searchOperator) {
        case 'equals':
            return searchValue;
        case 'contains':
            return { $regex: searchValue };
        case 'intersects':
            return { $in: searchValue.split(',') };
    };
};

const buildGetQuery = (req, next, buildGetQueryParams) => {
    const queryParams = req.query;

    const postsGetQuery = Object.keys(queryParams).reduce((acc, param) => {
        const searchOperator = buildGetQueryParams[param].searchOperator;
        const searchValue = queryParams[param];
        const queryValue = getGetQueryValue(searchOperator, searchValue);

        return { ...acc, [param]: queryValue };
    }, {});

    req.postsGetQuery = postsGetQuery;
    next();
};

const buildCreateQuery = (req, res, next, buildCreateQueryParams) => {
    // ToDo
    next();
};

module.exports = {
    
};