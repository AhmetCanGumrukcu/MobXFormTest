import 'colors';
import lib from './lib/build';
import baseComp from './lib/base';
import webpackCompiler from './webpack/build';
import fsp from 'fs-promise';
import lessCompiler from './less/build';
import docCompiler from './docs/build';
import mdDocCompiler from './docs/mddoc';
import libraryBuilder from './cumulative/build';
import packageGenerator from './package/build';
import packageFrameworkGenerator from './package/framework/build';
import themeBuilder from './themes/build';

var exec = require('./lib/exec').default.exec;
var rimraf = require('gulp-rimraf');
var gulp = require('gulp');
var fs = require('fs'), path = require('path');
const componentsRoot = path.resolve('components');
const frameworkPath = path.resolve('framework');
const themesRoot = path.join(componentsRoot, 'b-component', 'theme');
const proxyPath = path.resolve('common/b-proxy');
import yargs from 'yargs';

export const cmpOptions = yargs // Argumentleri parse etmeye yarar
    .alias('library', 'all')
    .alias('themelibrary', 'allthemes')
    .option('components', {
        default: undefined,
        type: 'string'
    })
    .argv;

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (err) {
        return false;
    }
}

function fileSize(filePath) {
    try {
        return fs.statSync(filePath).size;
    }
    catch (err) {
        return 0;
    }
}

function format2Digit(num) {
    var str = (num || 0).toString();
    return str.length > 1 ? str.substring(0, 2) : str.length == 1 ? "0" + str : "00";
}

function getTime() {
    var date = new Date();
    var hours = format2Digit(date.getHours());
    var minutes = format2Digit(date.getMinutes());
    var seconds = format2Digit(date.getSeconds());
    return hours + ":" + minutes + ":" + seconds;
}

function startPackaging(componentRoot, compilations, errors) {
    var pkgRoot = path.join(componentRoot, 'package');
    var distpath = path.join(componentRoot, 'package', 'dist', 'js');
    var componententry = path.join(componentRoot, 'index.js');
    var testentry = path.join(componentRoot, 'test', 'spec.js');
    var componentDirectoryName = path.basename(componentRoot);
    var componentname = componentDirectoryName.toLowerCase().replace(/\s/g, '-');
    var docTemplate = path.join(componentsRoot, 'b-component', 'doc', 'www', 'index.html');
    var docTemplateTarget = path.join(componentRoot, 'package', 'doc', 'index.html');
    var packageIndexJsPath = path.join(componentRoot, 'package', 'index.js');

    var infopath = path.join(componentRoot, "assets", "data", "info.json");
    var infoJson = require(infopath);
    var infoName = infoJson && infoJson.name ? infoJson.name : '<undefined>';
    var infoVersion = infoJson && infoJson.version ? ('v' + infoJson.version) : '<version undefined>';
    if (infoName !== componentname) {
        var componentsDirectoryName = '\\components\\';
        var componentsPathStartIndex = componentRoot.indexOf(componentsDirectoryName);
        var shortComponentsPath = componentsPathStartIndex >= 0 ? componentRoot.substring(componentsPathStartIndex + componentsDirectoryName.length, componentRoot.length - componentDirectoryName.length) : componentRoot;
        errors.push(() => {
            return console.log(shortComponentsPath.red + componentDirectoryName.underline.gray + '\\assets\\data\\'.red + 'info.json->name:'.red + infoName.yellow + ' is not same with the component directory:'.red + componentDirectoryName.yellow);
        });
    }
    else {
        var ignoredFilesObj = infoJson.dependencies;
        var ignoredFiles = '';
        if (ignoredFilesObj) {
            ignoredFiles = Object.keys(ignoredFilesObj);
        }

        compilations.push(() => {
            return exec(`rimraf ${pkgRoot}`)
                .then(() => lib(componentRoot, componentname, componententry, ignoredFiles))
                .then(() => webpackCompiler(componentname, componententry, distpath, testentry, ignoredFiles))
                .then(() => fsp.rename(path.join(distpath, 'bundle.js'), path.join(distpath, componentname + '.js')))
                .then(() => fsp.rename(path.join(distpath, 'bundle.min.js'), path.join(distpath, componentname + '.min.js')))
                .then(() => fsp.rename(path.join(distpath, 'bundle.min.js.map'), path.join(distpath, componentname + '.min.js.map')))
                //.then(() => docCompiler(componentRoot))
                //.then(() => fsp.copy(docTemplate, docTemplateTarget))
                .then(() => mdDocCompiler(componentRoot))
                .then(() => packageGenerator(componentRoot))
                .then(() => console.log(getTime() + ' - Built: npm module '.cyan + componentname.green + ' ' + infoVersion.yellow +
                    ' [index.js ' + (fileSize(packageIndexJsPath) / 1024).toFixed(1) + 'KB]'))
        });
    }
}

