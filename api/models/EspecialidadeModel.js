module.exports = (sequelize, Sequelize) => {
	const Especialidade = sequelize.define('especialidade', {
		descricao: Sequelize.STRING
	});
	return Especialidade;
}