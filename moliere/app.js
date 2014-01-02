process.env.TZ = 'America/New_York';

/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config/config')
  , app = express();


require('./config/express')(app, config);
require('./config/routes')(app, config);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');});
