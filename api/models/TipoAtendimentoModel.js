module.exports = (sequelize, Sequelize) => {
	const TipoAtendimento = sequelize.define('tipoatendimento', {

		descricao: Sequelize.STRING
			 
	});	
	return TipoAtendimento;
}