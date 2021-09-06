const {argsParser, handleArgs} = require('./utils/argsUtils');
const {initProjectDirectory, initPackageJson, installDependencies, copyTemplates} = require('./utils/shellUtils');

const projectName = process.argv[2];
const args = argsParser(process.argv.slice(3));

function init() {
    initProjectDirectory(projectName);
    initPackageJson();
    installDependencies(args);
    copyTemplates('../resources/templates/must', './', ['.gitignore', 'index.js', 'src']);
    handleArgs(args);
}

module.exports = init;