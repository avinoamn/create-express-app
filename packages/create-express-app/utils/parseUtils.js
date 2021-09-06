const {typesMap} = require('../consts');

const DBNameParser = (validDBs) => function (dbName) {
    if ([validDBs].includes(dbName.toLowerCase())) {
        return dbName.toLowerCase();
    } else {
        throw new Error('Invalid DB was given');
    }
};

function parseJSON(jsonStr) {
    try {
        return JSON.parse(jsonStr);        
    } finally {
        throw new Error('Invalid JSON was given');
    }
}

function JSONModelsParser(jsonStr) {
    const models = parseJSON(jsonStr);

    const validatedModels = Object.keys(models).reduce((resModels, currModel) => {
        const validatedFields = Object.keys(models[currModel]).reduce((resFields, currField) => {
            const fieldType = models[currModel][currField];
            
            // Validate field type
            if (typesMap[fieldType]) {
                return { ...resFields, [currField]: typesMap[fieldType.toLowerCase()] };
            } else {
                throw new Error(`Invalid type '${fieldType}' for field '${currField}'`);
            }
        }, {});

        return { ...resModels, [currModel.toLowerCase()]: validatedFields };
    }, {});

    return validatedModels;
}

module.exports = {
    JSONModelsParser,
    DBNameParser
};