const validateGetQueryParameters = (req, res, next, validGetQueryParams) => {
    const queryParams = Object.keys(req.query);
    const isValid = queryParams.every(param => validGetQueryParams[param]);

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

const validateCreateQueryParameters = (req, res, next, validCreateQueryParams) => {
    const queryParams = req.body;
    const isValid = Object.keys(queryParams).every(param => doSomthing()); // ToDo

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

};