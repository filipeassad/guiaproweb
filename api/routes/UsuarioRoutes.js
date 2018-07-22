'use strict';
module.exports = function(app) {

  var usuario = require('../controllers/UsuarioController');

  app.route('/api/usuario')
    .get(usuario.obter_todos_usuarios)
    .post(usuario.cadastrar_usuario);

  app.route('/api/usuario/:usuarioId')
    .get(usuario.obter_usuario_por_id)
    .put(usuario.atualizar_usuario)
    .delete(usuario.deletar_usuario);
};