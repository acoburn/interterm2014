var https = require('https'),
    async = require('async');

var urls = [
      "https://www.amherst.edu",
      "https://www.google.com",
      "https://lms.ats.amherst.edu/login.php",
      "https://foursquare.com",
      "https://acdc.amherst.edu",
      "https://aws.amazon.com"];

var fetch = function (url, next) {
  var start = new Date().getTime();
  https.get(url, function (res) {
    res.on('data', function () {});
    res.on('end', function () {
      var err = res.statusCode < 400 
                  ? null
                  : {statusCode: res.statusCode, url: x};
      var data = {
            time: (new Date().getTime() - start) / 1000,
            url: url};
      next(err, data);
    });
  });
}

var start1 = new Date().getTime();
async.map(urls, fetch, function (err, results) {
  console.log('Parallel: ' + (new Date().getTime() - start1) / 1000);
  console.log(results);
});

var start2 = new Date().getTime();
async.mapSeries(urls, fetch, function (err, results) {
  console.log('Series: ' + (new Date().getTime() - start2) / 1000);
  console.log(results);
});
