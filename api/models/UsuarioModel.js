module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {

            email: Sequelize.STRING,
            senha: Sequelize.STRING
            	 
	});	
	return Usuario;
}