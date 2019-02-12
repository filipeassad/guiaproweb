const db = require('../../configs/dbConfig.js');
const Atendimento = db.atendimento;
const HistoricoAtendimento = db.historicoatendimento;
const Perfil = db.perfil;
 
exports.cadastrar_atendimento = (req, res) => {
	var atendimentoB = req.body;

	if(validaAtendimento(atendimentoB)){
		Atendimento.create(new AtendimentoObj(atendimentoB)).then(atendimento => {	
			HistoricoAtendimento.create(new HistoricoAtendimentoObj(atendimento)).then(historicoatendimento => {		
				res.send(JSON.stringify({ success: true, message: 'O atendimento foi cadastrado com sucesso.' }));
			});				
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}	
};

exports.cadastrar_atendimento_cliente = (req, res) => {
	var atendimentoB = req.body;    
    atendimentoB.data = new Date();
	if(validaAtendimento(atendimentoB)){
		Atendimento.create(new AtendimentoClienteObj(atendimentoB)).then(atendimento => {	
			HistoricoAtendimento.create(new HistoricoAtendimentoClienteObj(atendimentoB, atendimento.id)).then(historicoatendimento => {		
				res.send(JSON.stringify({ success: true, message: 'O atendimento foi cadastrado com sucesso.', idAtendimento: atendimento.id }));
			});						
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}	
};

exports.atualizar_atendimento = (req, res) => {
	const atendimentoId = req.params.atendimentoId;
	var atendimentoB = req.body;

	if(validaAtendimento(atendimentoB)){
		Atendimento.update(new AtendimentoObj(atendimentoB), { where:{ id: atendimentoId } }).then(atendimento => {		
			HistoricoAtendimento.create(new HistoricoAtendimentoClienteObj(atendimentoB, atendimento.id)).then(historicoatendimento => {		
				res.send(JSON.stringify({ success: true, message: 'O atendimento foi alterado com sucesso.' }));
			});			
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}
};
 
exports.deletar_atendimento = (req, res) => {
	const id = req.params.atendimentoId;
	Atendimento.destroy({
	  where: { id: id }
	}).then(() => {
		res.json({ success: true, message: 'O atendimento foi deletado com sucesso.' });
	});
};

exports.obter_todos_atendimentos = (req, res) => {
	Atendimento.findAll({include: [{all: true, nested: true}]}).then(atendimentos => {
	  res.send(atendimentos);
	});
};

exports.obter_atendimento_pelo_cliente = (req, res) =>{	

	console.log("Entrou nessa bosta");
    Atendimento.findAll({
			include: [{all: true, nested: true}],
			where: { clienteId: req.params.clienteId },
			order: [ ['data', 'DESC'] ]
        }).then(atendimentos => {
		res.send(atendimentos);
	});
};

exports.obter_atendimento_pelo_profissional = (req, res) =>{	
    Atendimento.findAll({
			include: [{all: true, nested: true}],
			where: { profissionalId: req.params.profissionalId },
			order: [ ['data', 'DESC'] ]
        }).then(atendimentos => {
		res.send(atendimentos);
	});
};
 
exports.obter_atendimento_por_id = (req, res) => {	
	Atendimento.findById(req.params.atendimentoId, {include: [{all: true, nested: true}]}).then(atendimento => {
		res.send(atendimento);
	});
};

exports.obter_atendimentos_by_token = (req, res) => {	
	Atendimento.findAll({ 
        include: [{all: true, nested: true}],
        where: { profissionalId: req.decoded.id }
        }).then(atendimento => {
		res.send(atendimento);
	});
};

function AtendimentoObj(atendimento){
	this.data = atendimento.data;
	this.titulo = atendimento.titulo;
	this.descricao = atendimento.descricao;
	this.clienteId = atendimento.cliente.id;
	this.profissionalId = atendimento.profissional.id;
	this.tipoatendimentoId = atendimento.tipoatendimento.id;
	this.situacaoId = atendimento.situacao.id;
	this.categoriaId = atendimento.categoria.id;
}

function AtendimentoClienteObj(atendimento){
	this.data = atendimento.data;
	this.titulo = atendimento.titulo;
	this.descricao = atendimento.descricao;
	this.clienteId = atendimento.clienteId;
	this.profissionalId = atendimento.profissionalId;
	this.tipoatendimentoId = atendimento.tipoatendimentoId;
	this.situacaoId = atendimento.situacaoId;
	this.categoriaId = atendimento.categoriaId;
}

function HistoricoAtendimentoObj(atendimento){
	this.data = atendimento.data;
	this.titulo = atendimento.titulo;
	this.descricao = atendimento.descricao;
	this.clienteId = atendimento.cliente.id;
	this.profissionalId = atendimento.profissional.id;
	this.tipoatendimentoId = atendimento.tipoatendimento.id;
	this.situacaoId = atendimento.situacao.id;
	this.categoriaId = atendimento.categoria.id;
	this.atendimentoId = atendimento.atendimento.id;
}

function HistoricoAtendimentoClienteObj(atendimento, idAtendimento){
	this.data = atendimento.data;
	this.titulo = atendimento.titulo;
	this.descricao = atendimento.descricao;
	this.clienteId = atendimento.clienteId;
	this.profissionalId = atendimento.profissionalId;
	this.tipoatendimentoId = atendimento.tipoatendimentoId;
	this.situacaoId = atendimento.situacaoId;
	this.categoriaId = atendimento.categoriaId;
	this.atendimentoId = idAtendimento;
}

function validaAtendimento(atendimento){

	if(atendimento == null)
		return false;
	/*if(atendimento.data == null || atendimento.data.trim() == '')
		return false;*/
	if(atendimento.titulo == null || atendimento.titulo.trim() == '')
		return false;		
	if(atendimento.descricao == null || atendimento.descricao.trim() == '')
		return false;
	/*if(atendimento.cliente == null && atendimento.cliente.id == null && atendimento.cliente.id == 0)
		return false;
	if(atendimento.profissional == null && atendimento.profissional.id == null && atendimento.profissional.id == 0)
		return false;
	if(atendimento.tipoatendimento == null && atendimento.tipoatendimento.id == null && atendimento.tipoatendimento.id == 0)
		return false;
	if(atendimento.situacao == null && atendimento.situacao.id == null && atendimento.situacao.id == 0)
		return false;
	if(atendimento.categoria == null && atendimento.categoria.id == null && atendimento.categoria.id == 0)
		return false;*/

	return true;
}