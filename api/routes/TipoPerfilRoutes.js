'use strict';
module.exports = function(app) {

  var tipoperfil = require('../controllers/TipoPerfilController');

  app.route('/api/tipoperfil')
    .get(tipoperfil.obter_todos_tipoperfils)
    .post(tipoperfil.cadastrar_tipoperfil);

  app.route('/api/tipoperfil/:tipoperfilId')
    .get(tipoperfil.obter_tipoperfil_por_id)
    .put(tipoperfil.atualizar_tipoperfil)
    .delete(tipoperfil.deletar_tipoperfil);
};