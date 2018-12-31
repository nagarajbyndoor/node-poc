define(function (require, exports, module) {
    var CodeInspection = brackets.getModule('language/CodeInspection');
    var LanguageManager = brackets.getModule('language/LanguageManager');
    var ProjectManager = brackets.getModule('project/ProjectManager');
    var PackageJson = JSON.parse(require('text!../package.json'));
    var EXTENSION_NAME = PackageJson.name;
    var EXTENSION_UNIQUE_NAME = 'zaggino.' + EXTENSION_NAME;
    var nodeDomain = require('./node-domain');
    var log = require('./log');
    var LINTER_NAME = 'TypeScript';
    function handleScanFile(text, fullPath) {
        throw new Error(LINTER_NAME + ' sync code inspection is not available, use async for ' + fullPath);
    }
    function handleScanFileAsync(text, fullPath) {
        var deferred = $.Deferred();
        var projectRoot = ProjectManager.getProjectRoot().fullPath;
        nodeDomain.exec('getDiagnostics', projectRoot, fullPath, text)
            .then(function (report) {
            var w = window;
            if (w.bracketsInspectionGutters) {
                w.bracketsInspectionGutters.set(EXTENSION_UNIQUE_NAME, fullPath, report, true);
            }
            else {
                log.error("No bracketsInspectionGutters found on window, gutters disabled.");
            }
            deferred.resolve(report);
        }, function (err) { return deferred.reject(err); });
        return deferred.promise();
    }
    module.exports = function () {
        ['ts', 'tsx'].forEach(function (extension) {
            var language = LanguageManager.getLanguageForExtension(extension);
            if (language) {
                CodeInspection.register(language.getId(), {
                    name: LINTER_NAME,
                    scanFile: handleScanFile,
                    scanFileAsync: handleScanFileAsync
                });
            }
        });
    };
});
