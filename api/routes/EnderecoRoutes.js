'use strict';
module.exports = function(app) {

  var endereco = require('../controllers/EnderecoController');

  app.route('/api/endereco')
    .get(endereco.obter_todos_enderecos)
    .post(endereco.cadastrar_endereco);

  app.route('/api/endereco/:enderecoId')
    .get(endereco.obter_endereco_por_id)
    .put(endereco.atualizar_endereco)
    .delete(endereco.deletar_endereco);
};