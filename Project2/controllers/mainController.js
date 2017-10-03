var todoController = require(__dirname + '/todoController');
var albumController = require(__dirname + '/albumController');
var multerController = require(__dirname + '/multerController');


module.exports = function (app) {
    todoController(app);
    albumController(app);
    multerController(app);
};