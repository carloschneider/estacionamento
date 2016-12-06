'use strict'

module.exports = (app)=>{
	const 	regrasUser = app.funcoes.regras.user
	,	 indexCtrl = {
		
		autenticao: (req,res)=>{
			regrasUser.autenticar(req,res);
		},


	};
	return indexCtrl;
}