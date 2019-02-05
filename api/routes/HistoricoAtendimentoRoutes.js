'use strict';
module.exports = function(app) {

    var historicoAtendimento = require('../controllers/HistoricoAtendimentoController');
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/historico_atendimento')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, historicoAtendimento.obter_todos_historicoAtendimentos)
        .post(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, historicoAtendimento.cadastrar_historicoAtendimento);

    app.route('/api/historico_atendimento/:historicoAtendimentoId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, historicoAtendimento.obter_historicoAtendimento_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, historicoAtendimento.atualizar_historicoAtendimento)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, historicoAtendimento.deletar_historicoAtendimento);

    app.route('/api/historico_atendimento_cliente')
        .post(autenticacao.validaToken, permissao.permissaoCliente, historicoAtendimento.cadastrar_historicoAtendimento_cliente);

    app.route('/api/historico_atendimento_profissional')
        .get(autenticacao.validaToken, permissao.permissaoProfissional, historicoAtendimento.obter_historicoAtendimentos_by_token);

    app.route('/api/mobile/historico_atendimento_cliente/:clienteId')
        .get(autenticacao.validaToken, permissao.permissaoCliente, historicoAtendimento.obter_historicoAtendimento_pelo_cliente);

    app.route('/api/mobile/historico_atendimento_profissional/:profissionalId')
        .get(autenticacao.validaToken, permissao.permissaoProfissional, historicoAtendimento.obter_historicoAtendimento_pelo_profissional);
};