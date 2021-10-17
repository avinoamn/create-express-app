const {isValidOnSchema} = require('../../utils/validationUtils');

// Validate Get query url params 
const validateQueryParams = (schema) => validateParameters({...req.query, ...req.body.query}, schema);

// Validate Create query body
const validateDataParams = (schema) => validateParameters(req.body.data, schema, true);

const validateParameters = (params, schema, mustHaveRequired=false) => (req, res, next) => {
    const isValid = isValidOnSchema(params, schema, mustHaveRequired);

    switch (isValid) {
        case true:
            next();
            break;
    
        case false:
            const err = new Error('Invalid Query / Data Parameters');
            err['status'] = 400; // Bad Request
            next(err);
            break;
    }
};

module.exports = {
    validateQueryParams,
    validateDataParams
};