const db = require('../../configs/dbConfig.js');
const Situacao = db.situacao;
 
exports.cadastrar_situacao = (req, res) => {
	Situacao.create({  
		descricao: req.body.descricao
	}).then(situacao => {		
		res.send(situacao);
	});
};
 
exports.obter_todos_situacaos = (req, res) => {
	Situacao.findAll({include: [{all: true, nested: true}]}).then(situacaos => {
	  res.send(situacaos);
	});
};
 
exports.obter_situacao_por_id = (req, res) => {	
	Situacao.findById(req.params.situacaoId, {include: [{all: true, nested: true}]}).then(situacao => {
		res.send(situacao);
	})
};
 
exports.atualizar_situacao = (req, res) => {
	const id = req.params.situacaoId;
	Situacao.update( { 
		descricao: req.body.descricao
	}, 
	{ 
		where: {id: req.params.situacaoId} 
	}).then(() => {
		res.json({ success: true, message: 'A Situação foi alterada.' });
	});
};
 
exports.deletar_situacao = (req, res) => {
	const id = req.params.situacaoId;
	Situacao.destroy({
	  where: { id: id }
	}).then(() => {
	  res.json({ success: true, message: 'A Situação foi deletada.' });
	});
};