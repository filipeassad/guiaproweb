const db = require('../../configs/dbConfig.js');
const Perfil = db.perfil;
const Endereco = db.endereco;
const PermissaoPerfil = db.permissaoperfil;
const CategoriaPerfil = db.categoriaperfil;
const TipoPerfil = db.tipoperfil;

const Op = db.Sequelize.Op;

exports.cadastrar_perfil = (req, res) => {
	perfilB = req.body;

	res.setHeader('Content-Type', 'application/json');
	
	if (validaPerfil(perfilB) == false) {
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	} else {
		Endereco.create(new EnderecoObj(perfilB)).then(function (endereco) {
			perfilB.endereco.id = endereco.id;
			Perfil.create(new PerfilObj(perfilB)).then(function (perfil) {
				perfil.id = perfil.id;
				db.sequelize.Promise.map(perfilB.permissoes, function (permissao) {
					PermissaoPerfil.create(new PermissaoObj(perfilB, permissao));
				}).then(function (npermissoes) {
					db.sequelize.Promise.map(perfilB.categorias, function (categoria) {
						CategoriaPerfil.create(new CategoriaObj(perfilB, categoria));
					}).then(function (categorias) {
						res.send(JSON.stringify({ success: true, message: 'O perfil foi cadastrado com sucesso.' }));
					});
				});
			});
		});
	}
};

exports.atualizar_perfil = (req, res) => {
	const perfilId = req.params.perfilId;
	var perfilB = req.body;

	if (validaPerfil(perfilB) == false) {
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	} else {
		Endereco.update(new EnderecoObj(perfilB), { where: { id: perfilB.endereco.id } }).then(function (endereco) {
			Perfil.update(new PerfilObj(perfilB), { where: { id: perfilId } }).then(function (perfil) {
				PermissaoPerfil.destroy({
					where: { perfilId: perfilId }
				}).then(() => {
					CategoriaPerfil.destroy({
						where: { perfilId: perfilId }
					}).then(() => {
						db.sequelize.Promise.map(perfilB.permissoes, function (permissao) {
							PermissaoPerfil.create(new PermissaoObj(perfilB, permissao));
						}).then(function (npermissoes) {
							db.sequelize.Promise.map(perfilB.categorias, function (categoria) {
								CategoriaPerfil.create(new CategoriaObj(perfilB, categoria));
							}).then(function (categorias) {
								res.send(JSON.stringify({ success: true, message: 'O perfil foi alterado com sucesso.' }));
							});
						});
					});
				});
			});
		});
	}	
};

exports.deletar_perfil = (req, res) => {
	const perfilId = req.params.perfilId;
	Perfil.findById(perfilId, { include: [{ all: true, nested: true }] }).then(perfil => {
		Endereco.destroy({
			where: { id: perfil.endereco.id }
		}).then(() => {
			Perfil.destroy({
				where: { id: perfil.id }
			}).then(() => {
				PermissaoPerfil.destroy({
					where: { perfilId: perfil.id }
				}).then(() => {
					CategoriaPerfil.destroy({
						where: { perfilId: perfil.id }
					}).then(() => {
						res.send(JSON.stringify({ success: true, message: 'O perfil foi deletado com sucesso.' }));						
					});
				});
			});
		});
	});
};

exports.obter_todos_perfils = (req, res) => {
	Perfil.findAll({ include: [{ all: true, nested: true }] }).then(perfils => {
		res.send(perfils);
	});
};

exports.obter_perfil_por_id = (req, res) => {
	Perfil.findById(req.params.perfilId, { include: [{ all: true, nested: true }] }).then(perfil => {
		res.send(perfil);
	})
};

exports.obter_perfil_pelo_usuario = (req, res) =>{
    Perfil.findAll({ include: [{ all: true, nested: true }]},
                    { where: { usuarioId: req.decoded.id}}).then(perfil => {        
		res.send(new PerfilEnviar(perfil[0]));
	});
}

exports.obter_perfil_paginado = (req, res) =>{

	var perfilObj = req.body;
	var limit = 5;
	var offset = 0;

	if(perfilObj == null)
		res.send(JSON.stringify({ success: false, message: 'Sem os parametros necessários.' }));		
	else{
		var condicao = montar_condicao(perfilObj);		

		Perfil.findAndCountAll({ where: condicao }).then((data) => {
			var page = req.body.pagina;     
			var pages = Math.ceil(data.count / limit);
			offset = limit * (page - 1);
			Perfil.findAll({ 
                    include: [{ all: true, nested: true }],
				 	where: condicao,
					limit: limit,
					offset: offset }).then(perfil => {        
					res.send(JSON.stringify({ success: true, perfils: perfil, paginas: pages, pagina: req.body.pagina }));	
			});
		});
		
	}	
}

