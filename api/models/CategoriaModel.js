module.exports = (sequelize, Sequelize) => {
        const Categoria = sequelize.define('categoria', {

                descricao: Sequelize.STRING,
                sigla: Sequelize.STRING,
                urlimg: Sequelize.STRING	
                                
        });	
        return Categoria;
}