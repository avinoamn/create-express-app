const dependencies = {
    default: ['express', 'helmet', 'cors', 'compression', 'body-parser', 'winston']
};

function getDependencies() {
    return dependencies.default;
}

module.exports = {
    getDependencies
};