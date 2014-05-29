var events = require('../events'),
    path = require('path'),
    fs = require('fs-extra'),
    util = require('../../cordova/util');

function buildSourcePath(pluginId, projectName) {
    // path similar D:\Dev\gitrepos\myapp\platforms\android\src\com\polyvi\xface\extension\XZipExt.java
    var devProjRoot = util.isxFace(process.cwd());
    var source = path.join(devProjRoot, 'platforms', 'android', 'src', pluginId.replace(/\./g, '/'));

    return source;
}

function buildTargetPath(repo) {
    var target = path.join(repo, 'src', 'android');
    return target;
}

function handlePrepush(pluginId, repoFullPath, projectName) {
    var source = buildSourcePath(pluginId, projectName);
    var target = buildTargetPath(repoFullPath);

    copyToRepo(source, target, pluginId);
}

function copyToRepo(source, target, pluginId) {
    fs.removeSync(target);

    events.emit('verbose', 'Copying file from ' + source + ' to ' + target);

    fs.copy(source, target, function (err) {
        if (err) {
            events.emit('warn', err.blue);
        }
        else {
            events.emit('results', 'Successfully copied files for ' + pluginId);
        }
    })
}

module.exports = handlePrepush;
