var express = require('express')
  , path = require('path')
  ;

module.exports = function (app, config) {
  // all environments
  app.configure(function () {
    app.set('port', process.env.PORT || config.port);
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('et Tartuffe?'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.locals({
      title: config.site
    });
  });

  // development only
  app.configure('development', function () {
    app.use(express.errorHandler());
  });
};
