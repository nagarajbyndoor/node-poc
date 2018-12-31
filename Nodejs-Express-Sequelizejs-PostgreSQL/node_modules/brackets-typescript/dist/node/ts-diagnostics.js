"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("./log");
var ts_utils_1 = require("./ts-utils");
var tslint_utils_1 = require("./tslint-utils");
function createReportFromDiagnostics(ts, diagnostics) {
    return {
        errors: diagnostics.map(function (diagnostic) {
            var line = 0;
            var ch = 0;
            if (diagnostic.file) {
                var lineChar = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                line = lineChar.line;
                ch = lineChar.character;
            }
            return {
                type: 'problem_type_error',
                message: 'TS' + diagnostic.code + ': ' + ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
                pos: { line: line, ch: ch }
            };
        })
    };
}
exports.createReportFromDiagnostics = createReportFromDiagnostics;
function getDiagnostics(projectRoot, filePath, fileContent, callback) {
    try {
        var project = ts_utils_1.getTypeScriptProject(projectRoot, filePath);
        if (project.generalDiagnostics.length > 0) {
            return callback(null, createReportFromDiagnostics(project.ts, project.generalDiagnostics));
        }
        project.languageServiceHost._addFile(filePath, fileContent);
        var program = project.languageService.getProgram();
        var sourceFile = program.getSourceFile(filePath);
        var fileDiagnostics = [].concat(program.getDeclarationDiagnostics(sourceFile), program.getSemanticDiagnostics(sourceFile), program.getSyntacticDiagnostics(sourceFile));
        if (fileDiagnostics.length > 0) {
            return callback(null, createReportFromDiagnostics(project.ts, fileDiagnostics));
        }
        if (project.tsLintConfig) {
            var errors = tslint_utils_1.executeTsLint(filePath, fileContent, project.TsLint, project.tsLintConfig, project.tsLintVersion, program);
            if (errors.length > 0) {
                return callback(null, { errors: errors });
            }
        }
        return callback(null, { errors: [] });
    }
    catch (err) {
        log.error(err.stack);
        return callback(err);
    }
}
exports.getDiagnostics = getDiagnostics;
