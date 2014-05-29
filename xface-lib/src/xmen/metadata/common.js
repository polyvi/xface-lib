var Q = require('q'),
    fs = require('fs'),
    path = require('path'),
    et = require('elementtree'),
    xml_helpers = xml_helpers = require('../../util/xml-helpers'),
    shell = require('shelljs'),
    multiapp_helpers = require('../../plugman/util/multiapp-helpers'),
    xface_app = require('../../cordova/app'),
    util = require('../util/util');

module.exports = {
    // 遍历选项中保存的所有参数，执行对应的action
    handleActions : function(opts, actionsMap) {
        return Object.keys(opts.paramsJson).reduce(function(soFar, key) {
            return soFar.then(function() {
                if(actionsMap[key]) return actionsMap[key](opts, opts.paramsJson[key]);
                else return Q();
            });
        }, Q());
    },
    prepareApps : function(opts, appsObj) {
        var defaultAppId = appsObj['startapp_id'],
            appContainer = appsObj['path'];
        if(!defaultAppId || !appContainer) {
            return Q.reject('Option "startapp_id", "path" are required for apps tag.')
        }
        if(!fs.existsSync(appContainer)) {
            return Q.reject('The apps path "' + appContainer + '" do not exist.');
        }
        if(!fs.existsSync(path.join(appContainer, defaultAppId))) {
            return Q.reject('Start app by id "' + defaultAppId + '" do not exist.');
        }
        var appsPath = [path.join(appContainer, defaultAppId)];
        fs.readdirSync(appContainer).forEach(function(f) {
            var subdir = path.join(appContainer, f);
            if(f != defaultAppId && fs.lstatSync(subdir).isDirectory()) {
                appsPath.push(subdir);
            }
        });
        return xface_app.installApp(opts.projectRoot, appsPath, true);
    },
    handleEngineConfig : function(opts, engineConfig, platform) {
        if(!engineConfig)  return;
        var configXml = opts.parser.config_xml();
        var doc = xml_helpers.parseElementtreeSync(configXml);
        var workDir = engineConfig['work_dir'],
            statusBarConfig = engineConfig['status_bar'],
            engineVersion = engineConfig['engine_version'],
            engineBuild = engineConfig['engine_build'];
        workDir && module.exports.modifyConfigPreference(doc, 'WorkDir', String(workDir));
        statusBarConfig && statusBarConfig.hasOwnProperty('show') && module.exports.modifyConfigPreference(doc, 'fullscreen', String(!statusBarConfig.show));
        engineVersion && module.exports.modifyConfigPreference(doc, 'EngineVersion', String(engineVersion));
        engineBuild && module.exports.modifyConfigPreference(doc, 'EngineBuild', String(engineBuild));
        fs.writeFileSync(configXml, doc.write({indent: 4}), 'utf-8');
    },
    // 修改config.xml中preference标签的值，如果该标签不存在，则新建一个
    modifyConfigPreference : function(doc, name, value) {
        var tag = doc.find('preference[@name="' + name + '"]');
        if(tag) {
            tag.attrib['value'] = value;
        } else {
            doc.getroot().append(et.XML('<preference name="' + name + '" value="' + value + '" />'));
        }
    },
    handleHttpsCertificateConfig : function(opts, certificateConfig, targetDirGetter) {
        var passwordConfigFile = certificateConfig['password_config_file'],
            keystoreFile = certificateConfig['p12_keystore'];
        if(!passwordConfigFile || !keystoreFile) {
            return Q.reject(new Error('Option "password_config_file", "p12_keystore" are required for https_certificate tag.'));
        }
        if(!fs.existsSync(passwordConfigFile)) {
            return Q.reject(new Error('Https certificate password config file "' + passwordConfigFile + '" does\'t exist.'));
        }
        if(!fs.existsSync(keystoreFile)) {
            return Q.reject(new Error('Https certificate keystore file "' + keystoreFile + '" does\'t exist.'));
        }
        var assetsPath = targetDirGetter();
        if(!fs.existsSync(assetsPath)) {
            shell.mkdir('-p', assetsPath);
        }
        var destPasswordConfigPath = path.join(assetsPath, 'CertificateKey.xml'),
            destKeystorePath = path.join(assetsPath, 'client.p12');
        if(!fs.existsSync(destKeystorePath)) {
            // remove these files when build finished
            opts.filesToClean = [destPasswordConfigPath, destKeystorePath];
        }
        shell.cp('-f', passwordConfigFile, destPasswordConfigPath);
        shell.cp('-f', keystoreFile, destKeystorePath);
        return Q();
    },
    mergePluginsJs : function(opts, merged) {
        if(!merged) {
            return;
        }

        var mergedJsPath = util.mergeJs(opts.platformProj);
        // copy merged js file to all apps, then remove discrete js
        var appIds = multiapp_helpers.getInstalledApps(opts.platformProj, opts.platform),
            xface3Dir = path.dirname(opts.parser.www_dir());
        appIds.forEach(function(id) {
            var appPath = path.join(xface3Dir, id);
            shell.cp('-f', mergedJsPath, path.join(appPath, 'xface.js'));
            shell.rm('-rf', path.join(appPath, 'plugins'));
            shell.rm('-f', path.join(appPath, 'cordova_plugins.js'));
        });
        // remove merged js file
        shell.rm('-f', mergedJsPath);
    },
    restoreDiscreteJs : function(opts, merged) {
        if(!merged) {
            return;
        }
        // resotre xface.js
        opts.parser.update_www();

        var stagingDir = path.join(opts.platformProj, '.xstaging');
        // restore cordova_plugins.js and discrete plugin js
        var appIds = multiapp_helpers.getInstalledApps(opts.platformProj, opts.platform),
            xface3Dir = path.dirname(opts.parser.www_dir());
        appIds.forEach(function(id) {
            var appPath = path.join(xface3Dir, id);
            shell.cp('-rf', path.join(stagingDir, 'plugins'), appPath);
            shell.cp('-f', path.join(stagingDir, 'cordova_plugins.js'), appPath);
        });
    }
};
