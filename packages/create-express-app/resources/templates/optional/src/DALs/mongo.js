const mongoose = require('mongoose');

async function get(modelName, query) {
    const Model = mongoose.model(modelName);

    return await Model.find(query);
}

async function create(modelName, data) {
    const Model = mongoose.model(modelName);
    
    return await Model.create(data);
}

async function update(modelName, query, data) {
    const Model = mongoose.model(modelName);
    
    return await Model.update(query, data);
}

async function deleteMany(modelName, query) {
    const Model = mongoose.model(modelName);
    
    return await Model.deleteMany(query);
}

module.exports = {
    get,
    create,
    update,
    deleteMany
};