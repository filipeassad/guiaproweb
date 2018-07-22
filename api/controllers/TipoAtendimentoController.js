const db = require('../../configs/dbConfig.js');
const TipoAtendimento = db.tipoatendimento;
 
exports.cadastrar_tipoatendimento = (req, res) => {
	TipoAtendimento.create({ 
		descricao: req.body.descricao
	}).then(tipoatendimento => {		
		res.send(tipoatendimento);
	});
};
 
exports.obter_todos_tipoatendimentos = (req, res) => {
	TipoAtendimento.findAll({include: [{all: true, nested: true}]}).then(tipoatendimentos => {
	  res.send(tipoatendimentos);
	});
};
 
exports.obter_tipoatendimento_por_id = (req, res) => {	
	TipoAtendimento.findById(req.params.tipoatendimentoId, {include: [{all: true, nested: true}]}).then(tipoatendimento => {
		res.send(tipoatendimento);
	})
};
 
exports.atualizar_tipoatendimento = (req, res) => {
	const id = req.params.tipoatendimentoId;
	TipoAtendimento.update( { 
		descricao: req.body.descricao
	}, 
	{ 
		where: {id: req.params.tipoatendimentoId} 
	}).then(() => {
		res.json({ success: true, message: 'O Tipo Atendimento foi alterado.' });
	});
};
 
exports.deletar_tipoatendimento = (req, res) => {
	const id = req.params.tipoatendimentoId;
	TipoAtendimento.destroy({
	  where: { id: id }
	}).then(() => {
	  res.json({ success: true, message: 'O Tipo Atendimento foi deletado.' });
	});
};