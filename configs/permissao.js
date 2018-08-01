const db = require('./dbConfig.js');
const Usuario = db.usuario;

exports.permissaoDesenvolvedor = (req, res) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
		usuario.perfil.permissoes.forEach(perfilpermissao => {
            if(perfilpermissao.permissao.descricao == "Ação Desenvolvedor"){
                req.usuario = usuario;
                next();
            }
        });
        return res.json({ success: false, message: 'Sem permissão.' });
	}); 
};

exports.permissaoAdministrador = (req, res) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
		usuario.perfil.permissoes.forEach(perfilpermissao => {
            if(perfilpermissao.permissao.descricao == "Ação Administrador" 
            || perfilpermissao.permissao.descricao == "Ação Desenvolvedor"){
                req.usuario = usuario;
                next();
            }
        });
        return res.json({ success: false, message: 'Sem permissão.' });
	}); 
};

exports.permissaoModerador = (req, res) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
		usuario.perfil.permissoes.forEach(perfilpermissao => {
            if(perfilpermissao.permissao.descricao == "Ação Administrador" 
            || perfilpermissao.permissao.descricao == "Ação Desenvolvedor"
            || perfilpermissao.permissao.descricao == "Ação Moderador"){
                req.usuario = usuario;
                next();
            }
        });
        return res.json({ success: false, message: 'Sem permissão.' });
	}); 
};

exports.permissaoProfissional = (req, res) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
		usuario.perfil.permissoes.forEach(perfilpermissao => {
            if(perfilpermissao.permissao.descricao == "Ação Administrador" 
            || perfilpermissao.permissao.descricao == "Ação Desenvolvedor"
            || perfilpermissao.permissao.descricao == "Ação Moderador"
            || perfilpermissao.permissao.descricao == "Ação Profissional"){
                req.usuario = usuario;
                next();
            }
        });
        return res.json({ success: false, message: 'Sem permissão.' });
	}); 
};

exports.permissaoCliente = (req, res) => {
    Usuario.findById(req.decoded.id, { include: [{ all: true, nested: true }] }).then(usuario => {
		usuario.perfil.permissoes.forEach(perfilpermissao => {
            if(perfilpermissao.permissao.descricao == "Ação Administrador" 
            || perfilpermissao.permissao.descricao == "Ação Desenvolvedor"
            || perfilpermissao.permissao.descricao == "Ação Moderador"
            || perfilpermissao.permissao.descricao == "Ação Cliente"){
                req.usuario = usuario;
                next();
            }
        });
        return res.json({ success: false, message: 'Sem permissão.' });
	}); 
};