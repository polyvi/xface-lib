var fs = require('fs');
var events = require('./events');
var path = require('path');
var config = require('../cordova/config');
var reposet = require('./util/reposet.js');
var Q = require('q');
var plugin = require('./plugin.js');

var prepushHandler = {
    android: require('./metadata/android_prepush'),
    ios: require('./metadata/ios_prepush'),
    wp8: require('./metadata/wp8_prepush')
};

/**
 * 为prepush做准备，获得相关
 * @param targetPlugin
 * @returns {Promise} 若能够匹配唯一plugin，则返回plugin id以及它在reposet中的full path
 * 若不能唯一匹配，则返回Q.reject
 */
function prepare(targetPlugin) {
    // 先检查已安装plugin是否能唯一匹配，否则返回并提示
    var fuzzyMatchedInstalledPlugin = plugin.tryMatchPluginIdByName(targetPlugin);

    if (fuzzyMatchedInstalledPlugin.length === 0) {
        events.emit('warn', 'Currently installed plugins are:'.yellow);
        plugin.getInstalledPluginIds().forEach(function (plugin) {
            events.emit('warn', plugin);
        });

        return Q.reject(new Error('Not found ' + targetPlugin.red + ' in current project!'));
    }

    if (fuzzyMatchedInstalledPlugin.length > 1) {
        fuzzyMatchedInstalledPlugin.forEach(function (plugin) {
            events.emit('warn', plugin);
        });

        return Q.reject(new Error('More than one plugin ' + targetPlugin.red + ' found in current project!'));
    }

    // 再检查reposet中是否能唯一匹配，否则返回，并提示
    var matchedPluginId = fuzzyMatchedInstalledPlugin.toString();
    var matchedRepoPath = reposet.findPluginRepoPathById(matchedPluginId);

    if (matchedRepoPath) {
        return Q({id: matchedPluginId, repoFullPath: matchedRepoPath});
    } else {
        return Q.reject(new Error('Not found ' + targetPlugin.red + ' in reposet'));
    }

}

function prepush(options) {
    var platform = options.platforms.shift();
    var projectName = config.read(process.cwd()).name;
    var targetPlugin = options.options.shift();

    if(!targetPlugin) {
        return events.emit('warn', 'You must input a plugin id!');
    }

    prepare(targetPlugin).then(function(plugin) {
        events.emit('log', plugin.id + ' for ' + projectName + ' ' + platform + ' is going to be prepushed!');

        prepushHandler[platform](plugin.id, plugin.repoFullPath, projectName);
    }).fail(function (err) {
            events.emit('warn', err.toString());
        });
}

module.exports = prepush;
