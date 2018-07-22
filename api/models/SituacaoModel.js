module.exports = (sequelize, Sequelize) => {
	const Situacao = sequelize.define('situacao', {

		descricao: Sequelize.STRING
		 
	});	
	return Situacao;
}