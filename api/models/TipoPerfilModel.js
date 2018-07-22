module.exports = (sequelize, Sequelize) => {
	const TipoPerfil = sequelize.define('tipoperfil', {

		descricao: Sequelize.STRING,
		sigla: Sequelize.STRING 
		
	});	
	return TipoPerfil;
}