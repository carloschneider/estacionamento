'use strict'
module.exports = (app)=>{
	// Pegando o socket.io do index.js
	const io = require('socket.io').listen(app)

	
	io.on("connection", function(socket){
		console.log('Socket Conectado : ) ');

		socket.on('disconnect', function () {
			console.log("desconectado!")
		});

		
	});
}
