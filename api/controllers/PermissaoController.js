const db = require('../../configs/dbConfig.js');
const Permissao = db.permissao;
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

exports.cadastrar_permissao = (req, res) => {
	var permissaoB = req.body;
	if(validaPermissao(permissaoB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Permissao.create(new PermissaoObj(permissaoB)).then(permissao => {		
			res.send(JSON.stringify({ success: true, message: 'A permissão foi cadastrada com sucesso.' }));
		});
	}
};

exports.atualizar_permissao = (req, res) => {
	const permissaoId = req.params.permissaoId;
	if(validaPermissao(permissaoB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Permissao.update( new PermissaoObj(permissaoB), { where: { id: permissaoId } }).then(() => {
			res.send(JSON.stringify({ success: true, message: 'A permissão foi alterada com sucesso.' }));
		});
	}
};
 
exports.deletar_permissao = (req, res) => {
	const permissaoId = req.params.permissaoId;
	Permissao.destroy({ where: { id: permissaoId } }).then(() => {
	  res.send(JSON.stringify({ success: true, message: 'A permissão foi deletada com sucesso.' }));
	});
};

exports.obter_todos_permissaos = (req, res) => {
	var usuarioId = req.decoded.id;
	Usuario.findById(usuarioId, { include: [{ all: true, nested: true }] }).then(usuario => {
		var cond = montarCondicao(usuario.perfil.permissoes[0].id);
		Permissao.findAll({
			include: [{all: true, nested: true}],
			where: cond,
		}).then(permissaos => {
			res.send(permissaos);
		});
	});
};
 
exports.obter_permissao_por_id = (req, res) => {	
	Permissao.findById(req.params.permissaoId, {include: [{all: true, nested: true}]}).then(permissao => {
		res.send(permissao);
	})
};

function PermissaoObj(permissao){
	this.descricao = permissao.descricao;
	this.sigla = permissao.sigla;
}

function validaPermissao(permissao){	
	if(permissao == null)
		return false;
	if(permissao.descricao == null || permissao.descricao.trim() == "")
		return false;
	if(permissao.sigla == null || permissao.sigla.trim() == "")
		return false;

	return true;
}

function montarCondicao(permissao){
	condicao = {};
	if(permissao == 1){
		condicao.id = { [Op.or]: [4, 5] };
	}else if(permissao == 2){
		condicao.id = { [Op.or]: [1, 2, 3, 4, 5] }
	}else if(permissao == 3){
		condicao.id = { [Op.or]: [3] }
	}else if(permissao == 4){
		condicao.id = { [Op.or]: [4] }
	}else if(permissao == 5){
		condicao.id = { [Op.or]: [5] }
	}
}