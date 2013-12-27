var http = require('http')
  , url = require('url')
  ;

var srv = http.createServer(function (req, res) {
  var r = url.parse('http://' + req.url);
  res.writeHead(200, {'Content-Type': 'text/plain'});

  if (r.pathname == '/german') {
    res.write('Hallo Welt.');
  } else if (r.pathname == '/english') {
    res.write('Hello World.');
  } else if (r.pathname == '/french') {
    res.write('Bonjour tout le monde.');
  } else {
    res.write('errare humanum est');
  }
  res.end();
});

srv.listen(3000);

