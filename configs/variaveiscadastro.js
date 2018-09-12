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

var situacao_aguardando = {
    descricao: "Aguardando Atendimento"
};
var situacao_atendido = {
    descricao: "Atendido"
};
var situacao_fechado = {
    descricao: "Trabalho Fechado"
};
var situacao_finalizado = {
    descricao: "Trabalho Finalizado"
};
var situacao_nao_fechado = {
    descricao: "Trabalho Não Foi Fechado"
};

module.exports = usuario_administrador;
module.exports = usuario_desenvolvedor;
module.exports = usuario_moderador;
module.exports = tipoperfil_cliente;
module.exports = tipoperfil_profissional;
module.exports = tipoperfil_neutro;
module.exports = permissao_administrador;
module.exports = permissao_desenvolvedor;
module.exports = permissao_moderador;
module.exports = permissao_profissional;
module.exports = permissao_cliente;
module.exports = situacao_aguardando;
module.exports = situacao_atendido;
module.exports = situacao_fechado;
module.exports = situacao_finalizado;
module.exports = situacao_nao_fechado;
