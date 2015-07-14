var express = require('express');
var async = require('async');
var router = express.Router();
var Gif = require('../../models/gif');
var fileService = require('../../lib/file-service');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/', function (req, res, next) {
    Gif.getTop(req.query.last, req.query.top, function (err, gifs) {
        if (err) return next(err);

        var gifDtos = gifs.map(function (item) {
            return gifMapper(item);
        });

        res.json(gifDtos);
    });
});

router.get('/:gif_id', function (req, res, next) {
    Gif.findById(req.params.gif_id, function (err, gif) {
        if (err) return next(err);
        if (!gif)
            return res.status(404).send({message: 'Resource not found'});

        res.json(gif);
    });
});

router.post('/', multipartMiddleware, function (req, res, next) {
    async.parallel({
            screenshot: function (callback) {
                fileService.saveFile(req.files.screenshot, 'img', callback);
            },
            video: function (callback) {
                fileService.saveFile(req.files.video, 'video', callback);
            }
        },
        function (err, files) {
            if (err) return next(err);

            var gif = createGif(req.body.name, files.screenshot, files.video);

            gif.save(function (err, data) {
                if (err) return next(err);

                var gifDto = gifMapper(data);
                res.status(201).json(gifDto);
            });
        });
});

router.put('/:gif_id', function (req, res, next) {
    Gif.findOneAndUpdate(
        {_id: req.params.gif_id},
        {url: req.body.url, name: req.body.name},
        {new: true},
        function (err, gif) {
            if (err) return next(err);
            res.json(gif);
        }
    );
});

router.delete('/:gif_id', function (req, res, next) {
    Gif.findOneAndRemove({_id: req.params.gif_id}, function (err) {
        if (err) return next(err);
        res.status(200).end();
    });
});

module.exports = router;


function createGif(name, screenshot, video) {
    return new Gif({
        name: name,
        screenshotUri: screenshot.uri,
        screenshotPath: screenshot.dstPath,
        videoUri: video.uri,
        videoPath: video.dstPath,
        created: new Date()
    });
}

function gifMapper(gif) {
    return {
        id: gif._id,
        name: gif.name,
        videoUri: gif.videoUri,
        screenshotUri: gif.screenshotUri,
        created: gif.created
    };
}