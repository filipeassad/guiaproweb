const db = require('./dbConfig.js');
const variaveisCadastro = require('./variaveiscadastro');
const Usuario = db.usuario;
const Perfil = db.perfil;
const Endereco = db.endereco;
const PermissaoPerfil = db.permissaoperfil;
const TipoPerfil = db.tipoperfil;
const Permissao = db.permissao;
const Situacao = db.situacao;

exports.gerarDados = function(){  
    cadastrarTiposPerfil().then(() => {
        cadastrarPermissoes().then(() => {
            cadastrarUsuarios().then(() => {
                cadastrarSituacoes();
            }); 
        });
    });
}

function cadastrarTiposPerfil(){
    return cadastrarTipoPerfil(variaveisCadastro.tipoperfil_cliente).then(() => {
        cadastrarTipoPerfil(variaveisCadastro.tipoperfil_profissional).then(() => {
            cadastrarTipoPerfil(variaveisCadastro.tipoperfil_neutro);
        });
    });
}

function cadastrarPermissoes(){
    return cadastrarPermissao(variaveisCadastro.permissao_administrador).then(() =>{
        cadastrarPermissao(variaveisCadastro.permissao_desenvolvedor).then(() =>{
            cadastrarPermissao(variaveisCadastro.permissao_moderador).then(() =>{
                cadastrarPermissao(variaveisCadastro.permissao_profissional).then(() =>{
                    cadastrarPermissao(variaveisCadastro.permissao_cliente);                
                });
            });
        });
    });
}

function cadastrarUsuarios(){
    return cadastrarUsuario(variaveisCadastro.usuario_administrador).then(() => {
        cadastrarUsuario(variaveisCadastro.usuario_desenvolvedor).then(() => {
            cadastrarUsuario(variaveisCadastro.usuario_moderador);
        });
    });
}

function cadastrarSituacoes(){
    return cadastrarSitiacao(variaveisCadastro.situacao_aguardando).then(() => {
        cadastrarSitiacao(variaveisCadastro.situacao_atendido).then(() => {
            cadastrarSitiacao(variaveisCadastro.situacao_fechado).then(() => {
                cadastrarSitiacao(variaveisCadastro.situacao_finalizado).then(() => {
                    cadastrarSitiacao(variaveisCadastro.situacao_aguardando);
                });    
            });    
        });    
    });    
}

function cadastrarUsuario(usuarioB){
    return Usuario.create(new UsuarioObj(usuarioB)).then(function (usuario) {
        Endereco.create(new EnderecoObjByUsuario(usuarioB)).then(function (endereco) {
            usuarioB.id = usuario.id;
            usuarioB.perfil.endereco.id = endereco.id;
            Perfil.create(new PerfilObjByUsuario(usuarioB)).then(function (perfil) {
                usuarioB.perfil.id = perfil.id;
                db.sequelize.Promise.map(usuarioB.perfil.permissoes, function (permissao) {
                    PermissaoPerfil.create(new PerfilPermissaoObj(usuarioB, permissao));
                });
            });
        });
    });
}

function cadastrarSitiacao(situacaoB){
    return Situacao.create(new SituacaoObj(situacaoB));
}

function cadastrarTipoPerfil(tipoperfilB){
    return TipoPerfil.create(new TipoPerfilObj(tipoperfilB));
}

function cadastrarPermissao(permissaoB){
    return Permissao.create(new PermissaoObj(permissaoB));
}

function SituacaoObj(situacao){
    this.descricao = situacao.descricao;
}

function UsuarioObj(usuario){
	this.email = usuario.email;
	this.senha = usuario.senha;
}

function EnderecoObjByUsuario(usuario){
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

function PerfilObjByUsuario(usuario){
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

function PerfilPermissaoObj(usuario, permissao){
	this.perfilId = usuario.perfil.id;
	this.permissaoId = permissao.permissaoId;
}

function TipoPerfilObj(tipoperfil){
	this.descricao = tipoperfil.descricao;
	this.sigla = tipoperfil.sigla;
}

function PermissaoObj(permissao){
	this.descricao = permissao.descricao;
	this.sigla = permissao.sigla;
}