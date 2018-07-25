const db = require('../../configs/dbConfig.js');
const Permissao = db.permissao;
 
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
	Permissao.findAll({include: [{all: true, nested: true}]}).then(permissaos => {
	  res.send(permissaos);
	});
};
 
exports.obter_permissao_por_id = (req, res) => {	
	Permissao.findById(req.params.permissaoId, {include: [{all: true, nested: true}]}).then(permissao => {
		res.send(permissao);
	})
};

function PermissaoObj(permissao){
	this.descricao = req.body.descricao;
	this.sigla = req.body.sigla;
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