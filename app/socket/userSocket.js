'use strict'
module.exports = (app)=>{
	const socketCtrl = {
		inserirUser: (req,user)=>{
			var io = req.app.get('socketio');
    		io.emit('inserir', {usuario: user});
		},
		alterarUser: (req,res)=>{

		}
	}
	return socketCtrl
}
