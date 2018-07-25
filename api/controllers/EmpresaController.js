const db = require('../../configs/dbConfig.js');
const Empresa = db.empresa;
const Endereco = db.endereco;

exports.cadastrar_empresa = (req, res) => {

	var empresaB = req.body;

	if(validaEmpresa(empresaB) == false){		
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Endereco.create(new EnderecoObj(empresaB)).then(function (endereco){
			empresaB.endereco.id = endereco.id;
			Empresa.create(new EmpresaObj(empresaB)).then(empresa => {		
				res.send(JSON.stringify({ success: true, message: 'A empresa foi cadastrada com sucesso.' }));
			});
		});
	}

};

exports.atualizar_empresa = (req, res) => {

	const empresaId = req.params.empresaId;
	var empresaB = req.body;

	if(validaEmpresa(empresaB) == false){		
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));	
	}else{
		Endereco.update(new EnderecoObj(empresaB), { where: { id: empresaB.endereco.id } }).then(() => {
			Empresa.update( new EmpresaObj(empresaB), { where: { id: empresaId } }).then(() => {
				res.send(JSON.stringify({ success: true, message: 'A empresa foi alterada com sucesso.' }));
			});
		});
	}

};

exports.deletar_empresa = (req, res) => {

	const empresaId = req.params.empresaId;

	Empresa.findById( empresaId, {include: [{all: true, nested: true}]}).then( empresa => {
		Endereco.destroy({ where: {id: empresa.endereco.id}}).then( () => {
			Empresa.destroy( { where: { id: empresaId } }).then(() => {
				res.send(JSON.stringify({ success: true, message: 'A empresa foi deletada com sucesso.' }));
			});
		});
	});

};
 
exports.obter_todos_empresas = (req, res) => {
	Empresa.findAll({include: [{all: true, nested: true}]}).then(empresas => {
	  res.send(empresas);
	});
};
 
exports.obter_empresa_por_id = (req, res) => {	
	Empresa.findById(req.params.empresaId, {include: [{all: true, nested: true}]}).then(empresa => {
		res.send(empresa);
	})
};

function EmpresaObj(empresa){
	this.nome = empresa.nome;
	this.cnpj = empresa.cnpj;	
	this.email = empresa.email;
	this.telefone = empresa.telefone;
	this.urlimg = empresa.urlimg;	
	this.enderecoId = empresa.endereco.id;
}

function EnderecoObj(empresa){
	this.cep = 	empresa.endereco.cep;
	this.numero = 	empresa.endereco.numero;
	this.logradouro = empresa.endereco.logradouro;
	this.complemento = empresa.endereco.complemento;      
	this.bairro = empresa.endereco.bairro;      
	this.cidade = empresa.endereco.cidade;
	this.uf = empresa.endereco.uf;
	this.pais = empresa.endereco.pais;
	this.latitude = empresa.endereco.latitude;      
	this.longitude = empresa.endereco.longitude;
}

function EmpresaPerfil(empresa, perfil){
	this.empresaId = empresa.id;
	this.perfilId = perfil.id;
}

function validaEmpresa(empresa){

	if(empresa == null)
		return false;
	if(empresa.nome == null || empresa.nome.trim() == '')
		return false;		
	if(empresa.cnpj == null || empresa.cnpj.trim() == '')
		return false;
	if(empresa.email == null || empresa.email.trim() == '')
		return false;
	if(empresa.telefone == null || empresa.telefone.trim() == '')
		return false;

	if(empresa.endereco == null)
		return false;
	if(empresa.endereco.cep == null || empresa.endereco.cep.trim() == '')
		return false;
	if(empresa.endereco.numero == null || empresa.endereco.numero.trim() == '')
		return false;
	if(empresa.endereco.logradouro == null || empresa.endereco.logradouro.trim() == '')
		return false;
	if(empresa.endereco.bairro == null || empresa.endereco.bairro.trim() == '')
		return false;
	if(empresa.endereco.cidade == null || empresa.endereco.cidade.trim() == '')
		return false;
	if(empresa.endereco.uf == null || empresa.endereco.uf.trim() == '')
		return false;
	if(empresa.endereco.pais == null || empresa.endereco.pais.trim() == '')
		return false;
	if(empresa.endereco.latitude == null || empresa.endereco.latitude.trim() == '')
		return false;
	if(empresa.endereco.longitude == null || empresa.endereco.longitude.trim() == '')
		return false;

}