var fs = require('fs');

fs.readFile('data/file1.txt', function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});

console.log('---> HERE <---');
