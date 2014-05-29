var fs = require('fs'),
    path = require('path'),
    shell = require('shelljs'),
    Q = require('q'),
    xfaceUtil = require('../cordova/util'),
    setting = require('./setting');

/**
 * add命令：安装应用到平台工程下；list命令：列出平台工程下安装的所有应用；export命令：将已安装插件的测试用例导出到指定位置
 * @param {String} command 支持的命令:add, list, export
 * @param {Array} add命令: targets如果值为`test`，则将已安装插件测试页面合并，然后将合并后页面安装到平台工程下，
 *      如果为路径，则安装该路径下对应的应用页面
 */
module.exports = function(command, targets) {
    if (arguments.length === 0) {
        return Q.reject(new Error('No auguments is provided. '));
    }
    return Q.try(function() {
        var xfaceProj = xfaceUtil.isCordova(process.cwd());
        if (!xfaceProj) {
            return Q.reject(new Error('Current working directory is not a xFace-based project.'));
        }
        var repoSet = setting('repoSet'),
            testTemplate = path.join(repoSet, 'xface-test-template');
        if(!fs.existsSync(testTemplate)) {
            return Q.reject(new Error('No test template in repo set dir, please use xsrc tool to clone it.'));
        }
        var xface_app = require('../cordova/app');
        if(command == 'export') {
            if(!targets || targets.length == 0) {
                return Q.reject(new Error('Please provide the target path of plugin testcases.'));
            }
            var targetDir = targets[0],
                targetZip = path.join(targetDir, 'PluginTestCases.zip');
            if(!fs.existsSync(targetDir)) {
                shell.mkdir('-p', targetDir);
            } else if(fs.existsSync(targetZip)) {
                shell.rm('-f', targetZip);
            }
            return xface_app.generatePluginTest(xfaceProj, 'test', testTemplate)
            .then(function(testPath) {
                return xfaceUtil.zipFolder(path.join(testPath, '*'), targetZip);
            });
        } else {
            return xface_app(command, targets, testTemplate);
        }
    });
};
