'use strict';
module.exports = function(app) {

    var usuario = require('../controllers/UsuarioController'); 
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/usuario')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, usuario.obter_todos_usuarios)
        .post(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, usuario.cadastrar_usuario);

    app.route('/api/usuario/:usuarioId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, usuario.obter_usuario_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, usuario.atualizar_usuario)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, usuario.deletar_usuario); 

    app.route('/api/usuario_paginado')
        .post(autenticacao.validaTokenPagina, permissao.permissaoAdministrador,usuario.obter_usuario_paginado);
    
    app.route('/api/mobile/cadastrocliente')
        .post(usuario.cadastrar_usuario_cliente_mobile);

};