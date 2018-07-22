var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

const db = require('./configs/dbConfig.js');
db.sequelize.sync({force: false}).then(() => {
  console.log('Sincronizando o banco sem deletar as tableas já existentes.');
});

/* DEPOIS COLOCAR TUDO ISSO EM UM ARQUIVO SÓ <3 */
require('./api/routes/AtendimentoRoutes.js')(app);
require('./api/routes/CategoriaRoutes.js')(app);
require('./api/routes/EmpresaRoutes.js')(app);
require('./api/routes/EnderecoRoutes.js')(app);
require('./api/routes/PerfilRoutes.js')(app);
require('./api/routes/PermissaoRoutes.js')(app);
require('./api/routes/SituacaoRoutes.js')(app);
require('./api/routes/TipoAtendimentoRoutes.js')(app);
require('./api/routes/TipoPerfilRoutes.js')(app);
require('./api/routes/UsuarioRoutes.js')(app);
require('./web/routes/PageRoutes.js')(app);

var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Aplicação está on nesse endereço http://%s:%s", host, port)
});


