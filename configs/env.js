/*const env = {
    database: 'guiaprodb',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};*/

const env = {
    database: 'bancoguia',
    dialect: 'sqlite',
    storage: './bancoCriado.sqlite'  
};

module.exports = env;