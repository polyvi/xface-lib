var Q = require('q'),
    path = require('path'),
    fs = require('fs'),
    glob = require('glob'),
    shell = require('shelljs'),
    im = require('imagemagick'),
    xml_helpers = require('../../util/xml-helpers'),
    events = require('../events'),
    common = require('./common'),
    util = require('../util/util');

module.exports = {};

//***********************处理构建时传入的参数***************************//

module.exports.buildHandler = {
    beforePrepare : function(opts) {
        return common.handleActions(opts, beforePrepareActions);
    },
    beforeCompile : function(opts) {
        return common.handleActions(opts, beforeCompileActions);
    },
    afterCompile : function(opts) {
        return common.handleActions(opts, afterCompileActions);
    }
};

var beforePrepareActions = {
    'apps' : function(opts, appsObj) {
        return common.prepareApps(opts, appsObj);
    }
};

var beforeCompileActions = {
    'icon' : function(opts, iconConfig) {
        var iconPath = iconConfig['path'];
        if(!fs.existsSync(iconPath)) {
            return Q.reject(new Error('Icon file "' + iconPath + '" do not exist.'));
        }

        return util.checkImageMagick()
        .then(function() {
            var resPath = path.join(opts.platformProj, 'res'),
                drawableResolutions = {
                    'drawable' : '96x96',
                    'drawable-hdpi' : '72x72',
                    'drawable-ldpi' : '36x36',
                    'drawable-mdpi' : '48x48',
                    'drawable-xhdpi' : '96x96'
                };
            return fs.readdirSync(resPath).reduce(function(soFar, file) {
                return soFar.then(function() {
                    if(!drawableResolutions[file] || fs.lstatSync(path.join(resPath, file)).isFile()) return Q();

                    // 这儿使用`!`是强制将图片缩放成指定宽高的图片，不一定是等比例缩放
                    var resizeOpt = [iconPath, '-resize', drawableResolutions[file] + '!', path.join(resPath, file, 'icon.png')];
                    var d = Q.defer();
                    im.convert(resizeOpt, function(err) {
                        if(err) d.reject(err);
                        else d.resolve();
                    });
                    return d.promise;
                });
            }, Q());
        });
    },
    'splash' : function(opts, splashConfig) {
        var splashPath = splashConfig['path'],
            showSplash = splashConfig['show'],
            autoHide = splashConfig['auto_hide'],
            showVersion = splashConfig['show_version'],
            showSpinner = splashConfig['show_screen_spinner'];

        var configXml = opts.parser.config_xml();
        var doc = xml_helpers.parseElementtreeSync(configXml);
        if(splashPath) {
            if(!fs.existsSync(splashPath)) {
                return Q.reject(new Error('Splash file "' + splashPath + '" do not exist.'));
            }
            // 此处将splash的后缀名强制设为.png，是因为xface-android库工程中已经存在splash.png文件，
            // 避免出现编译错误
            var destSplash = path.join(opts.platformProj, 'res', 'drawable', 'splash.png');
            // remove all images named splash.*
            var images = glob.sync(path.join(opts.platformProj, 'res', 'drawable*', 'splash.*'));
            images.forEach(function(logo) {
                shell.rm('-f', logo);
            });
            shell.cp('-f', splashPath, destSplash);

            common.modifyConfigPreference(doc, 'splashscreen', 'splash');
        }
        if(showSplash === false) {
            // if we want splash don't show, just remove splashscreen preference.
            var prefElement = doc.find('preference[@name="splashscreen"]');
            prefElement && doc.getroot().remove(0, prefElement);
        }
        if(autoHide != undefined) {
            common.modifyConfigPreference(doc, 'AutoHideSplashScreen', Boolean(autoHide));
        }
        if(showVersion === false) {
            var engineVersionElement = doc.find('preference[@name="EngineVersion"]'),
                engineBuildElement = doc.find('preference[@name="EngineBuild"]');
            engineVersionElement && doc.getroot().remove(0, engineVersionElement);
            engineBuildElement && doc.getroot().remove(0, engineBuildElement);
        }
        //TODO: 处理'show_screen_spinner'配置
        fs.writeFileSync(configXml, doc.write({indent: 4}), 'utf-8');
    },
    'app_signature' : function(opts, signatureConfig) {
        var keystore = signatureConfig['keystore_path'],
            keyalias = signatureConfig['key_alias'],
            storepassword = signatureConfig['store_password'],
            aliaspassword = signatureConfig['alias_password'];
        if(!keystore || !keyalias || !storepassword || !aliaspassword) {
            return Q.reject(new Error('Option "keystore_path", "key_alias", "store_password", "alias_password" are required for app_signature tag.'));
        }

        return Q.try(function() {
            var localPropertiesPath = path.join(opts.platformProj, 'local.properties'),
                content = fs.readFileSync(localPropertiesPath, 'utf-8');

            if(!fs.existsSync(keystore)) {
                return Q.reject(new Error('The value of option "keystore_path" should be an existed file path.'));
            }
            var keyStoreConfig = {
                'key.store' : path.resolve(keystore).replace(/\\/g, '\\\\'),
                'key.alias' : keyalias,
                'key.store.password' : storepassword,
                'key.alias.password' : aliaspassword
            };
            events.emit('verbose', 'Beginning to configure the key store of android app package.');
            if(content.slice(content.length - 1) != '\n') {
                content = content + '\n';
            }
            Object.keys(keyStoreConfig).forEach(function(key) {
                if(content.indexOf(key) == -1) {
                    content = content + key + '=' + keyStoreConfig[key] + '\n';
                } else {
                    content = content.replace(new RegExp('(' + key + ')=.*', 'gm'), '$1=' + keyStoreConfig[key]);
                }
            });
            fs.writeFileSync(localPropertiesPath, content, 'utf-8');
        });
    },
    'product_config' : function(opts, productConfig) {
        var title = productConfig['program_name'],
            versionName = productConfig['version_name'],
            versionCode = productConfig['version_code'];
        if(title) {
            var stringsXml = path.join(opts.platformProj, 'res', 'values', 'strings.xml');
            var strings = xml_helpers.parseElementtreeSync(stringsXml),
                appNameElement = strings.find('string[@name="app_name"]');
            opts.appName = appNameElement.text;
            appNameElement.text = title;
            fs.writeFileSync(stringsXml, strings.write({indent: 4}), 'utf-8');
        }

        var manifest = opts.parser.manifest,
            doc = xml_helpers.parseElementtreeSync(manifest);
        if(versionName) {
            doc.getroot().attrib['android:versionName'] = String(versionName);
        }
        if(productConfig.hasOwnProperty('version_code')) {
            var versionCode = Number(versionCode);
            if(isNaN(versionCode) || versionCode <= 0) {
                return Q.reject(new Error('The value "' + productConfig['version_code'] + '" of config "product_config/version_code" is invalid.'));
            }
            doc.getroot().attrib['android:versionCode'] = versionCode;
        }
        fs.writeFileSync(manifest, doc.write({indent: 4}), 'utf-8');
    },
    'engine_config' : function(opts, engineConfig) {
        common.handleEngineConfig(opts, engineConfig, 'android');
        var filters = [];
        var manifest = opts.parser.manifest,
            doc = xml_helpers.parseElementtreeSync(manifest);
        if(engineConfig.hasOwnProperty('orientation')) {
            var orientation = engineConfig['orientation'].toLowerCase(),
                landscape = (orientation.indexOf('landscape') !== -1),
                portrait = (orientation.indexOf('portrait') !== -1);
            var activityElement = doc.find('.//activity/intent-filter/action/../..');
            if(landscape && portrait) {
                activityElement.attrib['android:screenOrientation'] = 'unspecified';
            } else if(landscape) {
                activityElement.attrib['android:screenOrientation'] = 'landscape';
                filters.push(/^drawable-port-.*dpi$/);
            } else if(portrait) {
                activityElement.attrib['android:screenOrientation'] = 'portrait';
                filters.push(/^drawable-land-.*dpi$/);
            }
        }
        if(engineConfig.hasOwnProperty('dpi')) {
            var dpi = engineConfig.dpi.toLowerCase();
            if(dpi.indexOf('all') == -1) {
                if(dpi.indexOf('ldpi') == -1) {
                    filters.push(/^drawable.*-ldpi$/);
                }
                if(dpi.indexOf('mdpi') == -1) {
                    filters.push(/^drawable.*-mdpi$/);
                }
                if(dpi.indexOf('hdpi') == -1) {
                    filters.push(/^drawable.*-hdpi$/);
                }
                if(dpi.indexOf('xhdpi') == -1) {
                    filters.push(/^drawable.*-xhdpi$/);
                }
            }
        }
        if(filters.length > 0) {
            var resPath = path.join(opts.platformProj, 'res');
            var redundantResources = fs.readdirSync(resPath).filter(function(name) {
                return !filters.every(function(pattern) {
                    return !pattern.test(name);
                });
            });
            if(redundantResources.length > 0) {
                var stagingDir = path.join(opts.platformProj, '.xstaging');
                if(!fs.existsSync(stagingDir)) {
                    shell.mkdir('-p', stagingDir);
                }
                var backupResourceDir = path.join(stagingDir, 'backup_res');
                // maybe last time restore operation was not finished
                if(fs.existsSync(backupResourceDir)) {
                    shell.cp('-rf', path.join(backupResourceDir, '*'), resPath);
                    shell.rm('-rf', backupResourceDir);
                }
                redundantResources.forEach(function(name) {
                    var subdir = path.join(resPath, name);
                    shell.cp('-rf', subdir, backupResourceDir);
                    // drawable-ldpi, drawable-mdpi, drawable-hdpi文件夹下的icon不能删掉，删掉之后构建时sdk会自动
                    // 放置一张默认icon图片
                    if(/^drawable-[lmh]dpi$/.test(name)) {
                        fs.readdirSync(subdir).forEach(function(f) {
                            if(!/^icon\..+$/i.test(f)) {
                                shell.rm('-rf', path.join(subdir, f));
                            }
                        });
                    } else {
                        shell.rm('-rf', subdir);
                    }
                });
                opts._backupResourceDir = backupResourceDir;
            }
        }

        if(engineConfig.hasOwnProperty('main_launcher')) {
            var isMainLauncher = engineConfig['main_launcher'];
            var intentFilterElement = doc.find('.//activity/intent-filter/action/..'),
                actionElement = intentFilterElement.find('action'),
                categoryElement = intentFilterElement.find('category');
            if(isMainLauncher) {
                actionElement.attrib['android:name'] = 'android.intent.action.MAIN';
                categoryElement.attrib['android:name'] = 'android.intent.category.LAUNCHER';
            } else {
                actionElement.attrib['android:name'] = 'android.intent.action.VIEW';
                categoryElement.attrib['android:name'] = 'android.intent.category.DEFAULT';
                opts.revertAction = true; // after compiling, we need revert action and category element
            }
        }
        fs.writeFileSync(manifest, doc.write({indent: 4}), 'utf-8');
    },
    'https_certificate' : function(opts, certificateConfig) {
        return common.handleHttpsCertificateConfig(opts, certificateConfig, function() {
            return path.join(opts.platformProj, 'assets');
        });
    },
    'umeng_channel' : function(opts, channelName) {
        var manifestXmlPath = path.join(opts.platformProj, 'AndroidManifest.xml'),
            doc = xml_helpers.parseElementtreeSync(manifestXmlPath);
        var channelTag = doc.find('./application/meta-data[@android:name="UMENG_CHANNEL"]');
        if(!channelTag) {
            return Q.reject('Can\'t modify umeng channel, because umeng plugin is not installed, please install it first.');
        }
        opts.originalUmengChannel = channelTag.attrib['android:value'];
        channelTag.attrib['android:value'] = channelName;
        fs.writeFileSync(manifestXmlPath, doc.write({indent: 4}), 'utf-8');
    },
    'merge_js' : function(opts, merged) {
        common.mergePluginsJs(opts, merged);
    }
};

