var Q = require('q'),
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    shell = require('shelljs'),
    im = require('imagemagick'),
    plist = require('plist-with-patches'),
    xml_helpers = require('../../util/xml-helpers'),
    xcode = require('xcode'),
    events = require('../events'),
    common = require('./common'),
    util = require('../util/util');

module.exports = {};

//***********************处理构建时传入的参数***************************//

module.exports.buildHandler = {
    beforePrepare : function(opts) {
        backupPbxProject(opts);
        return common.handleActions(opts, beforePrepareActions);
    },
    beforeCompile : function(opts) {
        return common.handleActions(opts, beforeCompileActions);
    },
    afterCompile : function(opts) {
        return generateIpa(opts)
        .then(function() {
            return common.handleActions(opts, afterCompileActions);
        })
        .then(function() {
            restorePbxProject(opts);
        });
    }
};

function backupPbxProject(opts) {
    var pbxProjectPath = opts.parser.pbxproj,
        backupPath = pbxProjectPath + '_backup_for_build';
    if(fs.existsSync(backupPath)) {
        shell.cp('-f', backupPath, pbxProjectPath);
    } else {
        shell.cp('-f', pbxProjectPath, backupPath);
    }
    opts._backupPbxFile = backupPath;
}

function restorePbxProject(opts) {
    var pbxProjectPath = opts.parser.pbxproj;
    shell.mv('-f', opts._backupPbxFile, pbxProjectPath);
    delete opts._backupPbxFile;
}

function removeSplashesFromProject(pbxprojPath, fileNames) {
    if(!fileNames.length) {
        return;
    }

    var pbx = new xcode.project(pbxprojPath);
    pbx.parseSync();
    fileNames.forEach(function(fileName) {
        fileName += '.png';
        var file = pbx.removeResourceFile(fileName),
            children = pbx.pbxGroupByName('splash').children;
        for(i in children) {
            if(children[i].value == file.fileRef && children[i].comment == file.basename) {
                children.splice(i, 1);
                break;
            }
        }
    });
    fs.writeFileSync(pbxprojPath, pbx.writeSync(), 'utf-8');
}

