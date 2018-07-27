const db = require('../../configs/dbConfig.js');
const Categoria = db.categoria;
 
exports.cadastrar_categoria = (req, res) => {
	var categoriaB = req.body;
	if(validaCategoria(categoriaB)){
		Categoria.create(new CategoriaObj(categoriaB)).then(categoria => {		
			res.send(JSON.stringify({ success: true, message: 'A categoria foi cadastrada com sucesso.' }));
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}
	
};

exports.atualizar_categoria = (req, res) => {
	const categoriaId = req.params.categoriaId;
	var categoriaB = req.body;
	if(validaCategoria(categoriaB)){
		Categoria.update(new CategoriaObj(categoriaB), { where: { id: categoriaId } }).then(categoria => {		
			res.send(JSON.stringify({ success: true, message: 'A categoria foi alterada com sucesso.' }));
		});
	}else{
		res.send(JSON.stringify({ success: false, message: 'Dados obrigatórios não foram preenchidos!' }));
	}
};
 
exports.deletar_categoria = (req, res) => {
	const id = req.params.categoriaId;
	Categoria.destroy({
	  where: { id: id }
	}).then(() => {
		res.json({ success: true, message: 'A categoria foi deletada com sucesso.' });
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

function CategoriaObj(categoria){
	this.descricao = categoria.descricao,
	this.sigla = categoria.sigla,
	this.urlimg = categoria.urlimg
}

function validaCategoria(categoria){

	if(categoria == null)
		return false;
	if(categoria.descricao == null || categoria.descricao.trim() == '')
		return false;		
	if(categoria.sigla == null || categoria.sigla.trim() == '')
		return false;
	/*if(categoria.urlimg == null || categoria.urlimg.trim() == '')
		return false;*/

	return true;
}