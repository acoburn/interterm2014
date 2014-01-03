var express = require('express')
  , path = require('path')
  , moliere = require('./controllers/moliere');

var app = express();

// configure app
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('et Tartuffe?'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler());
  app.locals({
    title: "Belle Marquise..."
  });
});

// define routes for app
app.get('/', moliere.index);
app.get('/phrase/:id', moliere.phrase);
app.post('/phrase', moliere.choose);
app.post('/lang/:id', moliere.lang);

// start server
app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});
