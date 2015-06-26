var express = require('express');
var router = express.Router();
var Gif = require('../../lib/gif');

router.get('/', function (req, res, next) {
    Gif.find(function (err, gifs) {
        if (err) return next(err);
        res.json(gifs);
    });
});

router.get('/:gif_id', function (req, res, next) {
    Gif.findById(req.params.gif_id, function (err, gif) {
        if (err) return next(err);
        if (!gif) 
            return res.status(404).send({ message: 'Resource not found' });
        res.json(gif);
    });
});

router.post('/', function (req, res, next) {
    Gif.create({
        url: req.body.url,
        name: req.body.name
    }, function (err, gif) {
        if (err) return next(err);
        res.status(201).json(gif);
    });
});

router.put('/:gif_id', function (req, res, next) {
    Gif.findOneAndUpdate(
        { _id: req.params.gif_id }, 
        { url: req.body.url, name: req.body.name },
        { new: true },
        function (err, gif) {
            if (err) return next(err);
            res.json(gif);
        }
    );
});

router.delete('/:gif_id', function (req, res, next) {
    Gif.findOneAndRemove({ _id: req.params.gif_id }, function (err) {
        if (err) return next(err);
        res.status(200).end();
    });
});

module.exports = router;
