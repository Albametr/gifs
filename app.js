var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

var routes = require('./routes');
var api = require('./routes/api');

var app = express();
global.appPublic=path.join(__dirname, 'public');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(global.appPublic));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', api);
app.use('/', routes);

module.exports = app;
