const db = require('../../configs/dbConfig.js');
const Categoria = db.categoria;
 
exports.cadastrar_categoria = (req, res) => {
	Categoria.create({  		
		descricao: req.body.descricao,
        sigla: req.body.sigla,
        urlimg: req.body.urlimg
	}).then(categoria => {		
		res.send(categoria);
	});
};
 
exports.obter_todos_categorias = (req, res) => {
	Categoria.findAll({include: [{all: true, nested: true}]}).then(categorias => {
	  res.send(categorias);
	});
};
 
exports.obter_categoria_por_id = (req, res) => {	
	Categoria.findById(req.params.categoriaId, {include: [{all: true, nested: true}]}).then(categoria => {
		res.send(categoria);
	})
};
 
exports.atualizar_categoria = (req, res) => {
	const id = req.params.categoriaId;
	Categoria.update( { 
		descricao: req.body.descricao,
        sigla: req.body.sigla,
        urlimg: req.body.urlimg
	}, 
	{ 
		where: {
			id: req.params.categoriaId
		} 
	}).then(() => {
		res.json({ success: true, message: 'A Categoria foi alterada.' });
	});
};
 
exports.deletar_categoria = (req, res) => {
	const id = req.params.categoriaId;
	Categoria.destroy({
	  where: { id: id }
	}).then(() => {
		res.json({ success: true, message: 'A Categoria foi deletada.' });
	});
};