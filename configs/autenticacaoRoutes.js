'use strict';
module.exports = function(app) {

  var autenticacao = require('./autenticacao');

  app.route('/api/login')
    .post(autenticacao.login);
};