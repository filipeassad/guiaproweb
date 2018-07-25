const db = require('../../configs/dbConfig.js');
const TipoPerfil = db.tipoperfil;
 
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
	TipoPerfil.findAll({include: [{all: true, nested: true}]}).then(tipoperfils => {
	  res.send(tipoperfils);
	});
};
 
exports.obter_tipoperfil_por_id = (req, res) => {	
	TipoPerfil.findById(req.params.tipoperfilId, {include: [{all: true, nested: true}]}).then(tipoperfil => {
		res.send(tipoperfil);
	})
};

function TipoPerfilObj(tipoperfil){
	this.descricao = tipoperfil.descricao;
	this.sigla = tipoperfil.sigla;
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