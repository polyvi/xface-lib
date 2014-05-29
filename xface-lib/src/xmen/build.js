var fs = require('fs'),
    path = require('path'),
    shell = require('shelljs'),
    optimist = require('optimist'),
    xfaceUtil = require('../cordova/util'),
    hooker = require('../cordova/hooker'),
    xface_platforms = require('../cordova/platforms'),
    Q = require('q'),
    events = require('./events'),
    util = require('./util/util');

var buildHandler = {
    'android' : require('./metadata/android').buildHandler,
    'ios' : require('./metadata/ios').buildHandler,
    'wp8' : require('./metadata/wp8').buildHandler
};

/**
 * option '-p' indicate the compilation config file
 * option '--lib' indicate library mode, option '-o' indicate output path of library package
 */
module.exports = function(options) {
    var projectRoot = xfaceUtil.cdProjectRoot();

    options = xfaceUtil.preProcessOptions(options);
    if (options.constructor.name === "Error") {
        return Q.reject(options);
    }

    var args = optimist(options.options)
        .string('p')
        .boolean('release')
        .boolean('lib') // library
        .boolean('merge-js')
        .string('o') // output
        .argv;

    var opts, platform, outputPath;
    if(options.platforms.length == 1) {
        platform = options.platforms[0];
        opts = {
            'paramsJson' : {},
            'projectRoot' : projectRoot,
            'platformProj' : path.join(projectRoot, 'platforms', platform),
            'buildType' : 'debug',
            'platform' : platform
        };
        opts.parser = new (xface_platforms[platform].parser)(opts.platformProj);

        if(args['merge-js']) {
            var outputPath = args.o;
            if(!outputPath) {
                return Q.reject('Output path of js file is required, please use "-o" option and try again.');
            }
            util.mergeJs(opts.platformProj, outputPath);
            return Q();
        }

        // 在编译单个平台且-p参数存在时，进行传入的构建参数处理操作
        if(args['p']) {
            if(!fs.existsSync(args['p'])) {
                return Q.reject(new Error('The build config file "' + args['p'] + '" do not exist.'));
            }
            var paramsJson;
            try {
                paramsJson = JSON.parse(fs.readFileSync(args['p'], 'utf-8'));
            } catch (e) {
                events.emit('warn', 'Parse json file "' + args['p'] + '" failed.');
                throw e;
            }
            if(!buildHandler[platform]) {
                return Q.reject(new Error('Build failed, platform "' + platform + '" not supported.'));
            }
            // enable js merging by default
            if(!paramsJson.hasOwnProperty('merge_js')) {
                paramsJson.merge_js = true;
            }

            opts.paramsJson = paramsJson;
            args.release && (opts.buildType = 'release');
            // remove '-p' parameter
            util.stripParameter(options, 'p');
        }
        if(args.lib) { // build library package
            opts.buildType = 'lib';
            opts.paramsJson.merge_js = true;
        }
        if(args.hasOwnProperty('o')) {
            opts.paramsJson['output'] = { 'package_path' : args['o'] }; // override output package path
            util.stripParameter(options, 'o');
        }
    } else {
        if(args.p || args.lib || args.o || args['merge-js']) {
            return Q.reject(new Error('Option "-p", "--lib", "-o" and "--merge-js" are only supported under one platform.'));
        }
    }

    // fire build hooks
    var hooks = new hooker(projectRoot);
    return hooks.fire('before_build', options)
    .then(function() {
        if(opts.paramsJson) return buildHandler[platform].beforePrepare(opts);
    }).then(function() {
        return require('./xmen').raw.prepare(options);
    }).then(function() {
        if(opts.paramsJson) return buildHandler[platform].beforeCompile(opts);
    }).then(function() {
        return require('../cordova/compile')(options);
    }).then(function() {
        if(opts.paramsJson) return buildHandler[platform].afterCompile(opts);
    }).then(function() {
        return hooks.fire('after_build', options);
    });
};
