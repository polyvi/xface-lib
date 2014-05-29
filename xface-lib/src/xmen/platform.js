var xfaceUtil = require('../cordova/util'),
    fs = require('fs'),
    path = require('path'),
    Q = require('q');

/**
 * @param command 'add' or 'rm'
 * @param targets 要处理的平台集合
 */
module.exports = function platform(command, targets) {
    var projectRoot = xfaceUtil.isCordova(process.cwd());

    if (!projectRoot) {
        return Q.reject(new Error('Current working directory is not a xFace-based project.'));
    }

    return require('../cordova/platform')(command, targets)
    .then(function() {
        // read engine version from lib project, then write to the script file of dev project
        if(command == 'add' || command == 'update' || command == 'up') {
            if (targets) {
                if (!(targets instanceof Array)) targets = [targets];
                var reposet = xfaceUtil.getRepoSetPath();
                return targets.reduce(function(soFar, t) {
                    return soFar.then(function() {
                        var destVersionPath, content,
                            cordovaPath= path.join(projectRoot, 'platforms', t, 'cordova');
                        var destVersionXPath, contentX;
                        if(t == 'android') {
                            return Q(); // no need for android platform
                        } else if(t == 'ios') {
                            var version = fs.readFileSync(path.join(reposet,
                                'xface-ios', 'cordova-ios', 'CordovaLib', 'VERSION'), 'utf-8').trim();
                            content = '#!/bin/bash\necho "' + version + '"';
                            destVersionPath = path.join(cordovaPath, 'version');
                            var versionX = fs.readFileSync(path.join(reposet,
                                'xface-ios', 'xFaceLib', 'xFaceLib', 'VERSIONX'), 'utf-8').trim();
                            contentX = '#!/bin/bash\necho "' + versionX + '"';
                            destVersionXPath = path.join(cordovaPath, 'versionx');
                        } else if(t == 'wp8') {
                            var version = fs.readFileSync(path.join(reposet,
                                'xface-wp8', 'VERSION'), 'utf-8').trim();
                            content = '@ECHO OFF\nECHO ' + version;
                            destVersionPath = path.join(cordovaPath, 'version.bat');
                        } else {
                            return Q.reject(new Error('Platform "' + t +
                                '" not recognized as core xface platform.'));
                        }
                        if(!fs.existsSync(destVersionPath)) {
                            return Q.reject(new Error('Can\'t find version script file "'
                                + destVersionPath + '".'));
                        }
                        fs.writeFileSync(destVersionPath, content, 'utf-8');

                        // fixme: remove if statement when all platforms got versionx implementation
                        if (destVersionXPath) {
                            fs.writeFileSync(destVersionXPath, contentX, 'utf-8');
                        }
                    });
                }, Q());
            }
        }
    });
};
