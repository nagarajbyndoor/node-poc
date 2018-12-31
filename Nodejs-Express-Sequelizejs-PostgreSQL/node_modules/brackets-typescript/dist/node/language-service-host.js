"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _log = require("./log");
var ts_path_utils_1 = require("./ts-path-utils");
var crypto = require("crypto");
var fs = require("fs");
var path = require("path");
var TypeScriptLanguageServiceHost = (function () {
    function TypeScriptLanguageServiceHost(ts, tsPath, projectDirectory, compilationSettings, fileNames) {
        var _this = this;
        this.ts = ts;
        this.tsPath = tsPath;
        this.projectDirectory = projectDirectory;
        this.compilationSettings = compilationSettings;
        this.files = {};
        this.directories = {};
        fileNames.forEach(function (fileName) {
            _this.getScriptSnapshot(fileName);
        });
    }
    TypeScriptLanguageServiceHost.prototype._addFile = function (fileName, text) {
        if (typeof text !== 'string' || text.length === 0) {
            return this._readFile(fileName);
        }
        var snapshot = this.ts.ScriptSnapshot.fromString(text);
        var version = this._getFileHash(text);
        this.files[fileName] = { version: version, snapshot: snapshot };
        return this.files[fileName];
    };
    TypeScriptLanguageServiceHost.prototype._clearFile = function (fileName) {
        delete this.files[fileName];
    };
    TypeScriptLanguageServiceHost.prototype._readFile = function (fileName) {
        try {
            var text = fs.readFileSync(fileName, 'utf8');
            return text.length > 0 ? this._addFile(fileName, text) : this._clearFile(fileName);
        }
        catch (e) {
            return this._clearFile(fileName);
        }
    };
    TypeScriptLanguageServiceHost.prototype._clearDirectory = function (directoryName) {
        delete this.directories[directoryName];
    };
    TypeScriptLanguageServiceHost.prototype._getFileHash = function (text) {
        var hash = crypto.createHash('md5');
        hash.update(text);
        return hash.digest('hex');
    };
    TypeScriptLanguageServiceHost.prototype._wasFileModified = function (fileName) {
        var hasFile = !!this.files[fileName];
        if (hasFile) {
            this._readFile(fileName);
        }
        return hasFile;
    };
    TypeScriptLanguageServiceHost.prototype._wasDirectoryModified = function (directoryName) {
        var _this = this;
        Object.keys(this.files).forEach(function (_fileName) {
            if (_fileName.indexOf(directoryName) === 0) {
                _this._readFile(_fileName);
            }
        });
        Object.keys(this.directories).forEach(function (_directoryName) {
            if (_directoryName.indexOf(directoryName) === 0) {
                _this._clearDirectory(_directoryName);
            }
        });
    };
    TypeScriptLanguageServiceHost.prototype._updateCompilationSettings = function (options) {
        this.compilationSettings = options;
    };
    TypeScriptLanguageServiceHost.prototype.getCompilationSettings = function () {
        return this.compilationSettings;
    };
    TypeScriptLanguageServiceHost.prototype.getNewLine = function () {
        return '\n';
    };
    TypeScriptLanguageServiceHost.prototype.getScriptFileNames = function () {
        return Object.keys(this.files).filter(function (file) { return /\.tsx?$/.test(file); });
    };
    TypeScriptLanguageServiceHost.prototype.getScriptKind = function (fileName) {
        var ext = fileName.substr(fileName.lastIndexOf('.'));
        switch (ext.toLowerCase()) {
            case '.js':
                return this.ts.ScriptKind.JS;
            case '.jsx':
                return this.ts.ScriptKind.JSX;
            case '.ts':
                return this.ts.ScriptKind.TS;
            case '.tsx':
                return this.ts.ScriptKind.TSX;
            default:
                return this.ts.ScriptKind.Unknown;
        }
    };
    TypeScriptLanguageServiceHost.prototype.getScriptVersion = function (fileName) {
        if (this.files[fileName]) {
            return this.files[fileName].version;
        }
        var scriptInfo = this._readFile(fileName);
        return scriptInfo ? scriptInfo.version : '';
    };
    TypeScriptLanguageServiceHost.prototype.getScriptSnapshot = function (fileName) {
        if (this.files[fileName]) {
            return this.files[fileName].snapshot;
        }
        var scriptInfo = this._readFile(fileName);
        return scriptInfo ? scriptInfo.snapshot : undefined;
    };
    TypeScriptLanguageServiceHost.prototype.getCurrentDirectory = function () {
        return this.projectDirectory;
    };
    TypeScriptLanguageServiceHost.prototype.getDefaultLibFileName = function (options) {
        var typescriptPath = ts_path_utils_1.normalizePath(path.dirname(this.tsPath));
        return ts_path_utils_1.combinePaths(typescriptPath, this.ts.getDefaultLibFileName(options));
    };
    TypeScriptLanguageServiceHost.prototype.trace = function (s) {
        _log.info('TypeScriptLanguageServiceHost', 'trace', s);
    };
    TypeScriptLanguageServiceHost.prototype.error = function (s) {
        _log.warn('TypeScriptLanguageServiceHost', 'error', s);
    };
    TypeScriptLanguageServiceHost.prototype.useCaseSensitiveFileNames = function () {
        return true;
    };
    TypeScriptLanguageServiceHost.prototype.directoryExists = function (directoryName) {
        if (this.directories[directoryName]) {
            return true;
        }
        var exists;
        try {
            exists = fs.statSync(directoryName).isDirectory();
        }
        catch (e) {
            exists = false;
        }
        if (exists) {
            this.directories[directoryName] = this.getDirectories(directoryName);
        }
        return exists;
    };
    TypeScriptLanguageServiceHost.prototype.getDirectories = function (directoryName) {
        var _this = this;
        if (this.directories[directoryName]) {
            return this.directories[directoryName];
        }
        return fs.readdirSync(directoryName).reduce(function (result, p) {
            if (_this.directoryExists(ts_path_utils_1.combinePaths(directoryName, p))) {
                result.push(p);
            }
            return result;
        }, []);
    };
    TypeScriptLanguageServiceHost.prototype.readFile = function (filePath, encoding) {
        return fs.readFileSync(filePath, encoding);
    };
    TypeScriptLanguageServiceHost.prototype.fileExists = function (filePath) {
        return fs.existsSync(filePath);
    };
    return TypeScriptLanguageServiceHost;
}());
exports.TypeScriptLanguageServiceHost = TypeScriptLanguageServiceHost;
