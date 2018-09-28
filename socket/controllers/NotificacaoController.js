'use strict';
module.exports = (socketIO) => {   

    const db = require('../../configs/dbConfig.js');
    const Atendimento = db.atendimento;
    var notificacao_module = {};

    notificacao_module.enviar_notificacao_atendimento = (req, res) => {
        console.log('teste Filipe ' + req.params.atendimentoId);
        Atendimento.findById(req.params.atendimentoId, {include: [{all: true, nested: true}]}).then(atendimento => {
            if(atendimento.id != null){
                console.log("entrou aqui");
                socketIO.emit(nomeNotificacao(atendimento), new AtendimentoNotificacao(atendimento));
                res.send(JSON.stringify({ success: true, message: 'Notificação foi enviada com sucesso.' }));
            }else{
                res.send(JSON.stringify({ success: false, message: 'Atendimento não encontrado.' }));
            }
        });                    
    }

    function AtendimentoNotificacao(atendimento){
        this.id = atendimento.id;
        this.data = atendimento.data;
        this.titulo = atendimento.titulo;
        this.descricao = atendimento.descricao;
        this.tipoatendimento = new TipoAtendimentoObj(atendimento.tipoatendimento);
        this.categoria = new CategoriaObj(atendimento.categoria);
        this.cliente = new PerfilObj(atendimento.cliente);
        this.profissional = new PerfilObj(atendimento.profissional);
    }

    function CategoriaObj(categoria){
        this.id = categoria.id;
        this.descricao = categoria.descricao,
        this.sigla = categoria.sigla,
        this.urlimg = categoria.urlimg
    }

    function TipoAtendimentoObj(tipoAtendimento){
        this.id = tipoAtendimento.id;
        this.descricao = tipoAtendimento.descricao;
    }

    function PerfilObj(perfil) {
        this.id = perfil.id;
        this.nome = perfil.nome;
        this.sobrenome = perfil.sobrenome;
        this.celular = perfil.celular;
        this.urlimg = perfil.urlimg;
    }

    function nomeNotificacao(atendimento){
        return "guiapro-notificacao-" + atendimento.profissional.id;
    }

    return notificacao_module;

}
