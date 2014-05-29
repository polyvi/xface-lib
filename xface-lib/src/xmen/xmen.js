var events = require('./events'),
    path           = require('path'),
    fs             = require('fs'),
    xface          = require('../cordova/cordova'),
    xfaceUtil      = require('../cordova/util');

var off = function() {
    events.removeListener.apply(events, arguments);
};

var emit = function() {
    events.emit.apply(events, arguments);
};

module.exports = {
    prepush:   require('./prepush'),
    compile:   xface.compile,
    run:       xface.run,
    ripple:    xface.ripple,
    emulate:   xface.emulate,
    serve:     xface.serve,
    on:        function() {
        events.on.apply(events, arguments);
    },
    off:       off,
    removeListener:off,
    removeAllListeners:function() {
        events.removeAllListeners.apply(events, arguments);
    },
    emit:      emit,
    trigger:   emit,
    raw:    {},

    set:    require('./setting')
};

xfaceUtil.addModuleProperty(module, 'create', './create', true);
xfaceUtil.addModuleProperty(module, 'prepare', './prepare', true);
xfaceUtil.addModuleProperty(module, 'build', './build', true);
xfaceUtil.addModuleProperty(module, 'platform', './platform', true);
xfaceUtil.addModuleProperty(module, 'platforms', './platform', true);
xfaceUtil.addModuleProperty(module, 'reset', './reset', true);
xfaceUtil.addModuleProperty(module, 'plugin', './plugin', true);
xfaceUtil.addModuleProperty(module, 'plugins', './plugin', true);
xfaceUtil.addModuleProperty(module, 'app', './app', true);
