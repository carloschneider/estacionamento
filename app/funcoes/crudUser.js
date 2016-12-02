'use strict'
module.exports = (app)=>{
	const User = app.models.user
	,	  CrudCtrl = {
		
		cadastrar: (req,res)=>{
			let user = new User();
			user.nome = req.body.nome
			user.login = req.body.login
			user.email = req.body.email
			user.password = req.body.senha
			user.tipo 	  = req.body.tipo
			user.save().exec()
			.then(user => res.json(user))
			.catch(err => res.json(err));

		},
		default: (req,res)=>{
			let user = new User();
			user.nome = 'Higor Diego'
			user.login = 'higor'
			user.email =  'higordiegoti@gmail.com'
			user.password = '123'
			user.tipo 	  = 0
			user.save()
			.then(user => res.json(user))
			.catch(err => res.json(err));
		}
	}
	return CrudCtrl;
}