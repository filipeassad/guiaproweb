const irongolem = require('./irongolem.js');
const db = require('./dbConfig.js');
const Usuario = db.usuario;
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const usuario = req.body.email;
    const senha = req.body.senha;
    Usuario.findAll({
        where: {
            email: usuario,
            senha: senha
        }
      }).then(resposta => {          
            if(resposta.length != 0){

                var payload = {                    
					id: resposta[0].id	
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