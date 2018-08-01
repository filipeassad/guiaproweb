'use strict';
module.exports = function(app) {

    var tipoperfil = require('../controllers/TipoPerfilController');  
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/tipoperfil')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoperfil.obter_todos_tipoperfils)
        .post(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoperfil.cadastrar_tipoperfil);

    app.route('/api/tipoperfil/:tipoperfilId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoperfil.obter_tipoperfil_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoperfil.atualizar_tipoperfil)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, tipoperfil.deletar_tipoperfil);
};