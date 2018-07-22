'use strict';
module.exports = function(app) {

  var perfil = require('../controllers/PerfilController');

  app.route('/api/perfil')
    .get(perfil.obter_todos_perfils)
    .post(perfil.cadastrar_perfil);

  app.route('/api/perfil/:perfilId')
    .get(perfil.obter_perfil_por_id)
    .put(perfil.atualizar_perfil)
    .delete(perfil.deletar_perfil);
};