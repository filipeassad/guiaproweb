const db = require('../../configs/dbConfig.js');
const Endereco = db.endereco;
 
exports.cadastrar_endereco = (req, res) => {
	Endereco.create({  
		cep: req.body.cep,
		numero: req.body.numero,
		logradouro: req.body.logradouro,
		complemento: req.body.complemento,      
		bairro: req.body.bairro,      
		cidade: req.body.cidade,
		uf: req.body.uf,
		pais: req.body.pais,
		latitude: req.body.latitude,      
		longitude: req.body.longitude
	}).then(endereco => {		
		res.send(endereco);
	});
};
 
exports.obter_todos_enderecos = (req, res) => {
	Endereco.findAll({include: [{all: true, nested: true}]}).then(enderecos => {
	  res.send(enderecos);
	});
};
 
exports.obter_endereco_por_id = (req, res) => {	
	Endereco.findById(req.params.enderecoId, {include: [{all: true, nested: true}]}).then(endereco => {
		res.send(endereco);
	})
};
 
exports.atualizar_endereco = (req, res) => {
	const id = req.params.enderecoId;
	Endereco.update( { 
		cep: req.body.cep,
		numero: req.body.numero,
		logradouro: req.body.logradouro,
		complemento: req.body.complemento,      
		bairro: req.body.bairro,      
		cidade: req.body.cidade,
		uf: req.body.uf,
		pais: req.body.pais,
		latitude: req.body.latitude,      
		longitude: req.body.longitude
	}, 
	{ 
		where: {
			id: req.params.enderecoId
		} 
	}).then(() => {
		res.json({ success: true, message: 'O Endereço foi alterado.' });
	});
};
 
exports.deletar_endereco = (req, res) => {
	const id = req.params.enderecoId;
	Endereco.destroy({
	  where: { id: id }
	}).then(() => {
		res.json({ success: true, message: 'O Endereço foi deletado.' });
	});
};