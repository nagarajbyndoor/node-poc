'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var ts_completions_1 = require("./ts-completions");
var ts_diagnostics_1 = require("./ts-diagnostics");
var ts_utils_1 = require("./ts-utils");
var PackageJson = require('../../package.json');
var EXTENSION_NAME = PackageJson.name;
var EXTENSION_UNIQUE_NAME = 'zaggino.' + EXTENSION_NAME;
var domainName = EXTENSION_UNIQUE_NAME;
var domainManager = null;
exports.init = function (_domainManager) {
    domainManager = _domainManager;
    if (!domainManager.hasDomain(domainName)) {
        domainManager.registerDomain(domainName, { major: 0, minor: 1 });
    }
    domainManager.registerCommand(domainName, 'fileChange', ts_utils_1.onFileChange, false, 'fileChange', [
        { name: 'fileChangeNotification', type: 'object' }
    ], [
        { name: 'processed', type: 'boolean' }
    ]);
    domainManager.registerCommand(domainName, 'projectRefresh', ts_utils_1.onProjectRefresh, false, 'projectRefresh', [
        { name: 'projectRoot', type: 'string' }
    ], [
        { name: 'processed', type: 'boolean' }
    ]);
    domainManager.registerCommand(domainName, 'projectClose', ts_utils_1.onProjectClose, false, 'projectClose', [
        { name: 'projectRoot', type: 'string' }
    ], [
        { name: 'processed', type: 'boolean' }
    ]);
    domainManager.registerCommand(domainName, 'getDiagnostics', ts_diagnostics_1.getDiagnostics, true, 'getDiagnostics', [
        { name: 'projectRoot', type: 'string' },
        { name: 'fullPath', type: 'string' },
        { name: 'code', type: 'string' }
    ], [
        { name: 'report', type: 'object' }
    ]);
    domainManager.registerCommand(domainName, 'getCompletions', ts_completions_1.getCompletions, true, 'getCompletions', [
        { name: 'projectRoot', type: 'string' },
        { name: 'fullPath', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'position', type: 'number' }
    ], [
        { name: 'report', type: 'object' }
    ]);
};
