const mongoose = require('mongoose');

function get(modelName, query) {
    const Model = mongoose.model(modelName);

    Model.find(query, (err, docs) => {
        if (err) {
            throw err;
        }
        return docs;
    });
}

function create(modelName, data) {
    const Model = mongoose.model(modelName);
    
    return Model.create(data, (err, doc) => {
        if (err) {
            throw err;
        }
        return doc;
    });
}

function update(modelName, query, data) {
    const Model = mongoose.model(modelName);
    
    return Model.update(query, data, (err, doc) => {
        if (err) {
            throw err;
        }
        return doc;
    });
}

function deleteMany(modelName, query) {
    const Model = mongoose.model(modelName);
    
    return Model.deleteMany(query, (err, doc) => {
        if (err) {
            throw err;
        }
        return doc;
    });
}

module.exports = {
    get,
    create,
    update,
    deleteMany
};