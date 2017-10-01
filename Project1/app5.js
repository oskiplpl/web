var http = require('http');
var fs = require('fs');

var readStream = fs.createReadStream(__dirname + '/lorem.txt');
var writeStream = fs.createWriteStream(__dirname + '/writeLorem.txt');

// readStream.on('data', function(chunk){
//     console.log('new chunk');
//     writeStream.write(chunk);
// });

//szybszy sposób

readStream.pipe(writeStream);