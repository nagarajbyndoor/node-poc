"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ts_path_utils_1 = require("./ts-path-utils");
function tryLoad(pPath) {
    var result;
    try {
        result = {
            package: require(pPath),
            packagePath: require.resolve(pPath)
        };
    }
    catch (err) {
        result = null;
    }
    return result;
}
function getProjectPackage(projectRoot, packageName) {
    while (true) {
        var pathToLoad = ts_path_utils_1.normalizePath(path.join(projectRoot, 'node_modules', packageName));
        var result = tryLoad(pathToLoad);
        if (result != null) {
            return result;
        }
        var parent_1 = path.dirname(projectRoot);
        if (projectRoot === parent_1) {
            break;
        }
        projectRoot = parent_1;
    }
    return {
        package: require(packageName),
        packagePath: require.resolve(packageName)
    };
}
exports.getProjectPackage = getProjectPackage;
