'use strict';
module.exports = function(app) {

    var especialidade = require('../controllers/EspecialidadeController');     
    var autenticacao = require('../../configs/autenticacao.js');
    var permissao = require('../../configs/permissao.js');

    app.route('/api/especialidade')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, especialidade.obter_todos_especialidades)
        .post(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, especialidade.cadastrar_especialidade);

    app.route('/api/especialidade/:especialidadeId')
        .get(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, especialidade.obter_especialidade_por_id)
        .put(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, especialidade.atualizar_especialidade)
        .delete(autenticacao.validaTokenPagina, permissao.permissaoDesenvolvedor, especialidade.deletar_especialidade);
};