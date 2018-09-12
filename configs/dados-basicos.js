const db = require('./dbConfig.js');
const construtores = require('../api/construtores');
const variaveisCadastro = require('./variaveiscadastro');
const Usuario = db.usuario;
const Perfil = db.perfil;
const Endereco = db.endereco;
const PermissaoPerfil = db.permissaoperfil;
const CategoriaPerfil = db.categoriaperfil;
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
    return Usuario.create(new construtores.UsuarioObj(usuarioB)).then(function (usuario) {
        Endereco.create(new construtores.EnderecoObjByUsuario(usuarioB)).then(function (endereco) {
            usuarioB.id = usuario.id;
            usuarioB.perfil.endereco.id = endereco.id;
            Perfil.create(new construtores.PerfilObjByUsuario(usuarioB)).then(function (perfil) {
                usuarioB.perfil.id = perfil.id;
                db.sequelize.Promise.map(usuarioB.perfil.permissoes, function (permissao) {
                    PermissaoPerfil.create(new construtores.PerfilPermissaoObj(usuarioB, permissao));
                });
            });
        });
    });
}

function cadastrarSitiacao(situacaoB){
    return Situacao.create(new construtores.SituacaoObj(situacaoB));
}

function cadastrarTipoPerfil(tipoperfilB){
    return TipoPerfil.create(new construtores.TipoPerfilObj(tipoperfilB));
}

function cadastrarPermissao(permissaoB){
    return Permissao.create(new construtores.PermissaoObj(permissaoB));
}