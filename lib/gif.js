var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

var schema = mongoose.Schema({
    url: String,
    name: String
});

module.exports = mongoose.model('Gif', schema);
