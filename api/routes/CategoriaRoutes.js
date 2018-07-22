'use strict';
module.exports = function(app) {

  var categoria = require('../controllers/CategoriaController');

  app.route('/api/categoria')
    .get(categoria.obter_todos_categorias)
    .post(categoria.cadastrar_categoria);

  app.route('/api/categoria/:categoriaId')
    .get(categoria.obter_categoria_por_id)
    .put(categoria.atualizar_categoria)
    .delete(categoria.deletar_categoria);
};