const db = require('../../configs/dbConfig.js');
const Usuario = db.usuario;
const Perfil = db.perfil;
const Endereco = db.endereco;
const PermissaoPerfil = db.permissaoperfil;
const CategoriaPerfil = db.categoriaperfil;
const EmpresaPerfil = db.empresaperfil;
const Op = db.Sequelize.Op;

exports.cadastrar_usuario = (req, res) => {
	usuarioB = req.body;	
	res.setHeader('Content-Type', 'application/json');

	if (validaUsuario(usuarioB) == false) {
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	} else {
		Usuario.create(new UsuarioObj(usuarioB)).then(function (usuario) {
			Endereco.create(new EnderecoObj(usuarioB)).then(function (endereco) {

				usuarioB.id = usuario.id;
				usuarioB.perfil.endereco.id = endereco.id;

				Perfil.create(new PerfilObj(usuarioB)).then(function (perfil) {					
					usuarioB.perfil.id = perfil.id;
					db.sequelize.Promise.map(usuarioB.perfil.permissoes, function (permissao) {
						PermissaoPerfil.create(new PermissaoObj(usuarioB, permissao));
					}).then(function (npermissoes) {
						db.sequelize.Promise.map(usuarioB.perfil.categorias, function (categoria) {
							CategoriaPerfil.create(new CategoriaObj(usuarioB, categoria));
						}).then(function (categorias) {
							db.sequelize.Promise.map(usuarioB.perfil.empresas, (empresa) => {
								EmpresaPerfil.create(new EmpresaPerfilObj(usuarioB, empresa));
							}).then(() => {
								res.send(JSON.stringify({ success: true, message: 'O usuário foi cadastrado com sucesso.' }));
							});							
						});
					});
				});
			});
		});
	}
};

exports.cadastrar_usuario_cliente_mobile = (req, res) =>{
	usuarioB = req.body;
	res.setHeader('Content-Type', 'application/json');
	console.log('Passou!');

	console.log('Passa!');


	Usuario.findAll({
		include: [{ all: true, nested: true }],
		where: {email: usuarioB.email}
	}).then(usuarios => {		
		if(usuarios.length > 0)
			res.send(JSON.stringify({ success: false, message: 'O usuário já existente.' }));
		else{
			var novo_usuario = {     
				email: usuarioB.email,
				senha: usuarioB.senha,
				perfil: {
					nome: usuarioB.nome,
					sobrenome: usuarioB.sobrenome,					
					datanascimento: usuarioB.datanascimento,
					cpf: usuarioB.cpf,
					sexo: usuarioB.sexo,
					celular: usuarioB.celular,
					celularwhats: usuarioB.celularwhats,
					urlimg: null,
					ativo: "true",
					tipoperfilId: 1,            
					endereco: {
						cep: "",
						numero: "",
						logradouro: "",
						complemento: "",
						bairro: "",
						cidade: "",
						uf: "",
						pais: "",
						latitude: "",
						longitude: ""
					},
					permissoes: [
						{
							id: 5             
						}
					],
					tipoperfil: {
						id: 1
					},
					categorias: [], 
					empresas: []
				}
			};

			Usuario.create(new UsuarioObj(novo_usuario)).then(function (usuario) {
				Endereco.create(new EnderecoObj(novo_usuario)).then(function (endereco) {
	
					novo_usuario.id = usuario.id;
					novo_usuario.perfil.endereco.id = endereco.id;
	
					Perfil.create(new PerfilObj(novo_usuario)).then(function (perfil) {
	
						novo_usuario.perfil.id = perfil.id;
	
						db.sequelize.Promise.map(novo_usuario.perfil.permissoes, function (permissao) {
							PermissaoPerfil.create(new PermissaoObj(novo_usuario, permissao));
						}).then(function (npermissoes) {
							db.sequelize.Promise.map(novo_usuario.perfil.categorias, function (categoria) {
								CategoriaPerfil.create(new CategoriaObj(novo_usuario, categoria));
							}).then(function (categorias) {
								db.sequelize.Promise.map(novo_usuario.perfil.empresas, (empresa) => {
									EmpresaPerfil.create(new EmpresaPerfilObj(novo_usuario, empresa));
								}).then(() => {
									res.send(JSON.stringify({ success: true, message: 'O usuário foi cadastrado com sucesso.' }));
								});							
							});
						});
					});
				});
			});
		}
	});
}

