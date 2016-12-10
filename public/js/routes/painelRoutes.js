(function(){
	'use strict'
	app.config(['$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {

		$stateProvider    
		 .state('painel', {
            url:'/painel',
            templateUrl: "/paginas/painel/index.html",
            controller: 'PainelCtrl',
            authorize: true
        })
		.state('painel.user',{
			templateUrl: '/paginas/user/index.html',
			controller: 'UserCtrl',
			authorize: true
		})
		.state('painel.user.cadastrar',{
			templateUrl: '/paginas/user/cadastrar.html',
			controller: 'UserCtrl',
			authorize: true
		})
		.state('painel.user.listar',{
			templateUrl: '/paginas/user/listar.html',
			controller: 'UserCtrl',
			authorize: true
		})

		$urlRouterProvider
		.otherwise('/painel');


	}]);
})();



