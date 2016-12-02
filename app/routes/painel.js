'use strict'
module.exports = (app)=>{
	const painel = app.controllers.painel
	,     autenticar 	= require('../middleware/autenticador');
	app.route('/painel')
		.get(autenticar.loginSistema, painel.index)
}