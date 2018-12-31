"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var language_service_host_1 = require("./language-service-host");
var ts_path_utils_1 = require("./ts-path-utils");
var package_resolver_1 = require("./package-resolver");
var projects = {};
var tsconfigDirMap = {};
function getTsLintConfig(TSLint, tsLintVersion, projectRoot) {
    var versionMajor = parseInt(tsLintVersion, 10);
    if (versionMajor <= 3) {
        var oldTSLint = TSLint;
        var tsLintConfigPath1 = oldTSLint.findConfigurationPath(null, projectRoot);
        return tsLintConfigPath1 ? oldTSLint.loadConfigurationFromPath(tsLintConfigPath1) : null;
    }
    var tsLintConfigPath2 = TSLint.Linter.findConfigurationPath(null, projectRoot);
    return tsLintConfigPath2 ? TSLint.Linter.loadConfigurationFromPath(tsLintConfigPath2) : null;
}
function parseConfigFile(ts, projectRoot) {
    var config = ts.readConfigFile(ts_path_utils_1.combinePaths(projectRoot, 'tsconfig.json'), ts.sys.readFile).config;
    return ts.parseJsonConfigFileContent(config, ts.sys, projectRoot);
}
function hasTsconfigFile(directoryPath) {
    if (directoryPath in tsconfigDirMap) {
        return tsconfigDirMap[directoryPath];
    }
    try {
        tsconfigDirMap[directoryPath] = fs.statSync(ts_path_utils_1.combinePaths(directoryPath, 'tsconfig.json')).isFile();
    }
    catch (err) {
        tsconfigDirMap[directoryPath] = false;
    }
    return tsconfigDirMap[directoryPath];
}
function dirsBetween(rootPath, filePath) {
    var dirs = [];
    if (filePath.indexOf(rootPath) !== 0 || filePath === rootPath) {
        return dirs;
    }
    while (filePath.length > rootPath.length) {
        filePath = path.dirname(filePath);
        dirs.push(filePath);
    }
    return dirs;
}
function getTypeScriptProject(projectRoot, filePath) {
    projectRoot = ts_path_utils_1.normalizePath(projectRoot);
    if (filePath) {
        var newRoot = _.find(dirsBetween(projectRoot, ts_path_utils_1.normalizePath(filePath)), function (dir) { return hasTsconfigFile(dir); });
        if (newRoot) {
            projectRoot = newRoot;
        }
    }
    if (projects[projectRoot]) {
        return projects[projectRoot];
    }
    var _a = package_resolver_1.getProjectPackage(projectRoot, 'typescript'), ts = _a.package, tsPath = _a.packagePath;
    var parsed = parseConfigFile(ts, projectRoot);
    var options = parsed.options;
    var fileNames = parsed.fileNames;
    var languageServiceHost = new language_service_host_1.TypeScriptLanguageServiceHost(ts, tsPath, projectRoot, options, fileNames);
    var languageService = ts.createLanguageService(languageServiceHost, ts.createDocumentRegistry());
    var program = languageService.getProgram();
    var generalDiagnostics = [].concat(program.getGlobalDiagnostics(), program.getOptionsDiagnostics());
    var TsLint = package_resolver_1.getProjectPackage(projectRoot, 'tslint').package;
    var TsLintPackageJson = package_resolver_1.getProjectPackage(projectRoot, 'tslint/package.json').package;
    projects[projectRoot] = {
        ts: ts,
        languageServiceHost: languageServiceHost,
        languageService: languageService,
        generalDiagnostics: generalDiagnostics,
        TsLint: TsLint,
        tsLintVersion: TsLintPackageJson.version,
        tsLintConfig: getTsLintConfig(TsLint, TsLintPackageJson.version, projectRoot)
    };
    return projects[projectRoot];
}
exports.getTypeScriptProject = getTypeScriptProject;
function onProjectRefresh(projectRoot) {
    projectRoot = ts_path_utils_1.normalizePath(projectRoot);
    if (projects[projectRoot]) {
        delete projects[projectRoot];
        getTypeScriptProject(projectRoot);
    }
}
exports.onProjectRefresh = onProjectRefresh;
function onProjectClose(projectRoot) {
    Object.keys(projects).forEach(function (p) {
        delete projects[p];
    });
    Object.keys(tsconfigDirMap).forEach(function (p) {
        delete tsconfigDirMap[p];
    });
}
exports.onProjectClose = onProjectClose;
function onFileChange(notification) {
    notification.fullPath = ts_path_utils_1.normalizePath(notification.fullPath);
    if (/\/tsconfig\.json$/i.test(notification.fullPath)) {
        var parentDir = ts_path_utils_1.normalizePath(path.dirname(notification.fullPath));
        onProjectRefresh(parentDir);
        return;
    }
    if (/\/tslint\.json$/i.test(notification.fullPath)) {
        var parentDir_1 = ts_path_utils_1.normalizePath(path.dirname(notification.fullPath));
        Object.keys(projects).forEach(function (projectRoot) {
            if (projectRoot.indexOf(parentDir_1) === 0) {
                onProjectRefresh(projectRoot);
            }
        });
        return;
    }
    if (notification.isDirectory) {
        Object.keys(tsconfigDirMap).forEach(function (dirPath) {
            if (dirPath.indexOf(notification.fullPath) === 0) {
                delete tsconfigDirMap[dirPath];
            }
        });
    }
    Object.keys(projects).forEach(function (projectRoot) {
        var isInProject = notification.fullPath.indexOf(projectRoot) === 0;
        if (!isInProject) {
            return;
        }
        var project = projects[projectRoot];
        if (notification.isFile) {
            var processed = project.languageServiceHost._wasFileModified(notification.fullPath);
            if (!processed) {
                if (/\.tsx?$/i.test(notification.fullPath)) {
                    onProjectRefresh(projectRoot);
                    return;
                }
            }
        }
        if (notification.isDirectory) {
            project.languageServiceHost._wasDirectoryModified(notification.fullPath);
        }
    });
}
exports.onFileChange = onFileChange;
