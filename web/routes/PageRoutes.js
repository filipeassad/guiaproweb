'use strict';
var express = require("express");
var path = require('path');
module.exports = function(app) {

    var path_web = path.resolve(__dirname, '..');

    app.use('/imagens',express.static(path_web + '/img'));
    app.use('/css',express.static(path_web + '/css'));    
    app.use('/scripts',express.static(path_web + '/scripts'));
    app.use('/page',express.static(path_web + '/pages'));

    app.route('/')
        .get(function(req, res){
            res.render(path_web + '/pages/index.html');
        });
    app.route('/login')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/login.html');
        });
    app.route('/cadastro-usuario')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-usuario.html');  
        });
    app.route('/busca-usuario')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-usuario.html');  
        });
    app.route('/cadastro-tipoperfil')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-tipoperfil.html');  
        });
    app.route('/busca-tipoperfil')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-tipoperfil.html');  
        });
    app.route('/cadastro-categoria')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-categoria.html');  
        });
    app.route('/busca-categoria')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-categoria.html');  
        });
    app.route('/cadastro-permissao')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-permissao.html');  
        });
    app.route('/busca-permissao')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-permissao.html');  
        });
    app.route('/busca-situacao')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-situacao.html');  
        });
    app.route('/cadastro-situacao')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-situacao.html');  
        });
    app.route('/cadastro-tipoatendimento')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-tipoatendimento.html');  
        });
    app.route('/busca-tipoatendimento')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/buscas/busca-tipoatendimento.html');  
        });
    app.route('/cadastro-endereco')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-endereco.html');  
        });
    app.route('/cadastro-empresa')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-empresa.html');  
        });
    app.route('/cadastro-atendimento')
        .get(function(req, res){
            res.sendFile(path_web + '/pages/cadastros/cadastro-atendimento.html');  
        });
};