define(function (require, exports, module) {
    var LanguageManager = brackets.getModule('language/LanguageManager');
    function defineLanguage(_a) {
        var id = _a.id, name = _a.name, mode = _a.mode, extension = _a.extension;
        if (!LanguageManager.getLanguageForExtension(extension)) {
            LanguageManager.defineLanguage(id, {
                name: name,
                mode: mode,
                fileExtensions: [extension],
                blockComment: ['/*', '*/'],
                lineComment: ['//']
            });
        }
    }
    module.exports = function () {
        defineLanguage({
            id: 'typescript',
            name: 'TypeScript',
            mode: ['javascript', 'text/typescript'],
            extension: 'ts'
        });
        defineLanguage({
            id: 'tsx',
            name: 'TypeScript-JSX',
            mode: ['jsx', 'text/typescript-jsx'],
            extension: 'tsx'
        });
    };
});
