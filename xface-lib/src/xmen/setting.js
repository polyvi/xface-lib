var path = require('path'),
    fs = require('fs'),
    shell = require('shelljs'),
    config = require('../cordova/config'),
    xfaceUtil = require('../cordova/util'),
    events = require('./events');

module.exports = function(key, value) {
    if(key && key.toString().toLowerCase() === 'reposet') {
        return repoSet(value);
    } else {
        throw new Error('Unknown sub-command `setting' + (key ? ' ' + key : '') + '`! ');
    }
};

/**
 * 只能修改当前开发工程所使用的reposet
 */
function repoSet(reposet) {
    var projectRoot = xfaceUtil.cdProjectRoot(),
        json = config.read(projectRoot);
    if(reposet) {
        if(!fs.existsSync(reposet)) {
            throw new Error('The reposet dir "' + reposet + '" doesn\'t exist! ');
        }
        json['repoSet'] = reposet;
        config.write(projectRoot, json);
    }
    reposet = json['repoSet'];
    if(!reposet) {
        throw new Error('The reposet is not set, maybe you should execute command `xmen set reposet <path>` to set reposet dir.');
    }
    events.emit('results', 'The reposet is located to dir "' + reposet + '"! ');
    return reposet;
}

module.exports.getGlobalSettingPath = function() {
    var globalPath = xfaceUtil.globalConfig,
        settingPath = path.join(globalPath, 'global_setting.json');
    if(!fs.existsSync(globalPath)) {
        shell.mkdir('-p', globalPath);
    }
    if(!fs.existsSync(settingPath)) {
        fs.writeFileSync(settingPath, '{}', 'utf-8');
    }
    return settingPath;
};
