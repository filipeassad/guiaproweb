const db = require('../../configs/dbConfig.js');
const Permissao = db.permissao;
 
exports.cadastrar_permissao = (req, res) => {
	Permissao.create({  		
		descricao: req.body.descricao,
		sigla: req.body.sigla	 
	}).then(permissao => {		
		res.send(permissao);
	});
};
 
exports.obter_todos_permissaos = (req, res) => {
	Permissao.findAll({include: [{all: true, nested: true}]}).then(permissaos => {
	  res.send(permissaos);
	});
};
 
exports.obter_permissao_por_id = (req, res) => {	
	Permissao.findById(req.params.permissaoId, {include: [{all: true, nested: true}]}).then(permissao => {
		res.send(permissao);
	})
};
 
exports.atualizar_permissao = (req, res) => {
	const id = req.params.permissaoId;
	Permissao.update( { 
		descricao: req.body.descricao,
		sigla: req.body.sigla	
	}, 
	{ 
		where: {id: req.params.permissaoId} 
	}).then(() => {
		res.json({ success: true, message: 'A Permissão foi alterada.' });
	});
};
 
exports.deletar_permissao = (req, res) => {
	const id = req.params.permissaoId;
	Permissao.destroy({
	  where: { id: id }
	}).then(() => {
	  res.json({ success: true, message: 'A Permissão foi deletada.' });
	});
};