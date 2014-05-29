var shell = require('shelljs'),
    path = require('path'),
    fs = require('fs'),
    Q = require('q'),
    AdmZip = require('adm-zip'),
    events = require('../events');

module.exports = {
    /**
     * 去掉options对象某个选项及对应的值
     * @param {Object} options
     * @param {String} paramName
     */
    stripParameter: function(options, paramName) {
        var tokens = options.options,
            index = -1,
            param = paramName.length === 1 ? '-' + paramName : '--' + paramName;

        tokens.every(function(opt, i) {
            if(opt.indexOf(param) == 0) {
                index = i;
                return false;
            }
            return true;
        });
        if(index < 0) {
            return;
        }
        if(index < tokens.length - 1 && tokens[index + 1].indexOf('-') != 0) {
            tokens.splice(index, 2);
        } else {
            tokens.splice(index, 1);
        }
    },
    // return a promise object
    checkImageMagick: function() {
        // check ImageMagick is installed or not
        if(!shell.which('identify') || !shell.which('convert')) {
            return Q.reject(new Error('Please install ImageMagick program in your computer. '
                + 'If you\'re on OS X, you can execute command `brew install imagemagick`, '
                + 'for other system, you need download from http://www.imagemagick.org, then install it.'));
        }
        return Q();
    },
    unzip: function(src, dest) {
        var zip = new AdmZip(src);
        // overwrite if existed
        zip.extractAllTo(dest, true);
    },
    mergeJs: function(platformProjPath, outputPath) {
        var stagingDir = path.join(platformProjPath, '.xstaging'),
            pluginListJsPath = path.join(stagingDir, 'cordova_plugins.js'),
            pluginsJsDir = path.join(stagingDir, 'plugins'),
            xfaceJsSrcPath = path.join(platformProjPath, 'platform_www', 'xface.js'),
            mergedJsPath = path.join(stagingDir, 'merged_xface_single.js');

        events.emit('verbose', 'Begin to merge all js files....');
        // write base xface.js of framework
        shell.cp('-f', xfaceJsSrcPath, mergedJsPath);
        // merge content of cordova_plugins.js
        fs.existsSync(pluginListJsPath) && fs.appendFileSync(mergedJsPath, fs.readFileSync(pluginListJsPath));
        // merge all plugins js
        fs.existsSync(pluginsJsDir) && traverseJsFiles(pluginsJsDir, function(f) {
            fs.appendFileSync(mergedJsPath, '\n', 'utf-8');
            fs.appendFileSync(mergedJsPath, fs.readFileSync(f));
        });
        if(outputPath) {
            shell.mkdir('-p', path.dirname(outputPath));
            shell.cp('-f', mergedJsPath, outputPath);
            events.emit('verbose', 'Merged fs file is generated at path "' + outputPath + '".');
            // remove merged js file
            shell.rm('-f', mergedJsPath);
        } else {
            events.emit('verbose', 'Merge process is finished successfully.');
            return mergedJsPath;
        }
    }
};

function traverseJsFiles(dir, handler) {
    if(fs.statSync(dir).isFile()) {
        if(path.extname(dir).toLowerCase() == '.js') handler(dir);
    } else {
        fs.readdirSync(dir).forEach(function(f) {
            traverseJsFiles(path.join(dir, f), handler);
        });
    }
}
