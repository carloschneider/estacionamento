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
		listar: (req,res)=>{
			let recebe = User.find({},{token:0, password:0})
			recebe.lean();
			recebe.exec().then((user)=> res.json(user)).catch((err)=> res.json({msg: err}));
		},
		update: (req,res)=>{
			let user = new User()
			user = req.body;
			let update = {nome: user.nome, status: user.status, tipo: user.tipo};
			

			User.update({_id: user._id},update).then((user)=> res.json({msg: true})).catch((err)=> res.json({msg: false}));
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
		},
		autenticar: (req,res)=>{
			res.json({msg: true});
		}
	}
	return CrudCtrl;
}