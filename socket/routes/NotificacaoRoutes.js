'use strict';
module.exports = function(app, socketIO) {
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');
    var notificao = require('../controllers/NotificacaoController')(socketIO);

    app.route('/api/notificao-atendimento')
        .post(autenticacao.validaTokenPagina, permissao.permissaoCliente, notificao.enviar_notificacao);
};