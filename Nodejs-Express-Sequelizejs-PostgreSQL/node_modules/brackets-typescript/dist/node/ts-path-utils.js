"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directorySeparator = '/';
function normalizeSlashes(path) {
    return path.replace(/\\/g, '/');
}
exports.normalizeSlashes = normalizeSlashes;
function getRootLength(path) {
    if (path.charCodeAt(0) === 47) {
        if (path.charCodeAt(1) !== 47) {
            return 1;
        }
        var p1 = path.indexOf('/', 2);
        if (p1 < 0) {
            return 2;
        }
        var p2 = path.indexOf('/', p1 + 1);
        if (p2 < 0) {
            return p1 + 1;
        }
        return p2 + 1;
    }
    if (path.charCodeAt(1) === 58) {
        if (path.charCodeAt(2) === 47) {
            return 3;
        }
        return 2;
    }
    if (path.lastIndexOf('file:///', 0) === 0) {
        return 'file:///'.length;
    }
    var idx = path.indexOf('://');
    if (idx !== -1) {
        return idx + '://'.length;
    }
    return 0;
}
exports.getRootLength = getRootLength;
function lastOrUndefined(array) {
    if (array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}
exports.lastOrUndefined = lastOrUndefined;
function getNormalizedParts(normalizedSlashedPath, rootLength) {
    var parts = normalizedSlashedPath.substr(rootLength).split(exports.directorySeparator);
    var normalized = [];
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (part !== '.') {
            if (part === '..' && normalized.length > 0 && lastOrUndefined(normalized) !== '..') {
                normalized.pop();
            }
            else {
                if (part) {
                    normalized.push(part);
                }
            }
        }
    }
    return normalized;
}
function normalizePath(path) {
    path = normalizeSlashes(path);
    var rootLength = getRootLength(path);
    var normalized = getNormalizedParts(path, rootLength);
    return path.substr(0, rootLength) + normalized.join(exports.directorySeparator);
}
exports.normalizePath = normalizePath;
function combinePaths(path1, path2) {
    if (!(path1 && path1.length)) {
        return path2;
    }
    if (!(path2 && path2.length)) {
        return path1;
    }
    if (getRootLength(path2) !== 0) {
        return path2;
    }
    if (path1.charAt(path1.length - 1) === exports.directorySeparator) {
        return path1 + path2;
    }
    return path1 + exports.directorySeparator + path2;
}
exports.combinePaths = combinePaths;
