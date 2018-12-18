const db = require('./dbConfig.js');
const Usuario = db.usuario;

exports.permissaoDesenvolvedor = (req, res, next) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
        var permissoes = usuario.perfil.permissoes; 
        var temPermissao = false;
        for(i = 0; i < permissoes.length; i++){
            if(permissoes[i].permissao.descricao == "Ação Desenvolvedor")
                temPermissao = true;            
        }
        if(temPermissao){
            req.usuario = usuario;
            next();
        }else
            return res.redirect('https://guiaproweb.herokuapp.com/erro-permissao');
	}); 
};

exports.permissaoAdministrador = (req, res, next) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
        var permissoes = usuario.perfil.permissoes; 
        var temPermissao = false;
        for(i = 0; i < permissoes.length; i++){
            if(permissoes[i].permissao.descricao == "Ação Desenvolvedor"
                || permissoes[i].permissao.descricao == "Ação Administrador")
                temPermissao = true;            
        }
        if(temPermissao){
            req.usuario = usuario;
            next();
        }else
            return res.redirect('https://guiaproweb.herokuapp.com/erro-permissao');
	}); 
};

exports.permissaoModerador = (req, res, next) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
        var permissoes = usuario.perfil.permissoes; 
        var temPermissao = false;
        for(i = 0; i < permissoes.length; i++){
            if(permissoes[i].permissao.descricao == "Ação Desenvolvedor"
            || permissoes[i].permissao.descricao == "Ação Administrador"
            || permissoes[i].permissao.descricao == "Ação Moderador")
                temPermissao = true;            
        }
        if(temPermissao){
            req.usuario = usuario;
            next();
        }else
            return res.redirect('https://guiaproweb.herokuapp.com/erro-permissao');
	}); 
};

exports.permissaoProfissional = (req, res, next) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
        var permissoes = usuario.perfil.permissoes; 
        var temPermissao = false;
        for(i = 0; i < permissoes.length; i++){
            if(permissoes[i].permissao.descricao == "Ação Desenvolvedor"
            || permissoes[i].permissao.descricao == "Ação Administrador"
            || permissoes[i].permissao.descricao == "Ação Moderador"
            || permissoes[i].permissao.descricao == "Ação Profissional")
                temPermissao = true;            
        }
        if(temPermissao){
            req.usuario = usuario;
            next();
        }else
            return res.redirect('https://guiaproweb.herokuapp.com/erro-permissao');
	}); 
};

exports.permissaoCliente = (req, res, next) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
        var permissoes = usuario.perfil.permissoes; 
        var temPermissao = false;
        for(i = 0; i < permissoes.length; i++){
            if(permissoes[i].permissao.descricao == "Ação Desenvolvedor"
            || permissoes[i].permissao.descricao == "Ação Administrador"
            || permissoes[i].permissao.descricao == "Ação Moderador"
            || permissoes[i].permissao.descricao == "Ação Cliente")
                temPermissao = true;            
        }
        if(temPermissao){
            req.usuario = usuario;
            next();
        }else
            return res.redirect('https://guiaproweb.herokuapp.com/erro-permissao');
	}); 
};
