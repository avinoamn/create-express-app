const mongoose = require('mongoose');

const get = (modelName) => (req, res) => {
    const Model = mongoose.model(modelName);

    Model.find(req.dbQuery, (err, docs) => {
        if (err) {
            throw err;
        }
        res.json({[`${modelName}s`]: docs});
    });
};

const create = (modelName) => (req, res) => {
    const Model = mongoose.model(modelName);
    
    Model.create(req.dbQuery, (err, doc) => {
        if (err) {
            throw err;
        }
        res.json({[modelName]: doc});
    });
};

module.exports = {
    get,
    create
};