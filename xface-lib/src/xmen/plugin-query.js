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

var request = require('request'),
    Q = require('q');

/**
 * get repos by a name
 * @param name name could be a short name or full name
 * @return promise if fulfilled, matched repos
 */
module.exports.matchRepoByName = function(name) {
    var deferred = Q.defer();
    requestPlugins(function(err, cordova, xfaceCore, extra, xfaceOther) {
        if (!err) {
            var all = [];
            if ('core' === name) {
                all = cordova.concat(xfaceCore);
                deferred.resolve(all);
            } else {
                all = cordova.concat(xfaceCore).concat(extra).concat(xfaceOther);
                deferred.resolve(matchRepos(all, name));
            }
        } else {
            deferred.reject(err);
        }
    });

    return deferred.promise;
}

function matchRepos(repos, name) {
    var matched = [];
    repos.every(function (r) {
        // 'name' should NOT contain any reserved characters for RegExp
        var strictPattern = new RegExp('^' + name + '$', 'i');
        if (strictPattern.test(r.repoName)) {
            matched = [];
            matched.push(r);
            return false;
        }

        var pattern = new RegExp(name, 'i');
        if (pattern.test(r.repoName)) {
            matched.push(r);
        }

        return true;
    });

    return matched;
}

function requestPlugins(callback) {
    request.get({uri:'http://192.168.2.209:3000/groups', json:true},
        function(err, res, body) {
            if (!err && res.statusCode == 200) {
                callback(null, body['cordova-plugins'],
                    body['xface-core-exts'], body['extra'],
                    body['xface-other-exts']);
            } else {
                callback(err);
            }
        });
}
