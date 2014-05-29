var xfaceUtil = require('../cordova/util'),
    events = require('./events'),
    platform = require('./platform'),
    Q = require('q');

module.exports = function reset() {
    var projectRoot = xfaceUtil.isCordova(process.cwd());

    if (!projectRoot) {
        return Q.reject(new Error('Current working directory is not a xFace-based project.'));
    }
    var platforms = xfaceUtil.listPlatforms(projectRoot);
    if(platforms.length <= 0) {
        return Q(events.emit('results', 'No platforms added, nothing to do.'));
    }
    events.emit('verbose', 'Beginning to remove platforms ' + JSON.stringify(platforms) + '...');
    return platform('rm', platforms)
    .then(function() {
        events.emit('verbose', 'Beginning to add platforms ' + JSON.stringify(platforms) + '...');
        return platform('add', platforms)
        .then(function() {
            events.emit('results', 'Reset all platform projects sucessfully.');
        });
    });
};
