'use strict';
module.exports = function(app) {

    var tipoatendimento = require('../controllers/TipoAtendimentoController');  
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/tipoatendimento')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoatendimento.obter_todos_tipoatendimentos)
        .post(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoatendimento.cadastrar_tipoatendimento);

    app.route('/api/tipoatendimento/:tipoatendimentoId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoatendimento.obter_tipoatendimento_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoatendimento.atualizar_tipoatendimento)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoatendimento.deletar_tipoatendimento);
};