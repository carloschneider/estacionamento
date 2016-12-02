'use strict'
module.exports = (app)=>{
	const user	= app.controllers.user
	app.route('/default')
		.get(user.default)
}