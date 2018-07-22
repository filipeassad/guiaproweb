'use strict';
module.exports = function(app) {

  var empresa = require('../controllers/EmpresaController');

  app.route('/api/empresa')
    .get(empresa.obter_todos_empresas)
    .post(empresa.cadastrar_empresa);

  app.route('/api/empresa/:empresaId')
    .get(empresa.obter_empresa_por_id)
    .put(empresa.atualizar_empresa)
    .delete(empresa.deletar_empresa);
};