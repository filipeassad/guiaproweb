'use strict';
module.exports = function(app) {

  var permissao = require('../controllers/PermissaoController');

  app.route('/api/permissao')
    .get(permissao.obter_todos_permissaos)
    .post(permissao.cadastrar_permissao);

  app.route('/api/permissao/:permissaoId')
    .get(permissao.obter_permissao_por_id)
    .put(permissao.atualizar_permissao)
    .delete(permissao.deletar_permissao);
};