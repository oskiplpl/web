var express = require('express');
var mainController = require('./controllers/mainController');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mainController(app);

app.listen(4000);