function startBasePackaging(baseRoot, compilations, errors) {
    var pkgRoot = path.join(baseRoot, 'package');
    var basecomponentname = 'b-component';

    var infopath = path.resolve(path.join('build', 'package', 'base', 'info.json'));
    var infoJson = require(infopath);
    var infoName = infoJson && infoJson.name ? infoJson.name : '<undefined>';
    var infoVersion = infoJson && infoJson.version ? ('v' + infoJson.version) : '<version undefined>';
    var packageIndexJsPath = path.join(pkgRoot, 'index.js');

    compilations.push(() => {
        return exec(`rimraf ${pkgRoot}`) // rimraf directory nin için siler
            .then(() => baseComp(pkgRoot, baseRoot))
            .then(() => console.log(getTime() + ' - Built: npm module '.cyan + basecomponentname.green + ' ' + infoVersion.yellow +
                ' [index.js ' + (fileSize(packageIndexJsPath) / 1024).toFixed(1) + 'KB]'));
    });
}

function startFrameworkPackaging(compilations, errors) {
    var pkgRoot = path.join(frameworkPath, 'package');
    var distpath = path.join(frameworkPath, 'package', 'dist', 'js');
    var frameworkentry = path.join(frameworkPath, 'index.js');
    var configpath = path.join('./', 'webpack.framework.js');
    var frameworkname = 'b-framework';

    var infopath = path.resolve(path.join('build', 'package', 'framework', 'info.json'));
    var infoJson = require(infopath);
    var infoName = infoJson && infoJson.name ? infoJson.name : '<undefined>';
    var infoVersion = infoJson && infoJson.version ? ('v' + infoJson.version) : '<version undefined>';
    var packageIndexJsPath = path.join(pkgRoot, 'index.js');

    compilations.push(() => {
        return exec(`rimraf ${pkgRoot}`)
            .then(() => webpackCompiler(frameworkname, frameworkentry, pkgRoot, configpath))
            .then(() => webpackCompiler(frameworkname, frameworkentry, distpath, configpath))
            .then(() => fsp.rename(path.join(distpath, 'bundle.js'), path.join(distpath, frameworkname + '.js')))
            .then(() => fsp.rename(path.join(pkgRoot, 'bundle.js'), path.join(pkgRoot, 'index.js')))
            .then(() => packageFrameworkGenerator(frameworkPath))
            .then(() => console.log(getTime() + ' - Built: npm module '.cyan + frameworkname.green + ' ' + infoVersion.yellow +
                ' [index.js ' + (fileSize(packageIndexJsPath) / 1024).toFixed(1) + 'KB]'));
    });
}

function getDirectories(srcpath, compilations, errors) {
    var directories = fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
    directories.forEach(function (directory) {
        if (directory !== 'b-component' && directory !== 'package' && directory.indexOf('test-viewer') < 0) {
            var possibleCategory = path.join(srcpath, directory);
            if (fileExists(path.join(possibleCategory, 'index.js'))) {
                startPackaging(possibleCategory, compilations, errors);
            }
            else {
                getDirectories(possibleCategory, compilations, errors);
            }
        }
    });
}

function getComponentsDirectories(components, srcpath, compilations, errors) {

    var directories = fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
    directories.forEach(function (directory) {
        if (directory !== 'b-component' && directory !== 'package' && directory.indexOf('test-viewer') < 0) {
            var possibleCategory = path.join(srcpath, directory);
            var componentname = path.basename(possibleCategory).toLowerCase().replace(/\s/g, '-');
            if (fileExists(path.join(possibleCategory, 'index.js')) && components.indexOf(componentname) > -1) {
                startPackaging(possibleCategory, compilations, errors);
            }
            else {
                getComponentsDirectories(components, possibleCategory, compilations, errors);
            }
        }
    });
}

function runCleanup(pkgRoot) {
    gulp.task('clean', function () {
        return gulp.src(pkgRoot + '/**', { read: false })
            .pipe(rimraf());
    });
    gulp.start('clean');
}

export default function Build(options) {
    var compilations = [];
    var errors = [];
    console.log(getTime() + ' - Build started'.cyan);

    if (cmpOptions.components) {
        var components = cmpOptions.components.split(",").map(function (value) { return value.toLowerCase(); });
        getComponentsDirectories(components, componentsRoot, compilations, errors);
    }
    else if (cmpOptions.base) {
        var baseDirectory = path.join(componentsRoot, 'b-component');
        startBasePackaging(baseDirectory, compilations, errors);
    }
    else if (cmpOptions.framework) {
        startFrameworkPackaging(compilations, errors);
    }
    else if (cmpOptions.all) {
        compilations.push(() => { return libraryBuilder(componentsRoot); });
    }
    else if (cmpOptions.theme) {
        compilations.push(() => { return themeBuilder(themesRoot); });
    }
    else if (cmpOptions.proxy) {
        getComponentsDirectories("b-proxy", path.join(componentsRoot, 'utils'), compilations, errors);
    }
    else {
        getDirectories(componentsRoot, compilations, errors);
    }

    var hasErrors = errors && errors.length && errors.length > 0;
    if (hasErrors) {
        console.log('There are some errors, build failed.'.red);
    }
    var hasCompilations = !hasErrors && compilations && compilations.length && compilations.length > 0;
    var promiseFunctions = hasErrors ? errors : hasCompilations ? compilations : [];

    if (!hasErrors && !hasCompilations) {
        console.log("No component built!".red);
    }

    var promises = [];
    for (var i = 0; i < promiseFunctions.length; i++) {
        //promises.push(promiseFunctions[i]);
        promises.push(new Promise((resolve, reject) => {
            try {
                Promise.resolve(promiseFunctions[i]())
                    .catch((reason) => { console.log(reason) });
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        }));
    }

    return Promise.all(promises);
}