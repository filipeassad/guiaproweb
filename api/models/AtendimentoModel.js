module.exports = (sequelize, Sequelize) => {
        const Atendimento = sequelize.define('atendimento', {

                data: Sequelize.DATE,
                titulo: Sequelize.STRING,
                descricao: Sequelize.STRING
                        
        });	
        return Atendimento;
}