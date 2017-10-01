var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){ //request, response
    console.log('request ' + req.url);
    res.writeHead(200, {'Content-Type': 'application/json'});
    var myObj = {
        name: 'Ryu',
        job : 'Ninja',
        age: 23
    }
    res.end(JSON.stringify(myObj));
});

server.listen(3000, '127.0.0.1');
