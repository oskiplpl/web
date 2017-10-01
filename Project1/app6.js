var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){ //request, response
    console.log('request ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var readStream = fs.createReadStream(__dirname + '/index.html');
    readStream.pipe(res);
});

server.listen(3000, '127.0.0.1');
