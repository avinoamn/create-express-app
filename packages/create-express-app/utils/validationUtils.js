const isNumber = value => (typeof value === 'number') && (value || value === 0);

const isString = value => typeof value === 'string';

const isBoolean = value => typeof value === 'boolean';

const isArray = value => Array.isArray(value);

const isObject = value => typeof value === 'object' && !Array.isArray(value) && value !== null;

const isDate = value => Boolean(Date.parse(value));

const isBuffer = value => !isObject(value) || Buffer.isBuffer(value);

const isEmptyObject = value => Boolean(Object.keys(value).length);

const isValidOnSchema = (obj, schema) => {
    return Object.keys(schema).every(field => {
        const value = obj[field];
        const type = schema.type;
        const fields = schema.fields;
        const isRequired = schema.isRequired;

        return isRequired ? 
            (value !== undefined) && isValid(type, value, fields) :
            (value === undefined) || isValid(type, value, fields);
    });
};

function isValid(type, value, schema={}) {
    switch (type) {
        case 'Number': return isNumber(value);
        case 'String': return isString(value);
        case 'Boolean': return isBoolean(value);
        case 'Date': return isDate(value);
        case 'Array': return isArray(value);
        case 'Buffer': return isBuffer(value);
        case 'Object': return isObject(value) && isValidOnSchema(value, schema);
    }
}