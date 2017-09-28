var exec = require('../lib/exec').default.exec;
var fs = require('fs'), path = require('path');

export default function BuildDoc(componentRoot) {
    var componententry = path.join(componentRoot, 'docs', 'doc.js');
    var distpath = path.join(componentRoot, 'package', 'doc'); 
    return exec(`webpack --config webpack.docs.js --componententry="${componententry}" --distpath="${distpath}" --bail`);
}