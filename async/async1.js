var fs = require('fs');

fs.readFile('data/file1.txt', function (err, data) {
  console.log('Second');
});

console.log('First');
