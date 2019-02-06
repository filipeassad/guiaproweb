const db = require('../../configs/dbConfig.js');
const HistoricoAtendimento = db.historicoatendimento;
const Perfil = db.perfil;

exports.cadastrar_historicoatendimento = (req, res) => {
	var historicoatendimentoB = req.body;

	if(validaHistoricoAtendimento(historicoatendimentoB)){
		HistoricoAtendimento.create(new HistoricoAtendimentoObj(historicoatendimentoB)).then(historicoatendimento => {		
			res.send(JSON.stringify({ success: true, message: 'O histórico do atendimento foi cadastrado com sucesso.' }));
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}	
};

exports.cadastrar_historicoatendimento_cliente = (req, res) => {
	var historicoatendimentoB = req.body;    
    historicoatendimentoB.data = new Date();
	if(validaHistoricoAtendimento(historicoatendimentoB)){
		HistoricoAtendimento.create(new HistoricoAtendimentoClienteObj(historicoatendimentoB)).then(historicoatendimento => {		
			res.send(JSON.stringify({ success: true, message: 'O histórico do atendimento foi cadastrado com sucesso.', idHistoricoAtendimento: historicoatendimento.id }));
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}	
};

exports.atualizar_historicoatendimento = (req, res) => {
	const historicoatendimentoId = req.params.historicoatendimentoId;
	var historicoatendimentoB = req.body;

	if(validaAtendimento(historicoatendimentoB)){
		HistoricoAtendimento.update(new HistoricoAtendimentoObj(historicoatendimentoB), { where:{ id: historicoatendimentoId } }).then(historicoatendimento => {		
			res.send(JSON.stringify({ success: true, message: 'O histórico do atendimento foi alterado com sucesso.' }));
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}
};

exports.deletar_historicoatendimento = (req, res) => {
	const id = req.params.historicoatendimentoId;
	HistoricoAtendimento.destroy({
	  where: { id: id }
	}).then(() => {
		res.json({ success: true, message: 'O histórico do atendimento foi deletado com sucesso.' });
	});
};

exports.obter_todos_historicoatendimento = (req, res) => {
	HistoricoAtendimento.findAll({include: [{all: true, nested: true}]}).then(historicoatendimentos => {
	  res.send(historicoatendimentos);
	});
};

exports.obter_historicoatendimento_pelo_cliente = (req, res) =>{	
    HistoricoAtendimento.findAll({
			include: [{all: true, nested: true}],
			where: { clienteId: req.params.clienteId },
			order: [ ['data', 'DESC'] ]
        }).then(historicoatendimentos => {
		res.send(historicoatendimentos);
	});
};

exports.obter_historicoatendimento_pelo_profissional = (req, res) =>{	
    HistoricoAtendimento.findAll({
			include: [{all: true, nested: true}],
			where: { profissionalId: req.params.profissionalId },
			order: [ ['data', 'DESC'] ]
        }).then(atendimentos => {
		res.send(atendimentos);
	});
};

exports.obter_historicoatendimento_por_id = (req, res) => {	
	HistoricoAtendimento.findById(req.params.historicoatendimentoId, {include: [{all: true, nested: true}]}).then(historicoatendimento => {
		res.send(historicoatendimento);
	});
};

exports.obter_historicoatendimentos_by_token = (req, res) => {	
	HistoricoAtendimento.findAll({ 
        include: [{all: true, nested: true}],
        where: { profissionalId: req.decoded.id }
        }).then(historicoatendimento => {
		res.send(historicoatendimento);
	});
};

function HistoricoAtendimentoObj(historicoatendimento){
	this.data = historicoatendimento.data;
	this.titulo = historicoatendimento.titulo;
	this.descricao = historicoatendimento.descricao;
	this.clienteId = historicoatendimento.cliente.id;
	this.profissionalId = historicoatendimento.profissional.id;
	this.tipoatendimentoId = historicoatendimento.tipoatendimento.id;
	this.situacaoId = historicoatendimento.situacao.id;
	this.categoriaId = historicoatendimento.categoria.id;
	this.atendimentoId = historicoatendimento.atendimento.id;
}

function HistoricoAtendimentoClienteObj(historicoatendimento){
	this.data = historicoatendimento.data;
	this.titulo = historicoatendimento.titulo;
	this.descricao = historicoatendimento.descricao;
	this.clienteId = historicoatendimento.clienteId;
	this.profissionalId = historicoatendimento.profissionalId;
	this.tipoatendimentoId = historicoatendimento.tipoatendimentoId;
	this.situacaoId = historicoatendimento.situacaoId;
	this.categoriaId = historicoatendimento.categoriaId;	
	this.atendimentoId = historicoatendimento.atendimentoId;
}

function validaHistoricoAtendimento(historicoatendimento){
	if(historicoatendimento == null)
		return false;
	if(historicoatendimento.titulo == null || historicoatendimento.titulo.trim() == '')
		return false;		
	if(historicoatendimento.descricao == null || historicoatendimento.descricao.trim() == '')
		return false;

	return true;
}