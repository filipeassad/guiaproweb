const env = {
    database: 'd77l40qp3mh73s',
    username: 'wuhqxrikmisxmr',
    password: 'b0aaf0aa3198537749f89e64b24179a3155410529b19e0e7becfb277cb416c32',
    host: 'ec2-54-221-210-97.compute-1.amazonaws.com',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

/*const env = {
    database: 'bancoguia',
    dialect: 'sqlite',
    storage: './bancoCriado.sqlite'  
};*/

module.exports = env;