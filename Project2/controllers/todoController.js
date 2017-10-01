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

// our model
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
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