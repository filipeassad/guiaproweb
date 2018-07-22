module.exports = (sequelize, Sequelize) => {
	const Permissao = sequelize.define('permissao', {

		descricao: Sequelize.STRING,
		sigla: Sequelize.STRING	 
        
	});	
	return Permissao;
}