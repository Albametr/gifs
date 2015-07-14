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

schema.statics.getTop = function (lastDate, top, callback) {
    var Gif = this;

    Gif.find({created: {$gt: lastDate || 0}}).limit(top).exec(function (err, gifs) {
        if (err) return callback(err);

        callback(null, gifs);
    });
}

module.exports = mongoose.model('Gif', schema);