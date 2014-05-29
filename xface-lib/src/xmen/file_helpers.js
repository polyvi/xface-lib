var shell = require('shelljs'),
    path  = require('path'),
    fs    = require('fs');

module.exports = {
    // Many times we simply need to copy shit over, knowing if a source path doesnt exist or if a target path already exists
    copyFile:function(dir, src, project_dir, dest) {
        src = path.resolve(dir, src);
        dest = path.resolve(project_dir, dest);
        shell.mkdir('-p', path.dirname(dest));

        if (!fs.existsSync(src)) throw new Error('"' + src + '" not found!');

        // XXX sheljs decides to create a directory when -R|-r is used which sucks. http://goo.gl/nbsjq
        if(fs.statSync(src).isDirectory()) {
            shell.cp('-R', src+'/*', dest);
        } else {
            shell.cp(src, dest);
        }
    },
    // checks if file exists and then deletes. Error if doesn't exist
    removeFile:function(dir, src) {
        var file = path.resolve(dir, src);
        if(!fs.existsSync(file)) throw new Error('"' + file + '" not found!');
        shell.rm('-Rf', file);
    },
    // deletes file/directory without checking
    removeFileF:function(file) {
        shell.rm('-Rf', file);
    },
    // Sometimes we want to remove some java, and prune any unnecessary empty directories
    deleteJava:function(dir, destFile) {
        fs.unlinkSync(path.resolve(dir,destFile));
        // check if directory is empty

        var curDir = path.resolve(dir, path.dirname(destFile));
        while(curDir !== path.resolve(dir, 'src')) {
            //console.log('curDir ' + curDir);
            if(fs.readdirSync(curDir).length == 0) {
                fs.rmdirSync(curDir);
                curDir = path.resolve(curDir, '..');
            } else {
                // directory not empty...do nothing
                break;
            }
        }
    }
};
