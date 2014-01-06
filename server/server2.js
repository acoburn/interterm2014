var http = require('http');

var app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  switch(req.headers['accept-language']) {
    case 'de':
      res.write('Hallo Welt');
      break;
    case 'fr':
      res.write('Bonjour Monde');
      break;
    default:
      res.write('Hello World');
  }
  res.end();
});

app.listen(3000);

