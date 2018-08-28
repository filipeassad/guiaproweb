'use strict';
module.exports = function(app) {

    var autenticacao = require('./autenticacao');

    app.route('/api/login')
        .post(autenticacao.login);

    app.route('/api/valida_token')
        .post(autenticacao.validaToken, autenticacao.sucessoLogin);
};