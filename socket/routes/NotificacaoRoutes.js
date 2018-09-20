'use strict';
module.exports = function(app, socketIO) {
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');
    var notificao = require('../controllers/NotificacaoController')(socketIO);

    app.route('/api/notificao_atendimento/:atendimentoId')
        .post(autenticacao.validaToken, permissao.permissaoCliente, notificao.enviar_notificacao_atendimento);
};