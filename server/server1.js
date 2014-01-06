var http = require('http');

var srv = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello, World.');
  res.end();
});

srv.listen(3000);

