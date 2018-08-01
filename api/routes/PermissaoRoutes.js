'use strict';
module.exports = function(app) {

    var permissao = require('../controllers/PermissaoController'); 
    var autenticacao = require('../../configs/autenticacao.js');
    var permissaov = require('../../configs/permissao.js');

    app.route('/api/permissao')
        .get(autenticacao.validaTokenPagina, permissaov.permissaoDesenvolvedor, permissao.obter_todos_permissaos)
        .post(autenticacao.validaTokenPagina, permissaov.permissaoDesenvolvedor, permissao.cadastrar_permissao);

    app.route('/api/permissao/:permissaoId')
        .get(autenticacao.validaTokenPagina, permissaov.permissaoDesenvolvedor, permissao.obter_permissao_por_id)
        .put(autenticacao.validaTokenPagina, permissaov.permissaoDesenvolvedor, permissao.atualizar_permissao)
        .delete(autenticacao.validaTokenPagina, permissaov.permissaoDesenvolvedor, permissao.deletar_permissao);
};