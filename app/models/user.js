'use strict'
module.exports = (app)=>{

	const mongoose = require('mongoose')
	,	Schema = mongoose.Schema
	,	pass = require('../middleware/password');

	function configPass (v) {
		return pass.hash(v);
	}

	const usuario = new Schema(
		{
			nome: 		{ type: String, required: true},
			
			login: 		{ type: String, required: true,unique: true},
			
			email: 		{ type: String},
			
			password: 	{ type: String, required: true, set: configPass},
			
			tipo: 		{type: Number, default: 0 },
		
			
			created_at: { type: Date, default: Date.now },
			
			updated_at: { type: Date, default: Date.now },
			
			status: 	{ type: Boolean, default: false}
			
		}
	);
	return mongoose.model('Usuario', usuario);
	
}
