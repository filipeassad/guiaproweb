module.exports = (sequelize, Sequelize) => {
        const Endereco = sequelize.define('endereco', {

                cep: Sequelize.STRING,
                numero: Sequelize.STRING,
                logradouro: Sequelize.STRING,
                complemento: Sequelize.STRING,      
                bairro: Sequelize.STRING,      
                cidade: Sequelize.STRING,
                uf: Sequelize.STRING,
                pais: Sequelize.STRING,
                latitude: Sequelize.STRING,      
                longitude: Sequelize.STRING
        
        });	
        return Endereco;
}