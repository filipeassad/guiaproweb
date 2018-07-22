const db = require('../../configs/dbConfig.js');
const Empresa = db.empresa;
 
exports.cadastrar_empresa = (req, res) => {
	Empresa.create({  
			nome: req.body.nome,
			cnpj: req.body.cnpj,	
			email: req.body.email,
			telefone: req.body.telefone,
			urlimg: req.body.urlimg
	}).then(empresa => {		
		res.send(empresa);
	});
};
 
exports.obter_todos_empresas = (req, res) => {
	Empresa.findAll({include: [{all: true, nested: true}]}).then(empresas => {
	  res.send(empresas);
	});
};
 
exports.obter_empresa_por_id = (req, res) => {	
	Empresa.findById(req.params.empresaId, {include: [{all: true, nested: true}]}).then(empresa => {
		res.send(empresa);
	})
};
 
exports.atualizar_empresa = (req, res) => {
	const id = req.params.empresaId;
	Empresa.update( { 
		nome: req.body.nome,
		cnpj: req.body.cnpj,	
		email: req.body.email,
		telefone: req.body.telefone,
		urlimg: req.body.urlimg
	}, 
	{ 
		where: {
			id: req.params.empresaId
		} 
	}).then(() => {
		res.json({ success: true, message: 'A Empresa foi alterada.' });
	});
};
 
exports.deletar_empresa = (req, res) => {
	const id = req.params.empresaId;
	Empresa.destroy({
	  where: { id: id }
	}).then(() => {
	  res.json({ success: true, message: 'A Empresa foi deletada.' });
	});
};