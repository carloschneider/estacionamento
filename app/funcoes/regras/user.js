'use strict'
import express  from 'express'
import jwt  	from 'jsonwebtoken'
module.exports = (app)=>{
	const 	User = app.models.user
	,		pass = require('../../middleware/password')
	,		regraUser = {
		autenticar: (req,res)=>{
			User.findOne({
				login: req.body.nome
			}, function(err, user) {

				if (err) throw err;

				if (!user) {
					res.json({ success: false, message: 'Error na atutenticação. Usuário não encontrado.' });
				} else if (user) {

					if(pass.validate(user.password, req.body.senha)) {
						res.json({ success: false, message: 'Error na atutenticação. Senha incorreta.' });
					} else {

						var token = jwt.sign(user, app.get('superSecret'), {
							expiresIn : 60*60*24
						});


						res.json({
							success: true,
							message: 'Token Ativado',
							token: token
						});
					}   
				}
			});
		},

	}
	return regraUser;
}