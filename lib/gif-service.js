var Gif = require('../models/gif');

exports.getGifs = function (lastDate, top, callback) {
    Gif.find({created: {$gt: lastDate || 0}}).limit(top).exec(function (err, gifs) {
        if (err) return callback(err);

        var gifDtos = gifs.map(function (item) {
            return gifMapper(item);
        });

        callback(null, gifDtos);
    });
};

exports.addGif = function (name, screenshot, video, callback) {
    var gif = new Gif({
        name: name,
        screenshotUri: screenshot.uri,
        screenshotPath: screenshot.dstPath,
        videoUri: video.uri,
        videoPath: video.dstPath,
        created: new Date()
    });

    gif.save(function (err, data) {
        if (err) return callback(err);

        var gifDto = gifMapper(data);
        callback(null, gifDto);
    });
};

function gifMapper(gif) {
    return {
        id: gif._id,
        name: gif.name,
        videoUri: gif.videoUri,
        screenshotUri: gif.screenshotUri,
        created: gif.created
    };
}