exports.atualizar_usuario = (req, res) => {
	usuarioB = req.body;
	res.setHeader('Content-Type', 'application/json');

	if (validaUsuario(usuarioB) == false) {
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	} else {
		Usuario.update(new UsuarioObj(usuarioB), { where: { id: usuarioB.id } }).then(function (usuario) {
			Endereco.update(new EnderecoObj(usuarioB), { where: { id: usuarioB.perfil.endereco.id } }).then(function (endereco) {
				Perfil.update(new PerfilObj(usuarioB), { where: { id: usuarioB.perfil.id } }).then(function (perfil) {
					PermissaoPerfil.destroy({
						where: { perfilId: usuarioB.perfil.id }
					}).then(() => {
						CategoriaPerfil.destroy({
							where: { perfilId: usuarioB.perfil.id }
						}).then(() => {
							EmpresaPerfil.destroy({
								where: {perfilId: usuarioB.perfil.id }
							}).then(() =>{
								db.sequelize.Promise.map(usuarioB.perfil.permissoes, function (permissao) {
									PermissaoPerfil.create(new PermissaoObj(usuarioB, permissao));
								}).then(function (npermissoes) {
									db.sequelize.Promise.map(usuarioB.perfil.categorias, function (categoria) {
										CategoriaPerfil.create(new CategoriaObj(usuarioB, categoria));
									}).then(function (categorias) {
										db.sequelize.Promise.map(usuarioB.perfil.empresas, (empresa) => {
											EmpresaPerfil.create(new EmpresaPerfilObj(usuarioB, empresa));
										}).then(() => {
											res.send(JSON.stringify({ success: true, message: 'O usuário foi alterado com sucesso.' }));
										});											
									});
								});
							});							
						});
					});
				});
			});
		});
	}
};

exports.deletar_usuario = (req, res) => {
	const usuarioId = req.params.usuarioId;

	Usuario.findById(usuarioId, { include: [{ all: true, nested: true }] }).then(usuario => {
		Endereco.destroy({
			where: { id: usuario.perfil.endereco.id }
		}).then(() => {
			Perfil.destroy({
				where: { id: usuario.perfil.id }
			}).then(() => {
				PermissaoPerfil.destroy({
					where: { perfilId: usuario.perfil.id }
				}).then(() => {
					CategoriaPerfil.destroy({
						where: { perfilId: usuario.perfil.id }
					}).then(() => {
						EmpresaPerfil.destroy({
							where: {perfilId: usuarioB.perfil.id }
						}).then(() =>{
							Usuario.destroy({
								where: { id: id }
							}).then(() => {							
								res.send(JSON.stringify({ success: true, message: 'O usuário foi deletado com sucesso.' }));
							});
						});
					});
				});
			});
		});
	});
};

exports.obter_todos_usuarios = (req, res) => {
	Usuario.findAll({ include: [{ all: true, nested: true }] }).then(usuarios => {
		res.send(usuarios);
	});
};

exports.obter_usuario_por_id = (req, res) => {
	Usuario.findById(req.params.usuarioId, { include: [{ all: true, nested: true }] }).then(usuario => {
		res.send(usuario);
	});
};

exports.obter_usuario_paginado = (req, res) => {
	var usuarioObj = req.body;
	var limit = 15;
	var offset = 0;

	if(usuarioObj == null)
		res.send(JSON.stringify({ success: false, message: 'Sem os parametros necessários.' }));		
	else{
		var condicao = montar_condicao(usuarioObj);		

		Usuario.findAndCountAll({ where: condicao }).then((data) => {
			var page = usuarioObj.pagina;     
			var pages = Math.ceil(data.count / limit);
			offset = limit * (page - 1);
			Usuario.findAll({ 
                    include: [{ all: true, nested: true }],
				 	where: condicao,
					limit: limit,
					offset: offset }).then(usuario => {        
					res.send(JSON.stringify({ success: true, usuarios: usuario, paginas: pages, pagina: req.body.pagina }));	
			});
		});		
	}
}

function montar_condicao (usuario){
	var condicao = {};
	
	if(usuario.email != null && usuario.email.trim() != ''){
		condicao.email = { [Op.like]: usuario.email + '%' };
	}
	
	return condicao;
}

function UsuarioObj(usuario) {
	this.email = usuario.email;
	this.senha = usuario.senha;
}

function EnderecoObj(usuario) {
	this.cep = usuario.perfil.endereco.cep;
	this.numero = usuario.perfil.endereco.numero;
	this.logradouro = usuario.perfil.endereco.logradouro;
	this.complemento = usuario.perfil.endereco.complemento;
	this.bairro = usuario.perfil.endereco.bairro;
	this.cidade = usuario.perfil.endereco.cidade;
	this.uf = usuario.perfil.endereco.uf;
	this.pais = usuario.perfil.endereco.pais;
	this.latitude = usuario.perfil.endereco.latitude;
	this.longitude = usuario.perfil.endereco.longitude;
}

