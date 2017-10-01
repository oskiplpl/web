var todoController = require(__dirname + '/todoController');
var albumController = require(__dirname + '/albumController');

module.exports = function(app){
    todoController(app);
    albumController(app);
};