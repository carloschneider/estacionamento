'use strict'
module.exports = (app)=>{
	const   crud 	 = app.funcoes.crud.crudUser
	,		userCtrl ={
		cadastrar: (req,res)=> crud.cadastrar(req,res),
		default: (req,res)=> crud.default(req,res),

	}
	return userCtrl;
}