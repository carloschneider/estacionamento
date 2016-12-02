'use strict'
module.exports = (app)=>{
	const index 	= app.controllers.index
	,   autenticar 	= require('../middleware/autenticador')
	,   passport 	= require('passport');

	app.route('/loginfail')
		.get(index.error)
		
	app.route('/')
		.get(index.index)
		.post(passport.authenticate('local', { failureRedirect: 'loginfail'}), index.logar);
		
	app.route('/logout')
		.get(index.logout);
}