var express = require('express');

var app = express();

app.get('/english', function (req, res) {
  res.send('Hello World.');
});

app.get('/german', function (req, res) {
  res.send('Hallo Welt.');
});

app.get('*', function (req, res) {
  res.send('errare humanum est');
});

app.listen(3000);
