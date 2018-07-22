const db = require('../../configs/dbConfig.js');
const TipoPerfil = db.tipoperfil;
 
exports.cadastrar_tipoperfil = (req, res) => {
	TipoPerfil.create({  
	  descricao: req.body.descricao,
		sigla: req.body.sigla 
	}).then(tipoperfil => {		
		res.send(tipoperfil);
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
 
exports.atualizar_tipoperfil = (req, res) => {
	const id = req.params.tipoperfilId;
	TipoPerfil.update( { 
		descricao: req.body.descricao,
		sigla: req.body.sigla 
	}, 
	{ 
		where: { id: req.params.tipoperfilId } 
	}).then(() => {
		res.json({ success: true, message: 'O Tipo Perfil foi alterado.' });
	});
};
 
exports.deletar_tipoperfil = (req, res) => {
	const id = req.params.tipoperfilId;
	TipoPerfil.destroy({
	  where: { id: id }
	}).then(() => {
	  res.json({ success: true, message: 'O Tipo Perfil foi deletado.' });
	});
};