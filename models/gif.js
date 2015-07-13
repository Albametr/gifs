var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

var schema = mongoose.Schema({
    name: String,
    screenshotUri: String,
    screenshotPath: String,
    videoUri: String,
    videoPath: String,
    created: Date
});

module.exports = mongoose.model('Gif', schema);