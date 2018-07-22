module.exports = (sequelize, Sequelize) => {
	const Empresa = sequelize.define('empresa', {

            nome: Sequelize.STRING,
            cnpj: Sequelize.STRING,	
            email: Sequelize.STRING,
            telefone: Sequelize.STRING,
            urlimg: Sequelize.STRING
            
	});	
	return Empresa;
}