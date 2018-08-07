'use strict';
module.exports = function(app) {

    var perfil = require('../controllers/PerfilController');    
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/perfil')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, perfil.obter_todos_perfils)
        .post(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, perfil.cadastrar_perfil);

    app.route('/api/perfil/:perfilId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, perfil.obter_perfil_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, perfil.atualizar_perfil)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, perfil.deletar_perfil);

     app.route('/api/perfil_logado')
        .get(autenticacao.validaToken, perfil.obter_perfil_pelo_usuario);
    
    app.route('/api/perfil_paginado')
        .post(perfil.obter_perfil_paginado);
};