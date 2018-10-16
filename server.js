var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Aplicação está on nesse endereço http://%s:%s", host, port)
});

var socketIO = require('socket.io')(server);

const db = require('./configs/dbConfig.js');
var dados_basicos = require('./configs/dados-basicos.js');
var deletar = false;

db.sequelize.sync({force: deletar}).then(() => {
    if(deletar)
        dados_basicos.gerarDados();
    console.log('Sincronizando o banco sem deletar as tableas já existentes.');
});

socketIO.on("disconnect", function() {
    socket.socket.reconnect();
});

socketIO.on("connect", function() {
    console.log("Cliente conectado socket.io");
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
require('./configs/autenticacaoRoutes.js')(app);
require('./socket/routes/NotificacaoRoutes.js')(app, socketIO);




