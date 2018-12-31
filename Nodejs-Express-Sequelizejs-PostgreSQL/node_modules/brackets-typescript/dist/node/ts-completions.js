"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var log = require("./log");
var ts_utils_1 = require("./ts-utils");
var fuzzaldrin = require('fuzzaldrin');
function createReportFromCompletionInfo(completionInfo, prefix) {
    var entries = completionInfo ? completionInfo.entries : [];
    if (prefix) {
        entries = fuzzaldrin.filter(entries, prefix, { key: 'name' });
    }
    entries = _.sortBy(entries, function (entry) {
        var sort = entry.sortText;
        if (prefix) {
            if (entry.name.indexOf(prefix) === 0) {
                sort += '0';
            }
            else if (entry.name.toLowerCase().indexOf(prefix.toLowerCase()) === 0) {
                sort += '1';
            }
            else {
                sort += '2';
            }
        }
        return sort + entry.name.toLowerCase();
    });
    var MAX_COMPLETIONS = 50;
    if (entries.length > MAX_COMPLETIONS) {
        entries = entries.slice(0, MAX_COMPLETIONS);
    }
    return {
        hints: entries.map(function (entry) { return entry.name; }),
        match: prefix,
        selectInitial: true,
        handleWideResults: false
    };
}
function getCompletions(projectRoot, filePath, fileContent, position, callback) {
    try {
        var project = ts_utils_1.getTypeScriptProject(projectRoot, filePath);
        project.languageServiceHost._addFile(filePath, fileContent);
        var codeBeforeCursor = fileContent.slice(0, position);
        var match = codeBeforeCursor.match(/[\$_a-zA-Z0-9]+$/);
        var currentWord = match ? match[0] : null;
        var completionInfo = project.languageService.getCompletionsAtPosition(filePath, position);
        return callback(null, createReportFromCompletionInfo(completionInfo, currentWord));
    }
    catch (err) {
        log.error(err.stack);
        return callback(err);
    }
}
exports.getCompletions = getCompletions;
