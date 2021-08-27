const {initProjectDirectory, initPackageJson, installDependencies, copyTemplates} = require('./utils/shellUtils');

const projectName = process.argv[2];

function init() {
    initProjectDirectory(projectName);
    initPackageJson();
    installDependencies();
    copyTemplates();
}

module.exports = init;