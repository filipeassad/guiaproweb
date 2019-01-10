'use strict';
module.exports = function(app) {

    var empresa = require('../controllers/EmpresaController');
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/empresa')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, empresa.obter_todos_empresas)
        .post(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, empresa.cadastrar_empresa);

    app.route('/api/empresa/:empresaId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, empresa.obter_empresa_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, empresa.atualizar_empresa)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoAdministrador, empresa.deletar_empresa);

    app.route('/api/empresa_paginado')
        .post(autenticacao.validaTokenPagina, permissao.permissaoAdministrador,empresa.obter_empresa_paginado);
};