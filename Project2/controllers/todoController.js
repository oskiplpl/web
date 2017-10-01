var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.Promise = global.Promise;
//db
mongoose.connect('mongodb://todo:todo@ds137464.mlab.com:37464/tododb');

//schema for db
var todoSchema = new mongoose.Schema({
    item: String
});

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
var Todo = mongoose.model('Todo', todoSchema);
var Album = mongoose.model('Album', album);

var album = new Album;
album.artist = "Korn";
album.album = "Untitled";
album.year = 2007;
album.songList = ["Untitled", "Starting Over", "Bitch We Got A Problem", "Evolution", "Hold On", "Kiss"];
album.length = '48:47';
album.genre = "Nu metal";
album.img.data = fs.readFileSync('untitled.jpg');
album.img.contentType = 'image/jpg';
album.save(function (err, a) {
    console.log(err);
    if(err) throw err;
});


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

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

    app.get('/todo', function(req, res){
        //get data from db 
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add to db
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete item from db
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
            
};