'use strict';
module.exports = function(app) {

    var endereco = require('../controllers/EnderecoController');     
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/endereco')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, endereco.obter_todos_enderecos)
        .post(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, endereco.cadastrar_endereco);

    app.route('/api/endereco/:enderecoId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, endereco.obter_endereco_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, endereco.atualizar_endereco)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, endereco.deletar_endereco);

    app.route('/api/mobile/endereco/:enderecoId')
        .put(autenticacao.validaTokenPagina, permissao.permissaoCliente, endereco.atualizar_endereco);
};