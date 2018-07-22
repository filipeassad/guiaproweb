const irongolem = require('./irongolem.js');
const db = require('./config.js');
const Usuario = db.usuario;
var jwt = require('jsonwebtoken');
var atob = require('atob');

exports.login = (req, res) => {
    const usuario = req.body.email;
    const senha = req.body.senha;
    Usuario.findAll({
        where: {
            email: usuario,
            senha: senha
        }
      }).then(usuario => {
            if(usuario){

                var payload = {                    
					id: usuario[0].id	
                }
				var token = jwt.sign(payload, irongolem);

				res.json({
					success: true,
					message: 'Passe livre.',
					token: token
				});

            }else{
                res.json({ success: false, message: 'Usuário ou senha incorreto.' });
            }
      });
};

exports.validaToken = function (req, res, next){
    var token = req.headers['x-access-token'];
    
    if (token) {
        jwt.verify(token, irongolem, function(err, decoded) {			
            if (err) {
                return res.json({ success: false, message: 'Token invalido.' });		
            } else {
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'Sem autenticação.'
        });            
    }
};