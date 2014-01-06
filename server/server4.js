var express = require('express');

var app = express();


app.get('/de', function (req, res) {
  res.send('Hallo Welt.');
});

app.get('/fr', function (req, res) {
  res.send('Bonjour Monde.');
});

app.use(function (req, res) {
  res.send('Hello World.');
});

app.listen(3000);
