var Q = require('q'),
    fs = require('fs'),
    path = require('path'),
    im = require('imagemagick'),
    glob = require('glob'),
    shell = require('shelljs'),
    xml_helpers = require('../../util/xml-helpers'),
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
            var destIconPath = path.join(opts.platformProj, 'Assets', 'ApplicationIcon.png');
            // 这儿使用`!`是强制将图片缩放成指定宽高的图片，不一定是等比例缩放
            var resizeOpt = [iconPath, '-resize', '100x100!', destIconPath];
            var d = Q.defer();
            im.convert(resizeOpt, function(err) {
                if(err) d.reject(err);
                else d.resolve();
            });
            return d.promise;
        });
    },
    'splash' : function(opts, splashConfig) {
        var splashPath = splashConfig['path'];
        if(splashPath) {
            if(!fs.existsSync(splashPath)) {
                return Q.reject(new Error('Splash file "' + splashPath + '" do not exist.'));
            }
            var splashResolutions = {
                'SplashScreenImage-720p' : '720x1280',
                'SplashScreenImage-1080p' : '1080x1920',
                'SplashScreenImage-WVGA' : '480x800',
                'SplashScreenImage-WXGA' : '768x1280'
            };
            return Object.keys(splashResolutions).reduce(function(soFar, key) {
                return soFar.then(function() {
                    var destSplashPath = path.join(opts.platformProj, key + '.jpg');

                    // 这儿使用`!`是强制将图片缩放成指定宽高的图片，不一定是等比例缩放
                    var resizeOpt = [splashPath, '-resize', splashResolutions[key] + '!', destSplashPath];
                    var d = Q.defer();
                    im.convert(resizeOpt, function(err) {
                        if(err) d.reject(err);
                        else d.resolve();
                    });
                    return d.promise;
                });
            }, Q());
        }
    },
    'tile' : function(opts, tileConfig) {
        var tilePath = tileConfig['path'];
        if(tilePath) {
            if(!fs.existsSync(tilePath)) {
                return Q.reject(new Error('Tile file "' + tilePath + '" do not exist.'));
            }
            // 暂不生成FlipCycleTileLarge.png，其分辨率为691x336，传入一张图片时，会存在拉伸情况，故暂不处理
            var tileResolutions = {
                'FlipCycleTileMedium' : '336x336',
                'FlipCycleTileSmall' : '159x159'
            };
            return Object.keys(tileResolutions).reduce(function(soFar, key) {
                return soFar.then(function() {
                    var destTilePath = path.join(opts.platformProj, 'Assets', 'Tiles', key + '.png');

                    // 这儿使用`!`是强制将图片缩放成指定宽高的图片，不一定是等比例缩放
                    var resizeOpt = [tilePath, '-resize', tileResolutions[key] + '!', destTilePath];
                    var d = Q.defer();
                    im.convert(resizeOpt, function(err) {
                        if(err) d.reject(err);
                        else d.resolve();
                    });
                    return d.promise;
                });
            }, Q());
        }
    },
    'product_config' : function(opts, productConfig) {
        var title = productConfig['program_name'],
            versionName = productConfig['version_name'],
            author = productConfig['author'],
            publisher = productConfig['publisher'];
        var manifest = opts.parser.manifest_path,
            doc = xml_helpers.parseElementtreeSync(manifest);
        var appElement = doc.find('./App');
        if(!appElement) {
            return Q.reject(new Error('Can\'t read "Deployment/App" element of file "WMAppManifest.xml".'));
        }
        title && (appElement.attrib['Title'] = title);
        versionName && (appElement.attrib['Version'] = versionName);
        author && (appElement.attrib['Author'] = author);
        publisher && (appElement.attrib['Publisher'] = publisher);
        fs.writeFileSync(manifest, doc.write({indent: 4}), 'utf-8');
    },
    'engine_config' : function(opts, engineConfig) {
        common.handleEngineConfig(opts, engineConfig, 'wp8');
    },
    'merge_js' : function(opts, merged) {
        common.mergePluginsJs(opts, merged);
    }
};

var afterCompileActions = {
    'output' : function(opts, outputConfig) {
        var destPackagePath = outputConfig['package_path'];
        if(destPackagePath) {
            var availableXaps = glob.sync(path.join(opts.platformProj, 'Bin', '*', '*.xap'));
            if(availableXaps.length < 1) {
                return Q.reject(new Error('Can\'t find binary package *.xap in "Bin" folder.'));
            }

            fs.existsSync(destPackagePath) && shell.rm('-f', destPackagePath);
            shell.mkdir('-p', path.dirname(destPackagePath));
            shell.cp('-f', availableXaps[0], destPackagePath);
        }
    },
    'merge_js' : function(opts, merged) {
        common.restoreDiscreteJs(opts, merged);
    }
};
