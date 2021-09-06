// Validate Get query url params 
const validateGetQueryParameters = (validQueryParams) => (req, res, next) => {
    validateQueryParameters = (req.query, validQueryParams, next);
};

// Validate Create query body
const validateCreateQueryParameters = (validQueryParams) => (req, res, next) => {
    validateQueryParameters = (req.body, validQueryParams, next);
};

const validateQueryParameters = (queryParams, validQueryParams, next) => {
    const isValid = Object.keys(queryParams).every(param => 
        validQueryParams[param] === typeof queryParams[param]
    );

    switch (isValid) {
        case true:
            next();
            break;
    
        case false:
            const err = new Error('Invalid Query Parameters');
            err['status'] = 400; // Bad Request
            next(err);
            break;
    }
};

module.exports = {
    validateGetQueryParameters,
    validateCreateQueryParameters
};