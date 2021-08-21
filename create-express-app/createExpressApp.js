const path = require('path');
const shell = require('shelljs');

const dependencies = {
    default: ['express', 'helmet', 'cors', 'compression', 'body-parser', 'winston']
};

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

function getDependencies() {
    return dependencies.default;
}

function installDependencies() {
    const dependencies = getDependencies();
    shell.exec(`npm install ${dependencies.join(' ')}`);
}

function copyTemplates() {
    copy('./templates/.gitignore', './');
    copy('./templates/index.js', './');
    copy('./templates/src', './');
}

const projectName = process.argv[2];

function init() {
    initProjectDirectory(projectName);
    initPackageJson();
    installDependencies();
    copyTemplates();
}

module.exports = init;