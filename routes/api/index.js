var express = require('express');
var router = express.Router();
var gifs = require('./gifs');

router.use('/gifs', gifs);

module.exports = router;
