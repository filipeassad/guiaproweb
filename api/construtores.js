exports.SituacaoObj = (situacao) =>{
    this.descricao = situacao.descricao;
}

exports.UsuarioObj = (usuario) => {
	this.email = usuario.email;
	this.senha = usuario.senha;
}

exports.EnderecoObjByUsuario = (usuario) => {
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

exports.PerfilObjByUsuario = (usuario) => {
	this.nome = usuario.perfil.nome;
	this.sobrenome = usuario.perfil.sobrenome;
	this.datanascimento = usuario.perfil.datanascimento;
	this.cpf = usuario.perfil.cpf;
	this.sexo = usuario.perfil.sexo;
	this.celular = usuario.perfil.celular;
	this.urlimg = usuario.perfil.urlimg;
	this.ativo = usuario.perfil.ativo;
	this.usuarioId = usuario.id;
	this.tipoperfilId = usuario.perfil.tipoperfilId;
	this.enderecoId = usuario.perfil.endereco.id;
}

exports.PerfilPermissaoObj = (usuario, permissao) => {
	this.perfilId = usuario.perfil.id;
	this.permissaoId = permissao.permissaoId;
}

exports.TipoPerfilObj = (tipoperfil) => {
	this.descricao = tipoperfil.descricao;
	this.sigla = tipoperfil.sigla;
}

exports.PermissaoObj = (permissao) => {
	this.descricao = permissao.descricao;
	this.sigla = permissao.sigla;
}