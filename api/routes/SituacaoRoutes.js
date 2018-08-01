'use strict';
module.exports = function(app) {

    var situacao = require('../controllers/SituacaoController');    
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/situacao')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, situacao.obter_todos_situacaos)
        .post(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, situacao.cadastrar_situacao);

    app.route('/api/situacao/:situacaoId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, situacao.obter_situacao_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, situacao.atualizar_situacao)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, situacao.deletar_situacao);
};