const {argsParser} = require('./utils/argsUtils');
const {initProjectDirectory, initPackageJson, installDependencies, copyTemplates} = require('./utils/shellUtils');

const projectName = process.argv[2];
const args = argsParser(process.argv.slice(3));

function init() {
    initProjectDirectory(projectName);
    initPackageJson();
    installDependencies(args);
    copyTemplates();
}

module.exports = init;