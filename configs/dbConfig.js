const env = require('./env.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false, 
    logging: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
}); 

/*const sequelize = new Sequelize(env.database, null, null, {
    dialect: env.dialect,
    storage: env.storage,
    logging: false
});*/

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//  - Tabelas: 
db.atendimento = require('../api/models/AtendimentoModel.js')(sequelize, Sequelize);
db.categoria = require('../api/models/CategoriaModel.js')(sequelize, Sequelize);
db.empresa = require('../api/models/EmpresaModel.js')(sequelize, Sequelize);
db.endereco = require('../api/models/EnderecoModel.js')(sequelize, Sequelize);
db.perfil = require('../api/models/PerfilModel.js')(sequelize, Sequelize);
db.permissao = require('../api/models/PermissaoModel.js')(sequelize, Sequelize);
db.situacao = require('../api/models/SituacaoModel.js')(sequelize, Sequelize);
db.tipoatendimento = require('../api/models/TipoAtendimentoModel.js')(sequelize, Sequelize);
db.tipoperfil = require('../api/models/TipoPerfilModel.js')(sequelize, Sequelize); 
db.usuario = require('../api/models/UsuarioModel.js')(sequelize, Sequelize); 
db.historicoatendimento = require('../api/models/HistoricoAtendimentoModel.js')(sequelize, Sequelize); 

db.permissaoperfil = db.sequelize.define('permissaoperfil',{});
db.categoriaperfil = db.sequelize.define('categoriaperfil',{});
db.empresaperfil = db.sequelize.define('empresaperfil',{});

// - Relações
db.usuario.hasOne(db.perfil);

db.perfil.belongsTo(db.tipoperfil);
db.perfil.belongsTo(db.endereco);

db.empresa.belongsTo(db.endereco);

db.permissaoperfil.belongsTo(db.permissao);
db.permissaoperfil.belongsTo(db.perfil);
db.categoriaperfil.belongsTo(db.categoria, {as:'categoria'});
db.categoriaperfil.belongsTo(db.perfil);

db.perfil.hasMany(db.permissaoperfil, {as: 'permissoes'});
db.perfil.hasMany(db.categoriaperfil, {as: 'categorias'});

db.empresaperfil.belongsTo(db.empresa);
db.empresaperfil.belongsTo(db.perfil);

db.perfil.hasMany(db.empresaperfil, {as: 'empresas'});

db.atendimento.belongsTo(db.perfil, {as: 'cliente'});
db.atendimento.belongsTo(db.perfil, {as: 'profissional'});
db.atendimento.belongsTo(db.tipoatendimento, {as: 'tipoatendimento'});
db.atendimento.belongsTo(db.situacao, {as: 'situacao'});
db.atendimento.belongsTo(db.categoria, {as: 'categoria'});

db.historicoatendimento.belongsTo(db.atendimento, {as: 'atendimento'});
db.historicoatendimento.belongsTo(db.perfil, {as: 'cliente'});
db.historicoatendimento.belongsTo(db.perfil, {as: 'profissional'});
db.historicoatendimento.belongsTo(db.tipoatendimento, {as: 'tipoatendimento'});
db.historicoatendimento.belongsTo(db.situacao, {as: 'situacao'});
db.historicoatendimento.belongsTo(db.categoria, {as: 'categoria'});
 
module.exports = db;