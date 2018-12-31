define(function (require, exports, module) {
    'use strict';
    var FileSystem = brackets.getModule('filesystem/FileSystem');
    var ProjectManager = brackets.getModule('project/ProjectManager');
    var nodeDomain = require('./node-domain');
    function handleFileSystemChange(evt, file) {
        if (file == null) {
            return;
        }
        var notification = {
            type: evt.type,
            fullPath: file.fullPath,
            isFile: file.isFile,
            isDirectory: file.isDirectory
        };
        nodeDomain.exec('fileChange', notification);
    }
    function handleProjectOpen(evt, projectRoot) {
        nodeDomain.exec('projectRefresh', projectRoot.fullPath);
    }
    function handleProjectClose(evt, projectRoot) {
        nodeDomain.exec('projectClose', projectRoot.fullPath);
    }
    module.exports = function () {
        FileSystem.on('change', handleFileSystemChange);
        ProjectManager.on('projectOpen', handleProjectOpen);
        ProjectManager.on('projectRefresh', handleProjectOpen);
        ProjectManager.on('projectClose', handleProjectClose);
    };
});
