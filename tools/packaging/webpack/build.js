var exec = require('../lib/exec').default.exec;

export default function BuildDistributable(componentname, componententry, distpath, testentry, ignoredFiles) {
    //console.log('BuildDistributable(componentname: '+componentname+', componententry: '+componententry+', distpath: '+distpath+', testentry: '+testentry+', ignoredFiles: '+ignoredFiles+');');
    if (ignoredFiles) {
        return exec(`webpack --componententry="${componententry}" --componentname=${componentname} --testentry="${testentry}" --distpath="${distpath}" --ignoredFiles=${ignoredFiles} --bail`)
            .then(() => exec(`webpack -p --componententry="${componententry}" --componentname=${componentname} --testentry="${testentry}" --distpath="${distpath}" --ignoredFiles=${ignoredFiles} --bail`))
    } else {
        return exec(`webpack --componententry="${componententry}" --componentname=${componentname} --testentry="${testentry}" --distpath="${distpath}" --bail`)
            .then(() => exec(`webpack -p --componententry="${componententry}" --componentname=${componentname} --testentry="${testentry}" --distpath="${distpath}" --bail`))
    }
}