var data = require('../models/moliere.js');

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Belle Marquise...' });
};


/*
 *  GET a particular phrase.
 */
exports.phrase = function(req, res, next) {
  var id = parseInt(req.params.id)
    , lang = req.session.lang || 'fr'
    ;
  if (id > 0 && id <= data[lang].length) {
    res.json({text: data[lang][id - 1], lang: lang});
  } else {
    next();
  }
};


/*
 * POST a language setting
 */
exports.lang = function(req, res, next) {
  req.session.lang = req.params.id == 'en' ? 'en' : 'fr';
  res.json({ok: true});
};


/*
 * POST a request for a new phrase
 */
exports.choose = function(req, res, next) {
  // Make sure we don't reuse the last message
  var last = parseInt(req.body.last, 10);
  if (isNaN(last)) last = 1;
  var next = (last + Math.floor(Math.random() * (data[req.session.lang || 'fr'].length - 1))) % 5 + 1;
  res.json({id: next});
};
