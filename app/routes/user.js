'use strict'
module.exports = (app)=>{
	const user	= app.controllers.user
	,	  url 	= '/api/'
	app.route('/default')
		.get(user.default)
	app.route(url+ 'users')
		.put(user.update)
		.get(user.listar)
		


}