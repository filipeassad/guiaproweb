const db = require('../../configs/dbConfig.js');
const TipoAtendimento = db.tipoatendimento;
 
exports.cadastrar_tipoatendimento = (req, res) => {
	var tipoAtendimentoB = req.body;
	if(validaTipoAtendimento(tipoAtendimentoB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		TipoAtendimento.create(new TipoAtendimentoObj(tipoAtendimentoB)).then(tipoatendimento => {		
			res.send(JSON.stringify({ success: true, message: 'O tipo atendimento foi cadastrado com sucesso.' }));	
		});
	}	
};
 
exports.atualizar_tipoatendimento = (req, res) => {
	const tipoAtendimentoId = req.params.tipoatendimentoId;
	var tipoAtendimentoB = req.body;

	if(validaTipoAtendimento(tipoAtendimentoB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		TipoAtendimento.update( new TipoAtendimentoObj(tipoAtendimentoB), { where: {id: tipoAtendimentoId} }).then(() => {
			res.send(JSON.stringify({ success: true, message: 'O tipo atendimento foi alterado com sucesso.' }));
		});
	}

};
 
exports.deletar_tipoatendimento = (req, res) => {
	const tipoAtendimentoId = req.params.tipoatendimentoId;
	TipoAtendimento.destroy({ where: { id: tipoAtendimentoId } }).then(() => {
	  res.send(JSON.stringify({ success: true, message: 'O tipo atendimento foi deletado com sucesso.' }));
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

function TipoAtendimentoObj(tipoAtendimento){
	this.descricao = tipoAtendimento.descricao;
}

function validaTipoAtendimento(tipoAtendimento){

	if(tipoAtendimento == null)
		return false;
	if(tipoAtendimento.descricao == null || tipoAtendimento.descricao.trim() == "")
		return false;
	return true;

}