function generateIpa(opts) {
    if(opts.buildType == 'lib') { // not necessary
        return Q();
    }
    // using PackageApplication command to generate ipa package
    events.emit('verbose', "Beginning to generate ipa package...");
    var deviceBuildFolder = path.join(opts.platformProj, 'build/device');

    var apps = glob.sync(path.join(deviceBuildFolder, '*.app'));
    // maybe building for iphoneos is failed, so check it
    // it happens when there is no matched certificate and provisoning profile, then building for iphoneos is failed,
    // but building for simulator is successed, so we quit because there is no *.app for iphoneos
    if(apps.length == 0) {
        return Q.reject('Can\'t find output *.app in folder "' + deviceBuildFolder + '", maybe building for iphoneos is failed.');
    }
    var dotAppPath = apps[0],
        appName = path.basename(apps[0]),
        dSYMPath = dotAppPath + '.dSYM';

    appName = appName.slice(0, appName.lastIndexOf('.app'));
    // just pack *.app to *.ipa, no need to resign it
    var ipa_path = path.join(opts.platformProj, appName + '.ipa');
    var cmd = 'xcrun -sdk iphoneos PackageApplication -v "' + dotAppPath + '" -o "' + ipa_path + '"';
    if(shell.exec(cmd).code != 0) return Q.reject('Executing "PackageApplication" command failed.');
    opts.ipaPath = ipa_path;
    if(fs.existsSync(dSYMPath)) {
        opts.dsymPath = dSYMPath;
    } else {
        events.emit('warn', 'File "' + dSYMPath + '" is not existed.');
    }
    return Q();
}

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
            var availableIconFolders = glob.sync(path.join(opts.platformProj, '*', 'Resources', 'icons'));
            if(availableIconFolders.length == 0) {
                return Q.reject(new Error('Can\'t find the folder path of icons.'));
            }
            var destIconFolder = availableIconFolders[0],
                iconResolutions = {
                    'icon-40' : '40x40',
                    'icon-40@2x' : '80x80',
                    'icon-50' : '50x50',
                    'icon-50@2x' : '100x100',
                    'icon-60' : '60x60',
                    'icon-60@2x' : '120x120',
                    'icon-72' : '72x72',
                    'icon-72@2x' : '144x144',
                    'icon-76' : '76x76',
                    'icon-76@2x' : '152x152',
                    'icon-small' : '29x29',
                    'icon-small@2x' : '58x58',
                    'icon' : '57x57',
                    'icon@2x' : '114x114'
                };
            return Object.keys(iconResolutions).reduce(function(soFar, key) {
                return soFar.then(function() {
                    var destIconPath = path.join(destIconFolder, key + '.png');

                    // 这儿使用`!`是强制将图片缩放成指定宽高的图片，不一定是等比例缩放
                    var resizeOpt = [iconPath, '-resize', iconResolutions[key] + '!', destIconPath];
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
            autoHide = splashConfig['auto_hide'],
            showVersion = splashConfig['show_version'],
            fadeConfig = splashConfig['fade'],
            showSpinner = splashConfig['show_screen_spinner'],
            indicatorStyle = splashConfig['top_activity_indicator'];

        var configXml = opts.parser.config_xml();
        var doc = xml_helpers.parseElementtreeSync(configXml);
        if(splashPath) {
            if(!fs.existsSync(splashPath)) {
                return Q.reject(new Error('Splash zip file "' + splashPath + '" does not exist.'));
            }
            if(path.extname(splashPath) != '.zip') {
                return Q.reject(new Error('Splash zip file "' + splashPath + '" must be a file with suffix ".zip".'));
            }
            var availableSplashFolders = glob.sync(path.join(opts.platformProj, '*', 'Resources', 'splash'));
            if(availableSplashFolders.length == 0) {
                return Q.reject(new Error('Can\'t find the folder path of splash.'));
            }
            var destSplashFolder = availableSplashFolders[0];
            util.unzip(splashPath, destSplashFolder);
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
        if(showSpinner != undefined) {
            common.modifyConfigPreference(doc, 'ShowSplashScreenSpinner', Boolean(showSpinner));
        }
        if(indicatorStyle) {
            common.modifyConfigPreference(doc, 'TopActivityIndicator', String(indicatorStyle));
        }
        if(fadeConfig) {
            var fadeEnabled = fadeConfig['enable'],
                fadeDuration = fadeConfig['duration'];
            (fadeEnabled != undefined) && common.modifyConfigPreference(doc, 'FadeSplashScreen', Boolean(fadeEnabled));
            (fadeDuration != undefined) && common.modifyConfigPreference(doc, 'FadeSplashScreenDuration', fadeDuration / 1000); // milli-second to second
        }
        fs.writeFileSync(configXml, doc.write({indent: 4}), 'utf-8');
    },
    "adapted_device" : function(opts, targetDevice) {
        targetDevice = targetDevice.toLowerCase();
        var targetDeviceFamily,
            iphoneSupported = (targetDevice.indexOf('iphone') != -1),
            ipadSupported = (targetDevice.indexOf('ipad') != -1),
            redundantFiles = [];
        if(iphoneSupported && ipadSupported) {
            targetDeviceFamily = '1,2';
        } else if(iphoneSupported) {
            targetDeviceFamily = '1';
            redundantFiles.push('Default-Landscape@2x~ipad');
            redundantFiles.push('Default-Landscape~ipad');
            redundantFiles.push('Default-Portrait@2x~ipad');
            redundantFiles.push('Default-Portrait~ipad');
        } else if(ipadSupported) {
            targetDeviceFamily = '2';
            redundantFiles.push('Default-568h@2x~iphone');
            redundantFiles.push('Default@2x~iphone');
            redundantFiles.push('Default~iphone');
        } else {
            return Q.reject(new Error('The value "' + targetDevice + '" of config "adapted_device" is invalid.'));
        }
        var pbxproj = opts.parser.pbxproj;
        removeSplashesFromProject(pbxproj, redundantFiles);
        shell.sed('-i', /TARGETED_DEVICE_FAMILY\s*=.*?;/, 'TARGETED_DEVICE_FAMILY = "' + targetDeviceFamily + '";', pbxproj);
    },
    'app_signature' : function(opts, signatureConfig) {
        var certPath = signatureConfig['cert_path'],
            provisioningProfile = signatureConfig['provisioning_profile_path'],
            certPassword = signatureConfig['cert_password'];

        var buildConfig = path.join(opts.platformProj, 'cordova', 'build.xcconfig'),
            buildConfigBackup = path.join(opts.platformProj, 'cordova', 'build.xcconfig_backup');
        if(!certPath || !provisioningProfile || !certPassword) {
            return Q.reject(new Error('Option "cert_path", "provisioning_profile_path", "cert_password" are required for app_signature tag.'));
        }
        return Q.try(function() {
            // check certificate and provisioning profile, then import certificate to keychain
            if(!fs.existsSync(certPath)) {
                return Q.reject('Certificate file at path "' + certPath + '" is not existed.');
            }
            if(!fs.existsSync(provisioningProfile)) {
                return Q.reject('Provisioning profile at path "' + provisioningProfile + '" is not existed.');
            }
            var home = process.env['HOME'],
                keychain = path.join(home, 'Library/Keychains/login.keychain'),
                cmd = 'security import "' + certPath + '" -k ' + keychain + ' -t priv -P ' + certPassword + ' -T /usr/bin/codesign';
            if(shell.exec(cmd).code != 0) {
                return Q.reject('Importing certificate from path "' + certPath + '" failed.');
            }

            // read uuid from provisioning profile, then copy the file
            var uuidExpression = /<key>UUID<\/key>[\s\S]*<string>(.*?)<\/string>/;
            var matchData = fs.readFileSync(provisioningProfile, 'utf-8').match(uuidExpression);
            if(!matchData) {
                return Q.reject('Can\'t read uuid from provisioning profile "' + provisioningProfile + '", please check it.');
            }
            var provisionUuid = matchData[1],
                destProvisionProfile = path.join(home, 'Library/MobileDevice/Provisioning Profiles', provisionUuid + '.mobileprovision');
            if(!fs.existsSync(destProvisionProfile)) {
                shell.cp('-f', provisioningProfile, destProvisionProfile);
                opts.provisioningProfile = destProvisionProfile;
            }
            // first backup build.xcconfig, then modify build.xcconfig
            if(!fs.existsSync(buildConfigBackup)) {
                shell.cp('-f', buildConfig, buildConfigBackup);
            }
            opts.buildConfigBackup = buildConfigBackup;
            fs.writeFileSync(buildConfig, 'PROVISIONING_PROFILE = ' + provisionUuid, 'utf-8');
        });
    },
    'product_config' : function(opts, productConfig) {
        var q = Q(),
            title = productConfig['program_name'],
            versionName = productConfig['version_name'];
        if(title) {
            q = q.then(function() {
                return modifyProductName(opts.platformProj, title);
            })
            .then(function(originalName) {
                opts.appName = originalName;
            });
        }
        if(versionName) {
            q = q.then(function() {
                var infoPlists = glob.sync(path.join(opts.parser.cordovaproj, '*-Info.plist'));
                if(infoPlists.length <= 0) {
                    return Q.reject(new Error('Can\'t find *-Info.plist of project.'));
                }

                var infoPlist = infoPlists[0],
                    plistObj = plist.parseFileSync(infoPlist);
                plistObj['CFBundleVersion'] = versionName;
                plistObj['CFBundleShortVersionString'] = versionName;
                fs.writeFileSync(infoPlist, plist.build(plistObj), 'utf-8');
            });
        }
        return q;
    },
    'engine_config' : function(opts, engineConfig) {
        common.handleEngineConfig(opts, engineConfig, 'ios');
        var orientation = engineConfig['orientation'],
            statusBarConfig = engineConfig['status_bar'],
            customUrlScheme = engineConfig['custom_url_scheme'];
        var infoPlists = glob.sync(path.join(opts.parser.cordovaproj, '*-Info.plist'));
        if(infoPlists.length <= 0) {
            return Q.reject(new Error('Can\'t find *-Info.plist of project.'));
        }

        var infoPlist = infoPlists[0],
            plistObj = plist.parseFileSync(infoPlist);
        if(orientation) {
            orientation = orientation.toLowerCase();
            var values = [],
                redundantFiles = [];
            if(orientation.indexOf('portrait') != -1) {
                values = values.concat(['UIInterfaceOrientationPortrait', 'UIInterfaceOrientationPortraitUpsideDown']);
            } else {
                redundantFiles.push('Default-Portrait@2x~ipad');
                redundantFiles.push('Default-Portrait~ipad');
            }
            if(orientation.indexOf('landscape') != -1) {
                values = values.concat(['UIInterfaceOrientationLandscapeLeft', 'UIInterfaceOrientationLandscapeRight']);
            } else {
                redundantFiles.push('Default-Landscape@2x~ipad');
                redundantFiles.push('Default-Landscape~ipad');
            }
            if(values.length === 0) {
                return Q.reject(new Error('The value "' + engineConfig['orientation'] + '" of config "engine_config/orientation" is invalid.'));
            }
            plistObj.hasOwnProperty('UISupportedInterfaceOrientations') && (plistObj['UISupportedInterfaceOrientations'] = values);
            plistObj.hasOwnProperty('UISupportedInterfaceOrientations~ipad') && (plistObj['UISupportedInterfaceOrientations~ipad'] = values);
            removeSplashesFromProject(opts.parser.pbxproj, redundantFiles);
        }
        if(statusBarConfig) {
            if(statusBarConfig.hasOwnProperty('style')) {
                var statusBarStyle = statusBarConfig['style'].toLowerCase(),
                    styleValue;
                if(statusBarStyle == 'default') {
                    styleValue = 'UIStatusBarStyleDefault';
                } else if(statusBarStyle == 'lightcontent') {
                    styleValue = 'UIStatusBarStyleLightContent';
                } else {
                    return Q.reject(new Error('The value "' + statusBarConfig['style'] + '" of config "engine_config/status_bar/style" is invalid.'));
                }
                plistObj['UIStatusBarStyle'] = styleValue;
            }
            if(statusBarConfig['show'] == false) {
                plistObj['UIViewControllerBasedStatusBarAppearance'] = false;
                plistObj['UIStatusBarHidden'] = true;
            } else {
                plistObj['UIViewControllerBasedStatusBarAppearance'] = true;
                plistObj['UIStatusBarHidden'] = false;
            }
        }
        if(customUrlScheme) {
            plistObj['CFBundleURLTypes'] = [ {
                "CFBundleURLSchemes" : [String(customUrlScheme)]
            } ];
        }
        fs.writeFileSync(infoPlist, plist.build(plistObj), 'utf-8');
    },
    'https_certificate' : function(opts, certificateConfig) {
        return common.handleHttpsCertificateConfig(opts, certificateConfig, function() {
            return path.join(opts.parser.cordovaproj, 'assets');
        });
    },
    'merge_js' : function(opts, merged) {
        common.mergePluginsJs(opts, merged);
    }
};

var afterCompileActions = {
    'app_signature' : function(opts, signatureConfig) {
        if(fs.existsSync(opts.buildConfigBackup)) {
            var buildConfig = path.join(opts.platformProj, 'cordova', 'build.xcconfig');
            // restore build.xcconfig
            shell.mv('-f', opts.buildConfigBackup, buildConfig);
        }
        // remove provisioning profile in Library if needed
        if(opts.provisioningProfile) {
            shell.rm('-f', opts.provisioningProfile);
        }
    },
    'program_name' : function(opts) {
        // restore app name
        return modifyProductName(opts.platformProj, opts.appName);
    },
    'output' : function(opts, outputConfig) {
        var destPackagePath = outputConfig['package_path'],
            destDsymPath = outputConfig['dsym_path'];
        if(destPackagePath) {
            if(fs.existsSync(destPackagePath)) shell.rm('-f', destPackagePath);
            shell.mkdir('-p', path.dirname(destPackagePath));
            if(opts.buildType == 'lib') {
                var libPackagePath = path.join(opts.platformProj, 'build', 'xfaceSDK.zip');
                if(!fs.existsSync(libPackagePath)) {
                    return Q.reject(new Error('Can\'t find lib package file "' + libPackagePath + '".'));
                }
                shell.cp('-f', libPackagePath, destPackagePath);
            } else {
                shell.cp('-f', opts.ipaPath, destPackagePath);
                delete opts.ipaPath;
            }
        }
        if(destDsymPath) {
            if(fs.existsSync(destDsymPath)) shell.rm('-rf', destDsymPath);
            shell.mkdir('-p', destDsymPath);
            shell.cp('-rf', path.join(opts.dsymPath, '*'), destDsymPath);
            delete opts.dsymPath;
        }
    },
    'https_certificate' : function(opts) {
        opts.filesToClean && opts.filesToClean.forEach(function(file) {
            shell.rm('-rf', file);
        });
        delete opts.filesToClean;
    },
    'merge_js' : function(opts, merged) {
        common.restoreDiscreteJs(opts, merged);
    }
};

function modifyProductName(platformProj, name) {
    var xcodeprojDir = fs.readdirSync(platformProj).filter(function(e) { return e.match(/\.xcodeproj$/i); })[0];
    if (!xcodeprojDir) throw new Error('The provided path "' + platformProj + '" is not a xFace iOS project.');
    var xcodeprojPath = path.join(platformProj, xcodeprojDir),
        pbxprojPath = path.join(xcodeprojPath, 'project.pbxproj');
    var proj = new xcode.project(pbxprojPath);
    var d = Q.defer();
    proj.parse(function(err, hash) {
        if (err) {
            d.reject(new Error('An error occured during parsing of project.pbxproj. Start weeping. Output: ' + err));
        } else {
            var originalName = proj.productName;
            proj.updateProductName(name);
            fs.writeFileSync(pbxprojPath, proj.writeSync(), 'utf-8');
            d.resolve(originalName);
        }
    });
    return d.promise;
}
