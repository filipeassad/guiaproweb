const db = require('../../configs/dbConfig.js');
const Perfil = db.perfil;
 
exports.cadastrar_perfil = (req, res) => {
	Perfil.create({  	
		nome: req.body.nome,	
		sobrenome: req.body.sobrenome,
		datanascimento: req.body.datanascimento,
		cpf: req.body.cpf,
		sexo: req.body.sexo,
		celular: req.body.celular,
		urlimg: req.body.urlimg,
		ativo: req.body.ativo	 
	}).then(perfil => {		
		res.send(perfil);
	});
};
 
exports.obter_todos_perfils = (req, res) => {
	Perfil.findAll({include: [{all: true, nested: true}]}).then(perfils => {
	  res.send(perfils);
	});
};
 
exports.obter_perfil_por_id = (req, res) => {	
	Perfil.findById(req.params.perfilId, {include: [{all: true, nested: true}]}).then(perfil => {
		res.send(perfil);
	})
};
 
exports.atualizar_perfil = (req, res) => {
	const id = req.params.perfilId;
	Perfil.update( { 
		nome: req.body.nome,
		sobrenome: req.body.sobrenome,
		datanascimento: req.body.datanascimento,
		cpf: req.body.cpf,
		sexo: req.body.sexo,
		celular: req.body.celular,
		urlimg: req.body.urlimg,
		ativo: req.body.ativo	 
	}, 
	{ 
		where: {id: req.params.perfilId} 
	}).then(() => {
		res.json({ success: true, message: 'O Perfil foi alterado.' });
	});
};
 
exports.deletar_perfil = (req, res) => {
	const id = req.params.perfilId;
	Perfil.destroy({
	  where: { id: id }
	}).then(() => {
	  res.json({ success: true, message: 'O Perfil foi deletado.' });
	});
};