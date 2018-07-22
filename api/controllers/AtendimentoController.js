const db = require('../../configs/dbConfig.js');
const Atendimento = db.atendimento;
 
exports.cadastrar_atendimento = (req, res) => {
	Atendimento.create({ 
			data: req.body.data,
			titulo: req.body.titulo,
			descricao: req.body.descricao 
	}).then(atendimento => {		
		res.send(atendimento);
	});
};
 
exports.obter_todos_atendimentos = (req, res) => {
	Atendimento.findAll({include: [{all: true, nested: true}]}).then(atendimentos => {
	  res.send(atendimentos);
	});
};
 
exports.obter_atendimento_por_id = (req, res) => {	
	Atendimento.findById(req.params.atendimentoId, {include: [{all: true, nested: true}]}).then(atendimento => {
		res.send(atendimento);
	})
};
 
exports.atualizar_atendimento = (req, res) => {
	const id = req.params.atendimentoId;
	Atendimento.update( { 
		data: req.body.data,
		titulo: req.body.titulo,
		descricao: req.body.descricao 
	}, 
	{ 
		where: {id: req.params.atendimentoId} 
	}).then(() => {
		res.json({ success: true, message: 'O Atendimento foi alterado.' });
	});
};
 
exports.deletar_atendimento = (req, res) => {
	const id = req.params.atendimentoId;
	Atendimento.destroy({
	  where: { id: id }
	}).then(() => {
		res.json({ success: true, message: 'O Atendimento foi deletado.' });
	});
};