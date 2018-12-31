"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function mapLintResultFailures(failures) {
    return (failures || []).map(function (failure) {
        return {
            type: 'problem_type_warning',
            message: failure.failure + ' [' + failure.ruleName + ']',
            pos: {
                line: failure.startPosition.lineAndCharacter.line,
                ch: failure.startPosition.lineAndCharacter.character
            }
        };
    });
}
exports.mapLintResultFailures = mapLintResultFailures;
function executeTsLint(fullPath, code, TSLint, tsLintConfig, tsLintVersion, program) {
    var versionMajor = parseInt(tsLintVersion, 10);
    if (versionMajor <= 3) {
        try {
            var options = { configuration: tsLintConfig };
            var oldTSLint = TSLint;
            var tsLinter = new oldTSLint(fullPath, code, options, program);
            var result = tsLinter.lint();
            return _.sortBy(mapLintResultFailures(result.failures), function (item) { return item.pos.line; });
        }
        catch (err) {
            return [{
                    type: 'problem_type_error',
                    message: "TSLintError: " + err.toString(),
                    pos: { line: 0, ch: 0 }
                }];
        }
    }
    try {
        var linterOptions = { fix: false };
        var tsLinter = new TSLint.Linter(linterOptions, program);
        tsLinter.lint(fullPath, code, tsLintConfig);
        var result = tsLinter.getResult();
        return _.sortBy(mapLintResultFailures(result.failures), function (item) { return item.pos.line; });
    }
    catch (err) {
        return [{
                type: 'problem_type_error',
                message: "TSLintError: " + err.toString(),
                pos: { line: 0, ch: 0 }
            }];
    }
}
exports.executeTsLint = executeTsLint;
