var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {title: 'Gifs feed'});
});

router.use(function (req, res) {
    res.status(404).format({
        html: function () {
            res.render('404', {title: '404 Not Found'});
        },
        json: function () {
            res.send({message: 'Resource not found'});
        },
        xml: function () {
            res.write('<error>\n');
            res.write('    <message>Resource not found</message>\n');
            res.end('</error>\n');
        },
        text: function () {
            res.send('Resource not found\n');
        }
    });
});

router.use(function (err, req, res, next) {
    console.error(err.stack);
    var msg;

    switch (err.type) {
        case 'database':
            msg = 'Server Unavailable';
            res.statusCode = 503;
            break;
        default:
            msg = 'Internal Server Error';
            res.statusCode = 500;
    }

    res.format({
        html: function () {
            res.render('5xx', {title: msg, msg: msg, status: res.statusCode});
        },
        json: function () {
            res.send({error: msg});
        },
        text: function () {
            res.send(msg + '\n');
        }
    });
});

module.exports = router;
