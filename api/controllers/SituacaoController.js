const db = require('../../configs/dbConfig.js');
const Situacao = db.situacao;
 
exports.cadastrar_situacao = (req, res) => {
	var situacaoB = req.body;

	if(validaSituacao(situacaoB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Situacao.create(new SituacaoObj(situacaoB)).then(situacao => {		
			res.send(JSON.stringify({ success: true, message: 'A situação foi cadastrada com sucesso.' }));
		});
	}	
};

exports.atualizar_situacao = (req, res) => {
	const situacaoId = req.params.situacaoId;
	var situacaoB = req.body;

	if(validaSituacao(situacaoB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Situacao.update( new SituacaoObj(situacaoB), { where: { id: situacaoId } }).then(() => {
			res.send(JSON.stringify({ success: true, message: 'A situação foi alterada com sucesso.' }));
		});
	}
};
 
exports.deletar_situacao = (req, res) => {
	const situacaoId = req.params.situacaoId;
	
	Situacao.destroy({ where: { id: situacaoId } }).then(() => {
	  res.send(JSON.stringify({ success: true, message: 'A situação foi deletada com sucesso.' }));
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

function SituacaoObj(situacao){
	this.descricao = situacao.descricao;
}

function validaSituacao(situacao){
	if(situacao == null)
		return false;
	if(situacao.descricao == null || situacao.descricao.trim() == "")
		return false;
	return true;
}