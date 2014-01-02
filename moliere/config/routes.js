var moliere = require('../controllers/moliere');

module.exports = function (app, config) {
  app.get('/', moliere.index);
  app.get('/phrase/:id', moliere.phrase);
  app.post('/phrase', moliere.choose);
  app.post('/lang/:id', moliere.lang);
};
