const path = require('path');
const shell = require('shelljs');
const {getDependencies} = require('./argsUtils');

// Copy files from Resources to User's dest project dir
function copy(src, dest) {
    const relativeSrcPath = path.join(__dirname, src);
    shell.cp('-r', relativeSrcPath, dest);
}

function initProjectDirectory(projectName) {
    shell.mkdir(projectName);
    shell.cd(projectName);
}

function initPackageJson() {
    shell.exec('npm init --y');
}

function installDependencies(args) {
    const dependencies = getDependencies(args);
    shell.exec(`npm install ${dependencies.join(' ')}`);
}

function copyTemplates() {
    copy('../resources/templates/.gitignore', './');
    copy('../resources/templates/index.js', './');
    copy('../resources/templates/src', './');
}

module.exports = {
    initProjectDirectory,
    initPackageJson,
    installDependencies,
    copyTemplates
};