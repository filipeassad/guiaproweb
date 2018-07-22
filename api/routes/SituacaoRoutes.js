'use strict';
module.exports = function(app) {

  var situacao = require('../controllers/SituacaoController');

  app.route('/api/situacao')
    .get(situacao.obter_todos_situacaos)
    .post(situacao.cadastrar_situacao);

  app.route('/api/situacao/:situacaoId')
    .get(situacao.obter_situacao_por_id)
    .put(situacao.atualizar_situacao)
    .delete(situacao.deletar_situacao);
};