'use strict'
module.exports = (app)=>{
	const painel = app.controllers.painel
	
	app.route('/painel')
		.get(painel.index)
}