const db = require('./dbConfig.js');
const Usuario = db.usuario;
const Perfil = db.perfil;
const Endereco = db.endereco;
const PermissaoPerfil = db.permissaoperfil;
const CategoriaPerfil = db.categoriaperfil;
const TipoPerfil = db.tipoperfil;
const Permissao = db.permissao;

exports.gerarDados = function(){
    cadastrarTipoPerfil(tipoperfil_cliente).then(() => {
        cadastrarTipoPerfil(tipoperfil_profissional).then(() => {
            cadastrarTipoPerfil(tipoperfil_neutro).then(() => {
                cadastrarPermissao(permissao_administrador).then(() =>{
                    cadastrarPermissao(permissao_desenvolvedor).then(() =>{
                        cadastrarPermissao(permissao_moderador).then(() =>{
                            cadastrarPermissao(permissao_profissional).then(() =>{
                                cadastrarPermissao(permissao_cliente).then(() =>{
                                    cadastrarUsuario(usuario_administrador).then(() => {
                                        cadastrarUsuario(usuario_desenvolvedor).then(() => {
                                            cadastrarUsuario(usuario_moderador);
                                        });
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

function cadastrarUsuario(usuarioB){
    return Usuario.create(new UsuarioObj(usuarioB)).then(function (usuario) {
        Endereco.create(new EnderecoObj(usuarioB)).then(function (endereco) {
            usuarioB.id = usuario.id;
            usuarioB.perfil.endereco.id = endereco.id;
            Perfil.create(new PerfilObj(usuarioB)).then(function (perfil) {
                usuarioB.perfil.id = perfil.id;
                db.sequelize.Promise.map(usuarioB.perfil.permissoes, function (permissao) {
                    PermissaoPerfil.create(new PerfilPermissaoObj(usuarioB, permissao));
                });
            });
        });
    });
}

function cadastrarTipoPerfil(tipoperfilB){
    return TipoPerfil.create(new TipoPerfilObj(tipoperfilB));
}

function cadastrarPermissao(permissaoB){
    return Permissao.create(new PermissaoObj(permissaoB));
}

var usuario_administrador = {
    email: "admin",
    senha: "12345",
    perfil: {
        nome: "Administrador-Base",
        sobrenome: "Adm",
        datanascimento: null,
        cpf: "00000000000",
        sexo: "M",
        celular: "00000000",
        urlimg: null,
        ativo: null,
        tipoperfilId: 3,            
        endereco: {
            cep: "010101",
            numero: "010101",
            logradouro: "010101",
            complemento: "010101",
            bairro: "010101",
            cidade: "010101",
            uf: "010101",
            pais: "010101",
            latitude: "010101",
            longitude: "010101"
        },
        permissoes: [
            {
                permissaoId: 1             
            }
        ]
    }
};

var usuario_desenvolvedor = {     
    email: "dev-noob",
    senha: "12345",
    perfil: {
        nome: "Desenvolvedor",
        sobrenome: "010101",
        datanascimento: null,
        cpf: "00000000000",
        sexo: "M",
        celular: "00000000",
        urlimg: null,
        ativo: null,
        tipoperfilId: 3,            
        endereco: {
            cep: "010101",
            numero: "010101",
            logradouro: "010101",
            complemento: "010101",
            bairro: "010101",
            cidade: "010101",
            uf: "010101",
            pais: "010101",
            latitude: "010101",
            longitude: "010101"
        },
        permissoes: [
            {
                permissaoId: 2             
            }
        ]
    }
};

var usuario_moderador = {     
    email: "moderador",
    senha: "12345",
    perfil: {
        nome: "Moderador-Base",
        sobrenome: "Mod",
        datanascimento: null,
        cpf: "00000000000",
        sexo: "M",
        celular: "00000000",
        urlimg: null,
        ativo: null,
        tipoperfilId: 3,            
        endereco: {
            cep: "010101",
            numero: "010101",
            logradouro: "010101",
            complemento: "010101",
            bairro: "010101",
            cidade: "010101",
            uf: "010101",
            pais: "010101",
            latitude: "010101",
            longitude: "010101"
        },
        permissoes: [
            {
                permissaoId: 3             
            }
        ]
    }
};

var tipoperfil_cliente = {
    descricao:"Cliente",
    sigla: "C"
};
var tipoperfil_profissional = {
    descricao:"Profissional",
    sigla: "P"
};
var tipoperfil_neutro = {
    descricao:"Neutro",
    sigla: "N"
};

var permissao_administrador = {
    descricao:"Ação Administrador",
    sigla: "AA"
};
var permissao_desenvolvedor = {
    descricao:"Ação Desenvolvedor",
    sigla: "AD"
};
var permissao_moderador = {
    descricao:"Ação Moderador",
    sigla: "AM"
};
var permissao_profissional = {
    descricao:"Ação Profissional",
    sigla: "AP"
};
var permissao_cliente = {
    descricao: "Ação Cliente",
    sigla: "AC"
};

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

function PerfilPermissaoObj(usuario, permissao) {
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