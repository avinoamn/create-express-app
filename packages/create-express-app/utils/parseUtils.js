const {typesMap, sessionStoreDBs, authDBs, routesPrivileges, defaultValuesMap} = require('../consts');

function parseJSON(jsonStr) {
    try {
        return JSON.parse(jsonStr);        
    } finally {
        throw new Error('Invalid JSON was given!');
    }
}

function parseModelName(modelName) {
    if (isString(modelName)) {
        if (modelName) {
            return modelName[0].toUpperCase().concat(modelName.slice(1));
        } else {
            throw new Error('Model Names cannot be empty!');
        }
    } else {
        throw new Error('Model Names should be a string!');
    }
}

function parseFieldName(fieldName) {
    if (isString(fieldName)) {
        if (fieldName) {
            return fieldName[0].toLowerCase().concat(fieldName.slice(1));
        } else {
            throw new Error('Field Names cannot be empty!');
        }
    } else {
        throw new Error('Field Names should be a string!');
    }
}

function parseFieldType(fieldType) {
    if (isString(fieldType)) {
        const parsedFieldType = typesMap[fieldType.toLowerCase()];
        if (parsedFieldType) {
            return parsedFieldType;
        } else {
            throw new Error(`Invalid Field Type ${fieldType}!`);
        }
    } else {
        throw new Error('Field Types should be a string!');
    }
}

function parseFieldFields(fieldType, fieldFields) {
    if (fieldType !== 'Object') {
        return undefined;
    } else {
        if (isObject(fieldFields)) {
            return parseFields(fieldFields);
        } else {
            throw new Error('Field fields should be an object!');
        }
    }
}

function parseFieldDefault(fieldType, fieldDefault, fieldFields) {
    if (fieldDefault === undefined || isValid(fieldType, fieldDefault, fieldFields)) {
        return fieldDefault;
    } else {
        throw new Error(`Field Default '${fieldDefault}' don't match the field Type '${fieldType}' or its schema!`);
    }
}

function parseFieldIsRequired(isRequired) {
    if (isRequired === undefined || isBoolean(isRequired)) {
        return isRequired;
    } else {
        throw new Error(`Field isRequired should be boolean!`);
    }
}

function parseFields(fields, isModelFields=false) {
    const parsedFields = Object.keys(fields).reduce((resFields, currField) => {
        const fieldName = parseFieldName(currField);
        const fieldType = parseFieldType(fields[currField].type);
        const fieldFields = parseFieldFields(fieldType, fields[currField].fields);
        const fieldDefault = parseFieldDefault(fieldType, fields[currField].default, fieldFields);
        const fieldIsRequired = parseFieldIsRequired(fields[currField].isRequired);

        return {
            ...resFields,
            [fieldName]: {
                type: fieldType,
                fields: fieldFields,
                default:fieldDefault,
                isRequired: fieldIsRequired
            }
        };
    }, {});

    if (isModelFields && isEmptyObject(parsedFields)) {
        throw new Error(`Model Fields cannot be empty!`);
    } else {
        return parsedFields;
    }
}

function parsePrivileges(privileges) {
    if (privileges === undefined) {
        return privileges;
    } else if (isObject(privileges)) {
        const get = privileges.get;
        const createUpdateDelete = privileges.createUpdateDelete;

        if ([get, createUpdateDelete].every(privilege => privilege === undefined || routesPrivileges.includes(privilege))) {
            return privileges;
        } else {
            throw new Error(`Invalid Privileges '${get}' / '${createUpdateDelete}'!`);
        }
    } else {
        throw new Error('Privileges should be an object!');
    }
}

function parseUpdateUserOnCreate(updateUserOnCreate) {
    if (updateUserOnCreate === undefined || isBoolean(updateUserOnCreate)) {
        return updateUserOnCreate;
    } else {
        throw new Error(`updateUserOnCreate should be boolean!`);
    }
}

function parseJSONModels(jsonStr) {
    const models = parseJSON(jsonStr);

    const validatedModels = Object.keys(models).reduce((resModels, currModel) => {
        const modelName = parseModelName(currModel);
        const fields = parseFields(models[currModel].fields, true);
        const privileges = parsePrivileges(models[currModel].privileges);
        const updateUserOnCreate = parseUpdateUserOnCreate(models[currModel].updateUserOnCreate);

        return {
            ...resModels,
            [modelName]: {
                fields,
                privileges,
                updateUserOnCreate
            }
        };
    }, {});

    return validatedModels;
}

const parseDBName = (validDBs) => function (dbName) {
    if (validDBs.includes(dbName.toLowerCase())) {
        return dbName.toLowerCase();
    } else {
        throw new Error('Invalid DB was given!');
    }
};

function getValueParser(arg) {
    switch (arg) {
        case 'session': return parseDBName(sessionStoreDBs);
        case 'passport': return parseDBName(authDBs);
        case 'mongo': return parseJSONModels;
    }
}

function getArgValue(arg, nextArg) {
    const isValue = nextArg && !nextArg.startsWith('--');
    const valueParser = getValueParser(arg);
    
    return isValue ? valueParser(nextArg) : defaultValuesMap[arg];
}

function parseArgs(args) {
    return args.reduce((acc, curr, index) => {
        const isArg = curr.startsWith('--');
        const arg = curr.substr(2);
        const nextArg = acc[index + 1];

        // Check if current is a valid argument
        if (isArg && !valuesMap[arg]) {
            throw new Error(`Invalid arg: ${arg}`);
        }

        return isArg ?
            {...acc, [arg]: getArgValue(arg, nextArg)} :
            acc;
    }, {});
}


module.exports = {
    parseArgs
};