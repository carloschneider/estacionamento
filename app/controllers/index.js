'use strict'

module.exports = (app)=>{
	const 	regrasUser = app.funcoes.regras.user
	,	 indexCtrl = {
		index: (req,res)=>{
			app.get('/', function (req, res) {
				res.sendfile('./public/paginas/index.html');
			});
		},

		autenticao: (req,res)=>{
			regrasUser.autenticar(req,res);
		},

		error: (req,res)=>{
			
			res.redirect('/')			
		},
		logout: (req,res)=> {
			req.logout()
			res.redirect('/')
		}

	};
	return indexCtrl;
}