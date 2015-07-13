var express = require('express');
var async = require('async');
var router = express.Router();
var Gif = require('../../models/gif');
var gifService = require('../../lib/gif-service');
var fileService = require('../../lib/file-service');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/', function (req, res, next) {
    gifService.getGifs(req.query.last, req.query.top, function (err, gifs) {
        if (err) return next(err);

        res.json(gifs);
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

            gifService.addGif(req.body.name, files.screenshot, files.video, function (err, gif) {
                if (err) return next(err);

                res.status(201).json(gif);
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
