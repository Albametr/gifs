var fse = require('fs-extra');
var path = require('path');

exports.saveFile = function (file, folder, callback) {
    var fileName = path.basename(file.path);
    var srcPath = file.path;
    var destPath = path.join(global.appPublic, folder, fileName);

    fse.copy(srcPath, destPath, function (err) {
        if (err) return callback(err);

        callback(null, {
            uri: '/' + folder + '/' + fileName,
            srcPath: srcPath,
            dstPath: destPath,
        });
    });
};