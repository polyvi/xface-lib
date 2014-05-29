var Q           = require('q'),
    path        = require('path'),
    fs          = require('fs'),
    shell       = require('shelljs'),
    setting     = require('./setting');

/**
 * @param dir 创建xface工程的目录路径
 * @param id 工程的id
 * @param name 工程的名称
 **/
module.exports = function create (dir, id, name) {
    if (arguments.length === 0) {
        return Q.reject(new Error('No arguments is provided. '));
    }

    // Massage parameters
    var args = Array.prototype.slice.call(arguments, 0);
    if(args.length > 3) {
        dir = args.shift();
        id = args.shift();
        name = args.shift();
        args = [dir, id, name];
    }
    return require('../cordova/create').apply(null, args)
    .then(function() {
        //设置dev type
        var json = {};
        json['dev_type'] = 'internal';
        //将repoSet配置项从global_setting.json拷贝到config.json中
        var globalSettingPath = setting.getGlobalSettingPath(),
            reposet = JSON.parse(fs.readFileSync(globalSettingPath), 'utf-8')['repoSet'];
        if(!reposet) {
            return Q.reject(new Error('The reposet is not set, maybe you should execute command `xsrc reposet -i -p`.'));
        }
        json['repoSet'] = reposet;
        return require('../cordova/config')(dir, json);
    })
    .then(function() {
        // res images of default app are too large, we just remove them
        // it will be very well for player package
        var wwwResPath = path.join(dir, 'www', 'helloxface', 'res');
        fs.existsSync(wwwResPath) && shell.rm('-rf', wwwResPath);
    });
};
