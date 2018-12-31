'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var PackageJson = require('../../package.json');
var EXTENSION_NAME = PackageJson.name;
function doLog(level, msgs) {
    console[level].apply(console, ['[' + EXTENSION_NAME + ']'].concat(msgs));
}
function info() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    doLog('log', messages);
}
exports.info = info;
function warn() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    doLog('warn', messages);
}
exports.warn = warn;
function error() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    doLog('error', messages);
}
exports.error = error;
