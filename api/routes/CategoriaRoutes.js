'use strict';
module.exports = function(app) {

    var categoria = require('../controllers/CategoriaController');    
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/categoria')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, categoria.obter_todos_categorias)
        .post(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, categoria.cadastrar_categoria);

    app.route('/api/categoria/:categoriaId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, categoria.obter_categoria_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, categoria.atualizar_categoria)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, categoria.deletar_categoria);

    app.route('/api/mobile/categoria')
        .get(autenticacao.validaToken, permissao.permissaoCliente, categoria.obter_todos_categorias);
};