var fs = require('fs');

// fs.readFile('read.txt', 'utf8', function(err, data){
//     fs.writeFileSync('write.txt', data);
// });


fs.unlink('write.txt'); //kasowanie pliku

console.log('test');