function montar_condicao (perfil){

	var condicao = {};
	
	if(perfil.nome != null && perfil.nome.trim() != ''){
		condicao.nome = { [Op.like]: perfil.nome + '%' };
	}

	if(perfil.sobrenome != null && perfil.sobrenome.trim() != ''){
		condicao.sobrenome = { [Op.like]: perfil.sobrenome + '%' };
	}

	if(perfil.cpf != null && perfil.cpf.trim() != ''){
		condicao.cpf = { [Op.like]: perfil.cpf + '%' };
	}

	if(perfil.celular != null && perfil.celular.trim() != ''){
		condicao.celular = { [Op.like]: perfil.celular + '%' };
	}

    if(perfil.tipoperfil != null && perfil.tipoperfil != 0){
        condicao.tipoperfilId = perfil.tipoperfil;
    }
	
	return condicao;

}

function PerfilObj(perfil) {
	this.nome = perfil.nome;
	this.sobrenome = perfil.sobrenome;
	this.datanascimento = perfil.datanascimento;
	this.cpf = perfil.cpf;
	this.sexo = perfil.sexo;
	this.celular = perfil.celular;
	this.urlimg = perfil.urlimg;
	this.ativo = perfil.ativo;
	this.usuarioId = id;
	this.tipoperfilId = perfil.tipoperfil.id;
	this.enderecoId = perfil.endereco.id;
}

function EnderecoObj(perfil) {
	this.cep = perfil.endereco.cep;
	this.numero = perfil.endereco.numero;
	this.logradouro = perfil.endereco.logradouro;
	this.complemento = perfil.endereco.complemento;
	this.bairro = perfil.endereco.bairro;
	this.cidade = perfil.endereco.cidade;
	this.uf = perfil.endereco.uf;
	this.pais = perfil.endereco.pais;
	this.latitude = perfil.endereco.latitude;
	this.longitude = perfil.endereco.longitude;
}

function PermissaoObj(perfil, permissao) {
	this.perfilId = perfil.id;
	this.permissaoId = permissao.id;
}

function CategoriaObj(perfil, categoria) {
	this.perfilId = perfil.id;
	this.categoriaId = categoria.id;
}

function PerfilEnviar(perfil){
    this.nome = perfil.nome;
    this.nome_completo = perfil.nome + " " + perfil.sobrenome; 
    this.tipoperfil = perfil.tipoperfil;
    this.permissoesPerfil = perfil.permissoes;
}

function validaPerfil(perfil) {

	if (perfil == null)
		return false;
	if (perfil.nome == null || perfil.nome.trim() == '')
		return false;
	if (perfil.sobrenome == null || perfil.sobrenome.trim() == '')
		return false;
	/*if(perfil.datanascimento == null || perfil.datanascimento.trim() == '')
		return false;*/
	if (perfil.cpf == null || perfil.cpf.trim() == '')
		return false;
	if (perfil.sexo == null || perfil.sexo.trim() == '')
		return false;
	if (perfil.celular == null || perfil.celular.trim() == '')
		return false;

	if (perfil.endereco == null)
		return false;
	if (perfil.endereco.cep == null || perfil.endereco.cep.trim() == '')
		return false;
	if (perfil.endereco.numero == null || perfil.endereco.numero.trim() == '')
		return false;
	if (perfil.endereco.logradouro == null || perfil.endereco.logradouro.trim() == '')
		return false;
	if (perfil.endereco.bairro == null || perfil.endereco.bairro.trim() == '')
		return false;
	if (perfil.endereco.cidade == null || perfil.endereco.cidade.trim() == '')
		return false;
	if (perfil.endereco.uf == null || perfil.endereco.uf.trim() == '')
		return false;
	if (perfil.endereco.pais == null || perfil.endereco.pais.trim() == '')
		return false;
	if (perfil.endereco.latitude == null || perfil.endereco.latitude.trim() == '')
		return false;
	if (perfil.endereco.longitude == null || perfil.endereco.longitude.trim() == '')
		return false;

	if (perfil.tipoperfil == null || perfil.tipoperfil.id == null || perfil.tipoperfil.id == 0)
		return false;
	if (perfil.permissoes == null || perfil.permissoes.length <= 0)
		return false;
	if (perfil.tipoperfil.descricao == 'Profissional') {
		if (perfil.categorias == null || perfil.categorias.length <= 0)
			return false;
	}

	return true;
}