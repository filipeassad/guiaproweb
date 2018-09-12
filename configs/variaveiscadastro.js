exports.usuario_administrador = {
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

exports.usuario_desenvolvedor = {     
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

exports.usuario_moderador = {     
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

exports.tipoperfil_cliente = {
    descricao:"Cliente",
    sigla: "C"
};
exports.tipoperfil_profissional = {
    descricao:"Profissional",
    sigla: "P"
};
exports.tipoperfil_neutro = {
    descricao:"Neutro",
    sigla: "N"
};

exports.permissao_administrador = {
    descricao:"Ação Administrador",
    sigla: "AA"
};
exports.permissao_desenvolvedor = {
    descricao:"Ação Desenvolvedor",
    sigla: "AD"
};
exports.permissao_moderador = {
    descricao:"Ação Moderador",
    sigla: "AM"
};
exports.permissao_profissional = {
    descricao:"Ação Profissional",
    sigla: "AP"
};
exports.permissao_cliente = {
    descricao: "Ação Cliente",
    sigla: "AC"
};

exports.situacao_aguardando = {
    descricao: "Aguardando Atendimento"
};
exports.situacao_atendido = {
    descricao: "Atendido"
};
exports.situacao_fechado = {
    descricao: "Trabalho Fechado"
};
exports.situacao_finalizado = {
    descricao: "Trabalho Finalizado"
};
exports.situacao_nao_fechado = {
    descricao: "Trabalho Não Foi Fechado"
};
