var multer = require('multer')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//db
mongoose.connect('mongodb://todo:todo@ds137464.mlab.com:37464/tododb');

//schema for db
var img = new mongoose.Schema({
    contentType: String,
    data: Buffer
});

// our model
var Img = mongoose.model('Img', img);

var storage = multer.memoryStorage();

var upload = multer({ storage: storage });

module.exports = function (app) {

    app.post('/api/upload', upload.single('img'), function (req, res, next) {

        var img = new Img();
        img.data = req.file.buffer;
        img.contentType = req.file.mimetype;
        img.save(function (err, a) {
            console.log(err);
            if (err) throw err;
        });
        res.header(200);
        res.end();
    });
}