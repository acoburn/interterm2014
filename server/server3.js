var http = require('http'),
    url = require('url');

var app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  switch(url.parse(req.url).pathname) {
    case '/de':
      res.write('Hallo Welt');
      break;
    case '/fr':
      res.write('Bonjour Monde');
      break;
    default:
      res.write('Hello World');
  }
  res.end();
});

app.listen(3000);

