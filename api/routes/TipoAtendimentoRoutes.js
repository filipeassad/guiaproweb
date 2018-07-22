'use strict';
module.exports = function(app) {

  var tipoatendimento = require('../controllers/TipoAtendimentoController');

  app.route('/api/tipoatendimento')
    .get(tipoatendimento.obter_todos_tipoatendimentos)
    .post(tipoatendimento.cadastrar_tipoatendimento);

  app.route('/api/tipoatendimento/:tipoatendimentoId')
    .get(tipoatendimento.obter_tipoatendimento_por_id)
    .put(tipoatendimento.atualizar_tipoatendimento)
    .delete(tipoatendimento.deletar_tipoatendimento);
};