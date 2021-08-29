const typesMap = {
    'number': Number,
    'string': String,
    'boolean': Boolean,
    'date': Date,
    'array': Array,
    'buffer': Buffer,
    'any': Object

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
            
            if (typesMap[fieldType]) {
                return { ...resFields, [currField]: typesMap[fieldType.toLowerCase()] };
            } else {
                throw new Error(`Invalid type '${fieldType}' for field '${currField}'`);
            }
        }, {});

        return { ...resModels, [currModel]: validatedFields };
    }, {});

    return validatedModels;
}

module.exports = {
    JSONModelsParser
};