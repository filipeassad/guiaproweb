'use strict';
module.exports = function(app) {

  var atendimento = require('../controllers/AtendimentoController');

  app.route('/api/atendimento')
    .get(atendimento.obter_todos_atendimentos)
    .post(atendimento.cadastrar_atendimento);

  app.route('/api/atendimento/:atendimentoId')
    .get(atendimento.obter_atendimento_por_id)
    .put(atendimento.atualizar_atendimento)
    .delete(atendimento.deletar_atendimento);
};