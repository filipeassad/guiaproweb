module.exports = (sequelize, Sequelize) => {
	const Perfil = sequelize.define('perfil', {

                nome: Sequelize.STRING,
                sobrenome: Sequelize.STRING,
                datanascimento: Sequelize.DATE,
                cpf: Sequelize.STRING,
                sexo: Sequelize.STRING,
                celular: Sequelize.STRING,
                urlimg: Sequelize.STRING,
                ativo: Sequelize.STRING	 
        
	});	
	return Perfil;
}