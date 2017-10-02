var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.Promise = global.Promise;
//db
mongoose.connect('mongodb://todo:todo@ds137464.mlab.com:37464/tododb');

// example schema
var album = new mongoose.Schema({
    artist: String,
    album: String,
    year: Number,
    songList: [String],
    length: String,
    genre: String,
    img: { data: Buffer, contentType: String }
});

// our model
var Album = mongoose.model('Album', album);

var album = new Album;
// album.artist = "Korn";
// album.album = "Untitled";
// album.year = 2007;
// album.songList = ["Untitled", "Starting Over", "Bitch We Got A Problem", "Evolution", "Hold On", "Kiss"];
// album.length = '48:47';
// album.genre = "Nu metal";
// album.img.data = fs.readFileSync('untitled.jpg');
// album.img.contentType = 'image/jpg';
// album.save(function (err, a) {
//     console.log(err);
//     if(err) throw err;
// });


var urlencodedParser = bodyParser.urlencoded({extended: false});
var img;
module.exports = function(app){

    app.post('/add-album', urlencodedParser, function(req, res){
        //get data from view and add to db
        var img = req.body;
        console.log(img);
    });

    app.get('/add-album', function (req, res) {
        try {
            Album.find({}, function (err, doc) {
                if (err) res.send(err);
                res.render('addAlbum', { albums: doc });
            });
        }
        catch (e) {
            res.send(e);
        } 
    });

    app.get('/albums', function (req, res) {
        try {
            Album.find({}, function (err, doc) {
                if (err) res.send(err);
                res.render('albums', { albums: doc });
            });
        }
        catch (e) {
            res.send(e);
        } 
    });

    app.get('/img', function (req, res, next) {
        try {
            Album.findOne({}, function (err, doc) {
                console.log(doc);
                if (err)
                    res.send(err);
                if (doc) {
                    res.contentType(doc.img.contentType);
                    res.send(doc.img.data);
                }
            });
        }
        catch (e) {
            res.send(e);
        }
        });
        
    app.get('/img/:id', function (req, res) {
        try {
            Album.findOne({ _id: req.params.id }, function (err, doc) {
                if (err)
                    res.send(err);
                    res.setHeader('Cache-Control', 'public, max-age=3000000');
                    res.contentType(doc.img.contentType);
                    res.send(doc.img.data);
                });
            }
        catch (e) {
            res.send(e);
        }
    });

    app.get('/images', function (req, res) {
        try {
            A.find({}, function (err, doc) {
                if (err) res.send(err);
                res.render('images', { images: doc });
            });
        }
        catch (e) {
            res.send(e);
        } 
    });       
};