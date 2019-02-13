const db = require('../../configs/dbConfig.js');
const TipoPerfil = db.tipoperfil;
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
 
exports.cadastrar_tipoperfil = (req, res) => {
	var tipoperfilB = req.body;

	if(validaTipoPerfil(tipoperfilB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}else{
		TipoPerfil.create(new TipoPerfilObj(tipoperfilB)).then(tipoperfil => {		
			res.send(JSON.stringify({ success: true, message: 'O tipo perfil foi cadastrado com sucesso.' }));	
		});
	}
};

exports.atualizar_tipoperfil = (req, res) => {
	const tipoperfilId = req.params.tipoperfilId;
	var tipoperfilB = req.body;

	if(validaTipoPerfil(tipoperfilB) == false){
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}else{
		TipoPerfil.update( new TipoPerfilObj(tipoperfilB), { where: { id: tipoperfilId } }).then(() => {
			res.send(JSON.stringify({ success: true, message: 'O tipo perfil foi alterado com sucesso.' }));
		});
	}	
};
 
exports.deletar_tipoperfil = (req, res) => {
	const tipoperfilId = req.params.tipoperfilId;
	TipoPerfil.destroy( { where: { id: tipoperfilId } }).then(() => {
	  res.send(JSON.stringify({ success: true, message: 'O tipo perfil foi deletado com sucesso.' }));
	});
};

exports.obter_todos_tipoperfils = (req, res) => {
	var usuarioId = req.decoded.id;
	Usuario.findById(usuarioId, { include: [{ all: true, nested: true }] }).then(usuario => {
		var cond = montarCondicao(usuario.perfil.permissoes[0].permissaoId);
		TipoPerfil.findAll({
			include: [{all: true, nested: true}],
			where: cond,
		}).then(tipoperfils => {
			res.send(tipoperfils);
		});
	});
	
};
 
exports.obter_tipoperfil_por_id = (req, res) => {		
	TipoPerfil.findById(req.params.tipoperfilId, {include: [{all: true, nested: true}]}).then(tipoperfil => {
		res.send(tipoperfil);
	});
};

function TipoPerfilObj(tipoperfil){
	this.descricao = tipoperfil.descricao;
	this.sigla = tipoperfil.sigla;
}

function montarCondicao(permissao){
	condicao = {};
	if(permissao == 1){
		condicao.id = { [Op.or]: [1,2] };
	}else if(permissao == 2){
		condicao.id = { [Op.or]: [1, 2, 3] }
	}else if(permissao == 3){
		condicao.id = { [Op.or]: [1,2] }
	}else if(permissao == 4){
		condicao.id = { [Op.or]: [2] }
	}else if(permissao == 5){
		condicao.id = { [Op.or]: [1] }
	}
	return condicao;
}

function validaTipoPerfil(tipoperfil){
	if(tipoperfil == null)
		return false;
	if(tipoperfil.descricao == null || tipoperfil.descricao.trim() == "")
		return false;
	if(tipoperfil.sigla == null || tipoperfil.sigla.trim() == "")
		return false;
	return true;
}