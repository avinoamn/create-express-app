const {isValid, isEmptyObject} = require("../validationUtils");

const getFieldQuery = (field, value) => ({ [field]: value });

const getObjectQuery = (field, obj, schema) => {
    if (!Boolean(schema) || isEmptyObject(schema)) {
        return getFieldQuery(field, obj);
    } else {
        return Object.keys(obj).reduce((query, currField) => ({
            ...query,
            ...buildQuery(`${field}.${currField}`, obj[currField], schema[currField])
        }), {});
    }
};

function buildQuery(field, value, schema) {
    switch (schema.type) {
        case 'Object': return getObjectQuery(field, value, schema.fields);
        default: return getFieldQuery(field, value);
    }
}

module.exports = buildQuery;