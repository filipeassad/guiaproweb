const db = require('../../configs/dbConfig.js');
const Especialidade = db.especialidade;
 
exports.cadastrar_especialidade = (req, res) => {
	var especialidadeB = req.body;

	if(validaEspecialidade(especialidadeB) == false){		
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Especialidade.create( new EspecialidadeObj(especialidadeB)).then(especialidade => {		
			res.send(JSON.stringify({ success: true, message: 'O especialidade foi cadastrado com sucesso.' }));
		});
	}
};

exports.atualizar_especialidade = (req, res) => {
	const especialidadeId = req.params.especialidadeId;
	var especialidadeB = req.body;

	if(validaEspecialidade(especialidadeB) == false){		
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Especialidade.update( new EspecialidadeObj(especialidadeB), { where: { id: especialidadeId } }).then(() => {
			res.send(JSON.stringify({ success: true, message: 'O especialidade foi alterado com sucesso.' }));
		});
	}	
};
 
exports.deletar_especialidade = (req, res) => {
	const especialidadeId = req.params.especialidadeId;
	Especialidade.destroy({ where: { id: especialidadeId } }).then(() => {
		res.send(JSON.stringify({ success: true, message: 'O especialidade foi deletado com sucesso.' }));
	});
};
 
exports.obter_todos_especialidades = (req, res) => {
	Especialidade.findAll({include: [{all: true, nested: true}]}).then(especialidades => {
	  res.send(especialidades);
	});
};
 
exports.obter_especialidade_por_id = (req, res) => {	
	Especialidade.findById(req.params.especialidadeId, {include: [{all: true, nested: true}]}).then(especialidade => {
		res.send(especialidade);
	})
};

exports.obter_todos_especialidades_por_profissional = (req, res) => {
    var profissionalID = req.params.profissionalId;
	Especialidade.findAll({
        where: { profissionalId: profissionalID},
        include: [{all: true, nested: true}]
        }).then(especialidades => {
	  res.send(especialidades);
	});
};

exports.obter_todos_especialidades_por_profissional_categoria = (req, res) => {
    var profissionalID = req.params.profissionalId;
    var categoriaID = req.params.categoriaId;
	Especialidade.findAll({
        where: { profissionalId: profissionalID, categoriaId: categoriaID},
        include: [{all: true, nested: true}]
        }).then(especialidades => {
	  res.send(especialidades);
	});
};

function EspecialidadeObj(especialidade){
	this.descricao = especialidade.descricao;
	this.profissionalId = especialidade.profissionalId;
	this.categoriaId = especialidade.categoriaId;
}

function validaEspecialidade(especialidade){

	if(especialidade == null)
		return false;
	if(especialidade.descricao == null || especialidade.descricao.trim() == '')
		return false;
	if(especialidade.profissionalId == null)
		return false;
	if(especialidade.categoriaId == null)
		return false;

}