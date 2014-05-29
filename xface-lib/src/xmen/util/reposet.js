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

var fs = require('fs'),
    path = require('path'),
    util = require('../../cordova/util'),
    xml_helpers = require('../../util/xml-helpers'),
    events = require('../events');

/**
 Repo Object
 * id: com.polyvi.xface.extension.ams
 * name: ams
 * fullPath: /path/to/repo
 */

/**
 * 获得reposet中存在的插件仓库，包括extra
 * @returns {Array} 返回插件repo数组
 */
module.exports.getAvailablePluginRepos = function () {
    return getExtraRepos().concat(module.exports.getStrictPluginRepos());
}

/**
 * 获取reposet中符合plugin意义的仓库集合
 * @returns {Array}
 */
module.exports.getStrictPluginRepos = function() {
    return matchReposByPattern(/(xface-extension|cordova-plugin)-/i);
}

/**
 * 根据输入名字匹配reposet中是否存在对应的插件仓库
 * @param {String} name 待匹配的插件名字
 * @returns {Array} 匹配到的仓库数组
 */
module.exports.tryMatchPluginRepoByName = function(name) {
    var availPluginRepos = module.exports.getAvailablePluginRepos();

    var matchedPluginRepo = [];
    availPluginRepos.every(function(repo) {
        // if equals full name, stop searching and just return this single repo
        if (repo.name === name) {
            matchedPluginRepo = [];
            matchedPluginRepo.push(repo);
            return false;
        }

        if (-1 !== repo.name.indexOf(name)) {
            matchedPluginRepo.push(repo);
        }

        return true;
    });

    return matchedPluginRepo;
}

/**
 * 根据输入的plugin id，查找匹配reposet中的plugin repo，若找到，则返回
 * repo full path
 * @param id full id for plugin
 * @returns {String} full path of matched plugin repo
 */
module.exports.findPluginRepoPathById = function(id) {
    var availPluginRepos = module.exports.getAvailablePluginRepos();

    var foundPlugin = null;
    availPluginRepos.every(function(pluginRepo) {
        if (id === pluginRepo.id) {
            foundPlugin = pluginRepo.fullpath;
            return false;
        }

        return true;
    });

    return foundPlugin;
}

function matchReposByPattern(regExp) {
    var reposet = util.getRepoSetPath();
    var allrepos = fs.readdirSync(reposet).map(function (file) {
        return path.join(reposet + '/' + file);
    }).filter(function (file) {
            return fs.statSync(file).isDirectory();
        });

    var availPlugins = [];
    allrepos.forEach(function (pluginRepo) {
        if (regExp.test(pluginRepo)) {
            try {
                var xml_file = path.join(pluginRepo, 'plugin.xml');
                var xml = xml_helpers.parseElementtreeSync(xml_file);
                var plugin_id = xml.getroot().attrib.id;

                availPlugins.push({
                    name: path.basename(pluginRepo),
                    id: plugin_id,
                    fullpath: pluginRepo
                });
            } catch (ex) {
                events.emit('warn', ex);
                // keep going anyway
            }
        }
    });

    return availPlugins;
}

function getExtraRepos() {
    return matchReposByPattern(/-extra-/i);
}
