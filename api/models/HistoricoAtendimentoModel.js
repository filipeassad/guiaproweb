module.exports = (sequelize, Sequelize) => {
	const HistoricoAtendimento = sequelize.define('historicoatendimento', {

		data: Sequelize.DATE,
		titulo: Sequelize.STRING,
		descricao: Sequelize.STRING

	});
	return HistoricoAtendimento;
}