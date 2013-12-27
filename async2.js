var fs = require('fs');

// Iterate over filenames, open each and send content to the console
['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'].forEach(function (file) {
  fs.readFile('data/' + file, function (err, data) {
    if (err) throw err;
    console.log(data.toString());
  });
});
