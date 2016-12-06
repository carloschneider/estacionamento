'use strict'
module.exports = (app)=>{
	const index 	= app.controllers.index;
		
	app.route('/')
		.post(index.autenticao)

	app.route('/api/user')
		.get(index.autenticao)
		
}