function PerfilObj(usuario) {
	if(usuario.perfil.datanascimento != null && usuario.perfil.datanascimento != '' && usuario.perfil.datanascimento != 'null')
		this.datanascimento = dataPorString(usuario.perfil.datanascimento);	
	this.nome = usuario.perfil.nome;
	this.sobrenome = usuario.perfil.sobrenome;	
	this.cpf = usuario.perfil.cpf;
	this.sexo = usuario.perfil.sexo;
	this.celular = usuario.perfil.celular;	
	this.celularwhats = usuario.perfil.celularwhats;
	this.urlimg = usuario.perfil.urlimg;
	this.ativo = usuario.perfil.ativo;
	this.usuarioId = usuario.id;
	this.tipoperfilId = usuario.perfil.tipoperfil.id;
	this.enderecoId = usuario.perfil.endereco.id;
}

function PermissaoObj(usuario, permissao) {
	this.perfilId = usuario.perfil.id;
	this.permissaoId = permissao.id;
}

function CategoriaObj(usuario, categoria) {
	this.perfilId = usuario.perfil.id;
	this.categoriaId = categoria.id;
}

function EmpresaPerfilObj(usuario, empresa){
	this.perfilId = usuario.perfil.id;
	this.empresaId = empresa.id;
}

function validaUsuario(usuario) {

	if (usuario == null)
		return false;
	if (usuario.email == null || usuario.email.trim() == '')
		return false;
	if (usuario.senha == null || usuario.senha.trim() == '')
		return false;

	if (usuario.perfil == null)
		return false;
	if (usuario.perfil.nome == null || usuario.perfil.nome.trim() == '')
		return false;
	if (usuario.perfil.sobrenome == null || usuario.perfil.sobrenome.trim() == '')
		return false;
	/*if(usuario.perfil.datanascimento == null || usuario.perfil.datanascimento.trim() == '')
		return false;*/
	if (usuario.perfil.cpf == null || usuario.perfil.cpf.trim() == '')
		return false;
	if (usuario.perfil.sexo == null || usuario.perfil.sexo.trim() == '')
		return false;
	if (usuario.perfil.celular == null || usuario.perfil.celular.trim() == '')
		return false;

	if (usuario.perfil.endereco == null)
		return false;
	if (usuario.perfil.endereco.cep == null || usuario.perfil.endereco.cep.trim() == '')
		return false;
	if (usuario.perfil.endereco.numero == null || usuario.perfil.endereco.numero.trim() == '')
		return false;
	if (usuario.perfil.endereco.logradouro == null || usuario.perfil.endereco.logradouro.trim() == '')
		return false;
	if (usuario.perfil.endereco.bairro == null || usuario.perfil.endereco.bairro.trim() == '')
		return false;
	if (usuario.perfil.endereco.cidade == null || usuario.perfil.endereco.cidade.trim() == '')
		return false;
	if (usuario.perfil.endereco.uf == null || usuario.perfil.endereco.uf.trim() == '')
		return false;
	if (usuario.perfil.endereco.pais == null || usuario.perfil.endereco.pais.trim() == '')
		return false;
	if (usuario.perfil.endereco.latitude == null || usuario.perfil.endereco.latitude.trim() == '')
		return false;
	if (usuario.perfil.endereco.longitude == null || usuario.perfil.endereco.longitude.trim() == '')
		return false;

	if (usuario.perfil.tipoperfil == null || usuario.perfil.tipoperfil.id == null || usuario.perfil.tipoperfil.id == 0)
		return false;
	if (usuario.perfil.permissoes == null || usuario.perfil.permissoes.length <= 0)
		return false;
	if (usuario.perfil.tipoperfil.descricao == 'Profissional') {
		if (usuario.perfil.categorias == null || usuario.perfil.categorias.length <= 0)
			return false;
	}

	return true;
}

function dataPorString(dataString){

	if(dataString.length != 10)
		return null;
	else{		
		var dataSplit = dataString.split('/'); 
		var dia = parseInt(dataSplit[0]);
		var mes = parseInt(dataSplit[1]);
		var ano = parseInt(dataSplit[2]);
		
		var dateCriado = new Date(ano, mes - 1, dia);
		
		return dateCriado;
	}

}