var afterCompileActions = {
    'app_signature' : function(opts, signatureConfig) {
        var localPropertiesPath = path.join(opts.platformProj, 'local.properties'),
                content = fs.readFileSync(localPropertiesPath, 'utf-8');
        var newContent = content.replace(/key\.store=[\s\S]*?key\.alias=[\s\S]*?key\.store\.password=[\s\S]*?key\.alias\.password=[\s\S]*/, '');
        if(content != newContent) {
            fs.writeFileSync(localPropertiesPath, newContent, 'utf-8');
            events.emit('verbose', 'The apk signature configuration is removed.');
        }
        return Q();
    },
    'output' : function(opts, outputConfig) {
        var destPackagePath = outputConfig['package_path'],
            srcPackagePath;
        if(opts.buildType == 'lib') {
            srcPackagePath = path.join(opts.platformProj, 'bin', 'xfaceSdk.zip');
            if(!fs.existsSync(srcPackagePath)) {
                return Q.reject(new Error('Can\'t find lib package file "' + srcPackagePath + '".'));
            }
        } else {
            var availableApks= glob.sync(path.join(opts.platformProj, 'ant-build', '*-' + opts.buildType + '*.apk'));
            var len = availableApks.length;
            if(len === 1) {
                srcPackagePath = availableApks[0];
            } else if(len > 1) {
                availableApks.every(function(apk) {
                    if(new RegExp('.*-' + opts.buildType + '[.]apk').test(apk)) {
                        srcPackagePath = apk;
                        return false;
                    }
                    return true;
                });
            }
            if(!srcPackagePath) {
                return Q.reject(new Error('Can\'t find the output apk file of project.'));
            }
        }
        if(destPackagePath) {
            if(fs.existsSync(destPackagePath)) shell.rm('-f', destPackagePath);
            shell.mkdir('-p', path.dirname(destPackagePath));
            events.emit('verbose', 'Copy output package file "' + path.basename(srcPackagePath) + '".');
            shell.cp('-f', srcPackagePath, destPackagePath);
        }
    },
    'program_name' : function(opts) {
        // restore app name
        var stringsXml = path.join(opts.platformProj, 'res', 'values', 'strings.xml');
        var strings = xml_helpers.parseElementtreeSync(stringsXml);
        strings.find('string[@name="app_name"]').text = opts.appName;
        fs.writeFileSync(stringsXml, strings.write({indent: 4}), 'utf-8');
    },
    'https_certificate' : function(opts) {
        opts.filesToClean && opts.filesToClean.forEach(function(file) {
            shell.rm('-rf', file);
        });
        delete opts.filesToClean;
    },
    'umeng_channel' : function(opts) {
        if(opts.originalUmengChannel != undefined) {
            var manifestXmlPath = path.join(opts.platformProj, 'AndroidManifest.xml'),
                doc = xml_helpers.parseElementtreeSync(manifestXmlPath);
            var channelTag = doc.find('./application/meta-data[@android:name="UMENG_CHANNEL"]');
            channelTag.attrib['android:value'] = opts.originalUmengChannel;
            fs.writeFileSync(manifestXmlPath, doc.write({indent: 4}), 'utf-8');
            delete opts.originalUmengChannel;
        }
    },
    'engine_config' : function(opts) {
        if(opts.revertAction) {
            var manifest = opts.parser.manifest,
                doc = xml_helpers.parseElementtreeSync(manifest),
                intentFilterElement = doc.find('.//activity/intent-filter/action/..'),
                actionElement = intentFilterElement.find('action'),
                categoryElement = intentFilterElement.find('category');

            actionElement.attrib['android:name'] = 'android.intent.action.MAIN';
            categoryElement.attrib['android:name'] = 'android.intent.category.LAUNCHER';
            fs.writeFileSync(manifest, doc.write({indent: 4}), 'utf-8');
            delete opts.revertAction;
        }
        // restore image resources
        if(opts.hasOwnProperty('_backupResourceDir')) {
            shell.cp('-rf', path.join(opts._backupResourceDir, '*'), path.join(opts.platformProj, 'res'));
            shell.rm('-rf', opts._backupResourceDir);
            delete opts._backupResourceDir;
        }
    },
    'merge_js' : function(opts, merged) {
        common.restoreDiscreteJs(opts, merged);
    }
};
