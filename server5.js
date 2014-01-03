var express = require('express');

var app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(app.router);

app.get('/english', function (req, res, next) {
  res.send('Hello World.');
});

app.get('/german', function (req, res, next) {
  res.send('Hallo Welt.');
});

app.get('/', function (req, res, next) {
  res.send('Hello World.');
});

app.use(function (req, res, next) {
  next({msg: 'mea culpa'});
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.send('errare humanum est');
});

app.listen(3000);
