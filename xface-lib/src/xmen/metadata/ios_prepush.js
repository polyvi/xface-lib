var events = require('../events'),
    path = require('path'),
    fs = require('fs-extra'),
    util = require('../../cordova/util');

function buildSourcePath(pluginId, projectName) {
    var devProjRoot = util.isCordova(process.cwd());
    var source = path.join(devProjRoot, 'platforms', 'ios', projectName, 'Plugins', pluginId);

    return source;
}

function buildTargetPath(repo) {
    var target = path.join(repo, 'src', 'ios');
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
