const db = require('../../configs/dbConfig.js');
const Endereco = db.endereco;
 
exports.cadastrar_endereco = (req, res) => {
	var enderecoB = req.body;

	if(validaEndereco(enderecoB) == false){		
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Endereco.create( new EnderecoObj(enderecoB)).then(endereco => {		
			res.send(JSON.stringify({ success: true, message: 'O endereço foi cadastrado com sucesso.' }));
		});
	}
};

exports.atualizar_endereco = (req, res) => {
	const enderecoId = req.params.enderecoId;
	var enderecoB = req.body;

	if(validaEndereco(enderecoB) == false){		
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Endereco.update( new EnderecoObj(enderecoB), { where: { id: enderecoId } }).then(() => {
			res.send(JSON.stringify({ success: true, message: 'O endereço foi alterado com sucesso.' }));
		});
	}	
};
 
exports.deletar_endereco = (req, res) => {
	const enderecoId = req.params.enderecoId;
	Endereco.destroy({ where: { id: enderecoId } }).then(() => {
		res.send(JSON.stringify({ success: true, message: 'O endereço foi deletado com sucesso.' }));
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

function EnderecoObj(endereco){
	this.cep = endereco.cep;
	this.numero = endereco.numero;
	this.logradouro = endereco.logradouro;
	this.complemento = endereco.complemento;      
	this.bairro = endereco.bairro;      
	this.cidade = endereco.cidade;
	this.uf = endereco.uf;
	this.pais = endereco.pais;
	this.latitude = endereco.latitude;      
	this.longitude = endereco.longitude;
}

function validaEmpresa(endereco){

	if(endereco == null)
		return false;
	if(endereco.cep == null || endereco.cep.trim() == '')
		return false;
	if(endereco.numero == null || endereco.numero.trim() == '')
		return false;
	if(endereco.logradouro == null || endereco.logradouro.trim() == '')
		return false;
	if(endereco.bairro == null || endereco.bairro.trim() == '')
		return false;
	if(endereco.cidade == null || endereco.cidade.trim() == '')
		return false;
	if(endereco.uf == null || endereco.uf.trim() == '')
		return false;
	if(endereco.pais == null || endereco.pais.trim() == '')
		return false;
	if(endereco.latitude == null || endereco.latitude.trim() == '')
		return false;
	if(endereco.longitude == null || endereco.longitude.trim() == '')
		return false;

}