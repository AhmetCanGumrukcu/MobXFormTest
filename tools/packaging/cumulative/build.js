import 'colors';
import fsp from 'fs-promise';
var fs = require('fs'), path = require('path');
var fse = require('fs-extra');
var exec = require('../lib/exec').default.exec;
var wrench = require('wrench');
var jbuilder = require('jbuilder');

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

function findIntersectionFromStart(a,b){
    for(var i=a.length;i>0;i--){
        var d = a.substring(0,i);
        var j = b.indexOf(d);
        if (j>=0){
            return ({position:j,length:i});
        }
    }
    return null;
}
    
function findIntersection(a,b) {
    var bestResult = null;
    for(var i=0;i<a.length-1;i++){
        var result = findIntersectionFromStart(a.substring(i),b);
        if (result){
            if (!bestResult){
                bestResult = result;
            } else {
                if (result.length>bestResult.length){
                    bestResult = result;
                }
            }
        }
        if(bestResult && bestResult.length>=a.length-i) break;
    }
    return bestResult;
}

function getMasterCategoriesForLibrary(componentsRoot,libpath,pkgRoot) {
    var directories = fs.readdirSync(componentsRoot).filter(function(file) {
        if(file == 'base' || file == 'package') return false;
        return fs.statSync(path.join(componentsRoot, file)).isDirectory();
    });
    directories.forEach(function(directory) {
        if(directory !== 'package') {
            var packagesub = path.join(componentsRoot, directory,'package');
            if (fs.existsSync(packagesub)) {
                var isPackageDir = fs.statSync(packagesub).isDirectory();
                if(isPackageDir) {
                    var comptargetpath = path.join(componentsRoot,directory);
                    var componentname = path.basename(comptargetpath).toLowerCase().replace(/\s/g, '-');
                    fse.mkdirsSync(path.join(libpath,directory));
                    wrench.copyDirSyncRecursive(
                        packagesub, 
                        path.join(libpath,directory), {
                            forceDelete: true,
                            exclude: /test|(\.ts|\.tsx|\.jsx)|docs|doc|package|dist|(package\.json)|LICENSE|(README\.md)/g
                    });
                    fse.copySync(path.join(packagesub,"dist","js", componentname + ".js"),path.join(libpath,directory,"index.js"), {clobber:true});
                    fse.copySync(path.join(packagesub,"README.md"),path.join(pkgRoot, "docs",componentname + ".md"), {clobber:true});
                }
            }
            var libDirectoryPath = path.join(libpath,directory);
            getMasterCategoriesForLibrary(path.join(componentsRoot,directory),libDirectoryPath,pkgRoot);
        }
    });
}

function getComponentsForLibrary(srcpath, dynamicJLib, cmpRoot, json) {
    var directories = fs.readdirSync(srcpath).filter(function(file) {
        if(file == 'base' || file == 'package') return false;
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
    directories.forEach(function(directory) {
        if(directory !== 'base') {      
            var possibleCategory = path.join(srcpath, directory);
            if(fileExists(path.join(possibleCategory, 'index.js'))) {
                var componentname = path.basename(possibleCategory).toLowerCase().replace(/\s/g, '-');
                var intersection = findIntersection(cmpRoot,possibleCategory);
                var intersectionpattern = possibleCategory.substring(intersection.position + intersection.length).replace(/\\/g,"/");
                dynamicJLib.export += componentname + ': ' + "require('./lib" + intersectionpattern + "').default" + ",\n";
                dynamicJLib.export += componentname + '_variant_default: ' + "require('./lib" + intersectionpattern + "/assets/data/defaults.json'),\n";
                var cmpJson = require(path.join(possibleCategory,'assets','data','info.json'));
                var defaultsJson = require(path.join(possibleCategory,'assets','data','defaults.json'));
                json.child(function(json) {
                    json.set('name', componentname);
                    json.set('type', defaultsJson[0].type);
                    json.set('import',cmpJson.name);
                    json.set('category', possibleCategory.substring(intersection.position + intersection.length).replace(/\\/g,"/"));
                    json.set('description', cmpJson.description);
                    json.set('version', cmpJson.version);
                });
            }
            else {
                getComponentsForLibrary(possibleCategory, dynamicJLib, cmpRoot, json);
            }
        }
    });
}

function createMdContent(catalogObject) {
    var str = '## KuveytTurk Components\n';
    str += '### Component List\n';
    for(var i = 0; i < catalogObject.components.length; i++) {
        var component = catalogObject.components[i];
        str += "#### " + component.name + '\n';
        str += "\t" + component.description + '\n';
        str += "\t" + component.category + '\n';
        str += "\t" + component.version + '\n';
    }
    str += '\nThe end.';
    return str;
}

export default function BuildLibrary(componentsRoot) {
    var dynamicJLib = {
        "export":'module.exports = {\n'
    };
    var pkgRoot = path.join(componentsRoot, 'package');
    var distpath = path.join(pkgRoot, 'dist');
    var libpath = path.join(pkgRoot, 'lib');
    var componententry = path.join(pkgRoot, 'index.js');
    var catalogOutput, catalogObject;
    return exec(`rimraf ${pkgRoot}`)
            .then(() => {
                if(!fs.existsSync(pkgRoot)) {
                    fs.mkdirSync(pkgRoot);
                }
                if(!fs.existsSync(libpath)) {
                    fs.mkdirSync(libpath);
                }
                return fsp.open(path.join(pkgRoot, 'index.js'), 'w')
            })
            .then(() => {
                getMasterCategoriesForLibrary(componentsRoot,libpath,pkgRoot);
                catalogOutput = jbuilder.encode(function(json) {
                    json.set('components', function(json) {
                        getComponentsForLibrary(componentsRoot, dynamicJLib,componentsRoot, json);
                    });
                });
                catalogObject = JSON.parse(catalogOutput);
                dynamicJLib.export += "};\n";
                return fsp.writeFile(path.join(pkgRoot, 'index.js'), dynamicJLib['export']);
            })
            .then(() => exec(`webpack --config webpack-library.config.js --componententry="${componententry}" --distpath="${distpath}" --bail`))
            .then(() => fsp.readFile(path.join(pkgRoot, 'index.js'), { encoding:'utf8'}))
            .then((data) => data.replace(/\.\.\//g, 'lib/'))
            .then((replacedData) => fsp.writeFile(path.join(pkgRoot, 'index.js'), replacedData, { encoding:'utf8'}))
            .then(() => fsp.readFile(path.join(componentsRoot, '../build/cumulative/info.json'), { encoding:'utf8'}))
            .then((data) => fsp.writeFile(path.join(pkgRoot, 'package.json'), data, { encoding:'utf8'}))
            .then(() => fsp.writeFile(path.join(pkgRoot, 'catalog.json'), JSON.stringify(catalogObject, null, 4), { encoding:'utf8'}))
            .then(() => fsp.writeFile(path.join(pkgRoot, 'README.md'), createMdContent(catalogObject)))
            .then(() => fsp.copy(path.join(componentsRoot, '../build/package/LICENSE'), path.join(componentsRoot,'package','LICENSE')));
}