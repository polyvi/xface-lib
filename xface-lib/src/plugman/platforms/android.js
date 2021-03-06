/*
 *
 * Copyright 2013 Anis Kadri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var fs = require('fs')  // use existsSync in 0.6.x
   , path = require('path')
   , common = require('./common')
   , events = require('../events')
   , xml_helpers = require(path.join(__dirname, '..', '..', 'util', 'xml-helpers'));

module.exports = {
    www_dir:function(project_dir) {
        var defaultAppId = require('../util/multiapp-helpers').findDefaultAppId(project_dir, 'android');
        return path.join(project_dir, 'assets', 'xface3', defaultAppId);
    },
    // reads the package name out of the Android Manifest file
    // @param string project_dir the absolute path to the directory containing the project
    // @return string the name of the package
    package_name:function (project_dir) {
        var mDoc = xml_helpers.parseElementtreeSync(path.join(project_dir, 'AndroidManifest.xml'));

        return mDoc._root.attrib['package'];
    },
    activity_name:function(project_dir) {
        var mDoc = xml_helpers.parseElementtreeSync(path.join(project_dir, 'AndroidManifest.xml'));
            name = mDoc.find('.//intent-filter/action[@android:name="android.intent.action.MAIN"]/../..').attrib['android:name'];
        var index = name.lastIndexOf('.')
        if(index != -1) {
            name = name.slice(index + 1);
        }
        return name;
    },
    "source-file":{
        install:function(source_el, plugin_dir, project_dir, plugin_id) {
            var dest = path.join(source_el.attrib['target-dir'], path.basename(source_el.attrib['src']));

            common.copyNewFile(plugin_dir, source_el.attrib['src'], project_dir, dest);
        },
        uninstall:function(source_el, project_dir, plugin_id) {
            var dest = path.join(source_el.attrib['target-dir'], path.basename(source_el.attrib['src']));
            common.deleteJava(project_dir, dest);
        }
    },
    "header-file": {
        install:function(source_el, plugin_dir, project_dir, plugin_id) {
            events.emit('verbose', 'header-file.install is not supported for android');
        },
        uninstall:function(source_el, project_dir, plugin_id) {
            events.emit('verbose', 'header-file.uninstall is not supported for android');
        }
    },
    "lib-file":{
        install:function(lib_el, plugin_dir, project_dir, plugin_id) {
            var src = lib_el.attrib.src;
            var dest = path.join("libs", path.basename(src));
            common.copyFile(plugin_dir, src, project_dir, dest);
        },
        uninstall:function(lib_el, project_dir, plugin_id) {
            var src = lib_el.attrib.src;
            var dest = path.join("libs", path.basename(src));
            common.removeFile(project_dir, dest);
        }
    },
    "resource-file":{
        install:function(el, plugin_dir, project_dir, plugin_id) {
            var src = el.attrib.src;
            var target = el.attrib.target;
            events.emit('verbose', 'Copying resource file ' + src + ' to ' + target);
            common.copyFile(plugin_dir, src, project_dir, path.normalize(target));
        },
        uninstall:function(el, project_dir, plugin_id) {
            var target = el.attrib.target;
            common.removeFile(project_dir, path.normalize(target));
        }
    },
    "framework": {
        install:function(source_el, plugin_dir, project_dir, plugin_id) {
            events.emit('verbose', 'framework.install is not supported for android');
        },
        uninstall:function(source_el, project_dir, plugin_id) {
            events.emit('verbose', 'framework.uninstall is not supported for android');
        }
    },
    "proguard-config":{
        install:function(proguard_el, project_dir) {
            var proguardConfig = proguard_el.text.trim() + '\n',
                proguardProjectFile = path.join(project_dir, 'proguard-project.txt');
            fs.appendFileSync(proguardProjectFile, proguardConfig, 'utf-8');
        },
        uninstall:function(proguard_el, project_dir) {
            var proguardConfig = proguard_el.text.trim() + '\n',
                proguardProjectFile = path.join(project_dir, 'proguard-project.txt'),
                content = fs.readFileSync(proguardProjectFile, 'utf-8');
            var newContent = content.replace(proguardConfig, '');
            if(newContent != content) {
                fs.writeFileSync(proguardProjectFile, newContent, 'utf-8');
            } else {
                events.emit('warn', 'Can\'t remove the proguard config of plugin "' + t + '", the config is not found, continue...');
            }
        }
    },
    "android-application":{
        install:function(application_el, plugins_dir, project_dir) {
            var platformConfig = getConfigChanges().get_platform_json(plugins_dir, 'android'),
                extraConfig = platformConfig.extra_config;

            var applicationClass = application_el.attrib['name'];
            if(extraConfig['android-application']) {
                throw new Error('Can\'t modify application class of AndroidManifest.xml for a second time.');
            }
            var manifestXml = path.join(project_dir, 'AndroidManifest.xml');
            var mDoc = xml_helpers.parseElementtreeSync(manifestXml);
                applicationTag = mDoc.find('./application');
            var originApplicationClass = applicationTag.attrib['android:name'] || '';
            extraConfig['android-application'] = {};
            extraConfig['android-application'][applicationClass] = originApplicationClass;
            getConfigChanges().save_platform_json(platformConfig, plugins_dir, 'android');
            applicationTag.attrib['android:name'] = applicationClass;
            fs.writeFileSync(manifestXml, mDoc.write({indent: 4}), 'utf-8');
        },
        uninstall:function(application_el, plugins_dir, project_dir) {
            var platformConfig = getConfigChanges().get_platform_json(plugins_dir, 'android'),
                extraConfig = platformConfig.extra_config;

            var applicationClass = application_el.attrib['name'];
            var manifestXml = path.join(project_dir, 'AndroidManifest.xml');
            var mDoc = xml_helpers.parseElementtreeSync(manifestXml);
                applicationTag = mDoc.find('./application');
            var originApplicationClass = extraConfig['android-application'][applicationClass];
            if(originApplicationClass) {
                applicationTag.attrib['android:name'] = originApplicationClass;
            } else {
                delete applicationTag.attrib['android:name'];
            }
            fs.writeFileSync(manifestXml, mDoc.write({indent: 4}), 'utf-8');

            delete extraConfig['android-application'];
            getConfigChanges().save_platform_json(platformConfig, plugins_dir, 'android');
        }
    },
    "root-activity":{
        install:function(activity_el, plugins_dir, project_dir) {
            var platformConfig = getConfigChanges().get_platform_json(plugins_dir, 'android'),
                extraConfig = platformConfig.extra_config;
            var rootActivityCanonicalName = activity_el.attrib['name'],
                rootActivityName = getLastPart(rootActivityCanonicalName);
                mainPackage = module.exports.package_name(project_dir),
                mainActivityName = module.exports.activity_name(project_dir);

            var projectActivityPath = path.join(project_dir, 'src', mainPackage.replace(/\./g, '/'), mainActivityName + '.java');

            if(extraConfig['root-activity']) {
                return Q.reject(new Error('Can\'t modify root activity class of develop project for a second time.'));
            }
            var content = fs.readFileSync(projectActivityPath, 'utf-8'),
                originRootActivityName = findRootActivitySimpleName(content, mainActivityName),
                originRootActivityCanonicalName = findRootActivityCanonicalName(content, originRootActivityName);
            extraConfig['root-activity'] = {};
            extraConfig['root-activity'][rootActivityCanonicalName] = originRootActivityCanonicalName;
            content = content.replace(originRootActivityCanonicalName, rootActivityCanonicalName)
                .replace(originRootActivityName, rootActivityName);
            fs.writeFileSync(projectActivityPath, content, 'utf-8');
            getConfigChanges().save_platform_json(platformConfig, plugins_dir, 'android');
        },
        uninstall:function(activity_el, plugins_dir, project_dir) {
            var platformConfig = getConfigChanges().get_platform_json(plugins_dir, 'android'),
                extraConfig = platformConfig.extra_config;
            var rootActivityCanonicalName = activity_el.attrib['name'],
                rootActivityName = getLastPart(rootActivityCanonicalName);
                mainPackage = module.exports.package_name(project_dir),
                mainActivityName = module.exports.activity_name(project_dir);

            var projectActivityPath = path.join(project_dir, 'src', mainPackage.replace(/\./g, '/'), mainActivityName + '.java');
            var content = fs.readFileSync(projectActivityPath, 'utf-8'),
                originRootActivityCanonicalName = extraConfig['root-activity'][rootActivityCanonicalName],
                originRootActivityName = getLastPart(originRootActivityCanonicalName);
            delete extraConfig['root-activity'];
            content = content.replace(rootActivityCanonicalName, originRootActivityCanonicalName)
                .replace(rootActivityName, originRootActivityName);
            fs.writeFileSync(projectActivityPath, content, 'utf-8');
            getConfigChanges().save_platform_json(platformConfig, plugins_dir, 'android');
        }
    }
};

function getConfigChanges() {
    return require('../util/config-changes');
}

function findRootActivitySimpleName(fileData, simpleMainActivityName) {
    return fileData.match(new RegExp('public\\s+class\\s+' + simpleMainActivityName + '\\s+extends\\s+(\\w+)'))[1]; // i.e. XFaceMainActivity
}

function findRootActivityCanonicalName(fileData, simpleRootActivityName) {
    return fileData.match(new RegExp('[\\w.]+' + simpleRootActivityName))[0]; // i.e. com.polyvi.xface.XFaceMainActivity
}

function getLastPart(canonicalActivityName) {
    return canonicalActivityName.slice(canonicalActivityName.lastIndexOf('.') + 1);
}
