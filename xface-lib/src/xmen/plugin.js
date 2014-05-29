/**
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

var events = require('./events'),
    path = require('path'),
    util = require('../cordova/util'),
    reposet = require('./util/reposet.js'),
    prompt = require('prompt'),
    Q = require('q'),
    pquery = require('./plugin-query.js');

function getInstalledPlugins() {
    var projectRoot = util.isCordova(process.cwd());
    if (!projectRoot) {
        throw new Error('Current working directory is not a xFace-based project!');
    }

    return util.findPlugins(path.join(projectRoot, 'plugins'));
}

/**
 * 根据输入名字匹配并返回plugin id
 * @param name
 * @returns {Array} 匹配到的id数组
 */
function tryMatchPluginId(name) {
    // test if target is already an id
    if (/\./.test(name)) {
        return Q([name]);
    }

    var installedPlugins = getInstalledPlugins();
    var index = installedPlugins.indexOf(name);
    if (-1 !== index) {
        return Q([installedPlugins[index]]);
    }

    return Q(installedPlugins.filter(function (plugin) {
        return plugin.indexOf(name) !== -1;
    }));
}

/**
 * 根据输入名字匹配并返回plugin repo完全路径
 * @param name
 * @return {Array} (多个)匹配的插件仓库全路径数组
 */
function tryMatchPluginRepos(name) {
    // test if target is already a path
    if (/\/|\\/.test(name)) {
        return Q([name]);
    }

    return pquery.matchRepoByName(name).then(function(matched) {
        var reposet = util.getRepoSetPath();
        return matched.map(function(repo) {
            // repo.subdir, support cordova-plugins repo
            return path.join(reposet, repo.repoName,
                repo.subdir ? repo.subdir : '');
        });
    });
}

function getUserChoice(target, candidates) {
    events.emit('warn', 'For ' + target.bold.red + ', please select,');
    candidates.forEach(function (name, index) {
        events.emit('warn', index + ': ' + name);
    });

    prompt.start();

    return Q.nfcall(prompt.get, [{
            name: 'choose'.blue,
            required: true,
            conform: function (value) {
                return (value >= 0 && value < candidates.length);
            }
        }])
        .then(function(result) {
            return candidates[parseInt(result['choose'.blue], 10)];
        });
}

/**
 * 处理命令行输入的target，模糊查找，让用户从匹配结果中选择
 *
 * @param  {string}  command
 * @param  {Array}   targets
 */
function processTargets(command, targets) {
    if (targets && /add|rm|remove/.test(command)) {
        var matchFunc = (command === 'add') ? tryMatchPluginRepos : tryMatchPluginId;

        if (command === 'add' && 'core' === targets[0]) {
            return matchFunc('core');
        } else {
            var strictMatchedTargets = [];
            return targets.reduce(function (soFar, target) {
                return soFar.then(function () {
                    return matchFunc(target)
                        .then(function(fuzzyMatched) {
                            if (1 === fuzzyMatched.length) {
                                return fuzzyMatched[0];
                            } else if (1 < fuzzyMatched.length) {
                                return getUserChoice(target, fuzzyMatched);
                            } else {
                                events.emit('warn', target.red +
                                    ' not found, please fix your input!'.red);
                                return null;
                            }
                        })
                        .then(function (resolvedTarget) {
                            if (resolvedTarget) {
                                strictMatchedTargets.push(resolvedTarget);
                            }
                        });
                    });
            }, Q()).then(function () {
                    return strictMatchedTargets;
                });
        }
    } else {
        return Q(targets);
    }
}

module.exports = function plugin(command, targets) {
    return processTargets(command, targets)
    .then(function(resolvedTargets) {
        return require('../cordova/plugin')(command, resolvedTargets);
    });
}

module.exports.tryMatchPluginIdByName = tryMatchPluginId;
module.exports.getInstalledPluginIds = getInstalledPlugins;
