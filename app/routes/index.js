'use strict'
module.exports = (app)=>{
	const index 	= app.controllers.index;

	app.route('/loginfail')
		.get(index.error)
		
	app.route('/')
		.post(index.autenticao)
		.get(index.index)

	app.route('/api/user')
		.get(index.autenticao)
		
	app.route('/logout',)
		.get(index.logout);
}