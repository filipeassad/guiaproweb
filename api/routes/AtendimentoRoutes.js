'use strict';
module.exports = function(app) {

    var atendimento = require('../controllers/AtendimentoController');
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');
    app.route('/api/atendimento')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, atendimento.obter_todos_atendimentos)
        .post(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, atendimento.cadastrar_atendimento);

    app.route('/api/atendimento/:atendimentoId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, atendimento.obter_atendimento_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, atendimento.atualizar_atendimento)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, atendimento.deletar_atendimento);

    app.route('/api/atendimento_cliente')
        .post(autenticacao.validaToken, permissao.permissaoCliente, atendimento.cadastrar_atendimento);

    app.route('/api/atendimento_profissional')
        .get(autenticacao.validaToken, permissao.permissaoProfissional, atendimento.obter_atendimentos_by_token);
};