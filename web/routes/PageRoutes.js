'use strict';
var express = require('express');
var path = require('path');
var autenticacao = require('../../configs/autenticacao.js');
var permissaoPagina = require('../../configs/permissao-pagina.js');
module.exports = function(app) {

    var path_web = path.resolve(__dirname, '..');

    app.use('/imagens',express.static(path_web + '/img'));
    app.use('/css',express.static(path_web + '/css'));    
    app.use('/scripts',express.static(path_web + '/scripts'));
    app.use('/page',express.static(path_web + '/pages'));
    app.use('/calendario',express.static(path_web + '/bower_components'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    
    app.route('')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/index.html');
        });
    app.route('/login')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/login.html');
        });
    app.route('/cadastro-usuario')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador,function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-usuario.html');  
        });
    app.route('/busca-usuario')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador, function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-usuario.html');  
        });
    app.route('/cadastro-tipoperfil')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor, function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-tipoperfil.html');  
        });
    app.route('/busca-tipoperfil')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor, function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-tipoperfil.html');  
        });
    app.route('/cadastro-categoria')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador, function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-categoria.html');  
        });
    app.route('/busca-categoria')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador, function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-categoria.html');  
        });
    app.route('/cadastro-permissao')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor, function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-permissao.html');  
        });
    app.route('/busca-permissao')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor, function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-permissao.html');  
        });
    app.route('/busca-situacao')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor, function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-situacao.html');  
        });
    app.route('/cadastro-situacao')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor,function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-situacao.html');  
        });
    app.route('/cadastro-tipoatendimento')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor, function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-tipoatendimento.html');  
        });
    app.route('/busca-tipoatendimento')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoDesenvolvedor, function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-tipoatendimento.html');  
        });
    app.route('/cadastro-endereco')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador,function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-endereco.html');  
        });
    app.route('/busca-empresa')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador,function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-empresa.html');  
        });
    app.route('/cadastro-empresa')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador, function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-empresa.html');  
        });
    app.route('/alterar-empresa/:empresaId')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador, function(req, res){            
            res.render(path_web + '/pages/cadastros/cadastro-empresa.html', {id: req.params.empresaId});  
        });
    app.route('/busca-atendimento')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador, function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-empresa.html');  
        });
    app.route('/cadastro-atendimento')
        .get(autenticacao.validaTokenPagina, permissaoPagina.permissaoAdministrador, function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-atendimento.html');  
        });
    app.route('/erro-permissao')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/erros/erro-permissao.html');  
        });
    
};