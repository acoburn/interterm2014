var fs = require('fs'),
    async = require('async');

// Map set of filenames to file contents
async.map(
    // The set of filenames
    ['data/file1.txt', 'data/file2.txt', 'data/file3.txt', 'data/file4.txt', 'data/file5.txt'],
    // The function to apply to each item
    fs.readFile,
    // A callback after all iterator functions have completed
    function (err, results) {
      if (err) throw err;
      console.log(
        results.map(function (x) { return x.toString(); })
      );
    }
);
