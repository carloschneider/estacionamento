'use strict'
module.exports = (app)=>{
	const   crud 	 = app.funcoes.crud.crudUser
	,		userCtrl ={
		cadastrar: (req,res)=> crud.cadastrar(req,res),
		default: (req,res)=> crud.default(req,res),
		listar: (req,res)=> crud.listar(req,res),
		update: (req,res)=> crud.update(req,res),

	}
	return userCtrl;
}