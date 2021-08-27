const dependencies = {
    default: ['express', 'helmet', 'cors', 'compression', 'body-parser', 'winston']
};

const argsMap = {
    session: {
        dependencies: [],
        db: ''
    },
    passport: {
        dependencies: [],
        db: '',
    },
    mongo: {
        dependencies: [],
        models: {}
    }
};

function argsParser(args) {
    args.reduce((acc, curr, index) => {
        // Check if current is a valid argument
        if (curr.startsWith('--') && !argsMap[curr]) {
            throw new Error(`Invalid arg: ${curr}`);
        }

        return curr.startsWith('--') ? {
            ...acc,
            [curr.substr(2)]: argsMap[curr.substr(2)].getArgValue(acc[index + 1])
        } : acc;
    }, {});
}

function getDependencies() {
    return dependencies.default;
}

module.exports = {
    getDependencies,
    argsParser
};