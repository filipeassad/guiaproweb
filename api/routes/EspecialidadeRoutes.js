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

    app.route('/api/mobile/especialidades')
        .post(autenticacao.validaToken, permissao.permissaoProfissional, especialidade.cadastrar_especialidade);

    app.route('/api/mobile/especialidades/:profissionalId')
        .get(autenticacao.validaToken, permissao.permissaoProfissional, especialidade.obter_todos_especialidades_por_profissional);

    app.route('/api/mobile/especialidades/:especialidadeId')
        .delete(autenticacao.validaToken, permissao.permissaoProfissional, especialidade.deletar_especialidade);

    app.route('/api/mobile/especialidades/:profissionalId/:categoriaId')
        .get(autenticacao.validaToken, permissao.permissaoCliente, especialidade.obter_todos_especialidades_por_profissional_categoria);
};