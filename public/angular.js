'use strict'
var app = angular.module('app',['btford.socket-io','ui.router','ngRoute','ngStorage','ngFlash'])
.factory('mySocket', function (socketFactory) {
	return socketFactory();
})

.run(function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.authorize) {
            if (!AuthService.getToken()) {
                // event.preventDefault();
                // $location.path('/');
                $rootScope.$evalAsync(function () {
                    $location.path('/');
                })
            }
        }
    });
});



// respiridona mg 2
// prometazina mg 25

app.factory('AuthService', AuthService);

function AuthService ($http, $localStorage, $q) {
  return {
    getToken : function () {
      return $localStorage.token;
    },
    setToken: function (token) {
      $localStorage.token = token;
    },
    signin : function (data) {
      return $http.post('/', data);
    },
    signup : function (data) {
      return $http.post('api/signup', data);
    },
    logout : function () {
      delete $localStorage.token;
      $q.when();
    }
  };
}
'use strict'

app.config(['$stateProvider','$locationProvider', '$urlRouterProvider' , function($stateProvider,$locationProvider, $urlRouterProvider) {

    $stateProvider    

    .state("login", {
        url: '/',
        templateUrl : "paginas/login/index.html",
        authorize: false,
        controller: 'UserCtrl'
    })
    .state('painel', {
        url:'/painel',
        templateUrl: "paginas/painel/index.html",
        authorize: true
    })

    $urlRouterProvider
    .otherwise('/');

    $locationProvider.html5Mode(true);
}])




'use strict'

app.config(['$stateProvider','$locationProvider', '$urlRouterProvider' , function($stateProvider,$locationProvider, $urlRouterProvider) {

    $stateProvider    


    $locationProvider.html5Mode(true);
}])




'use strict'
app.controller('PainelCtrl', ['$scope','AuthService','$location', function($scope,AuthService,$location){


	$scope.menuItems = [
	{
		name: 'Usuários',
		url:  '/painel/user',
	},
	{
		name:   'Estabelecimentos',
		url:    '/painel/estabelcimento',
	},
	{
		name:   'Clientes',
		url:    '/painel/clientes',
	},
	{
		name:   'Tabelas de Preço',
		url:    '/painel/preco',
	},
	{
		name:   'Lava Jato',
		url:    '/painel/lavajato',
	},
	{
		name:   'Convênios',
		url:    '/painel/convenio',
	},
	{
		name:   'Mensalidades',
		url:    '/painel/lavajato',
	},
	];

	$scope.sair = function(){
		AuthService.logout();
		$location.path('/');
	}
}]);


'use strict'

app.controller('UserCtrl', ['$scope', 'AuthService','Flash','$location' 
	,function($scope,AuthService,Flash,$location){
	$scope.user = {};
	$scope.error = {};
	Flash.timeout = 5000;
	
	$scope.logar = function(usuario){

		AuthService.signin(usuario).then(function(response){
			Flash.clear();
			if(!response.data.success){
				$scope.error = response.data;
				Flash.create('danger', $scope.error.message);
				delete $scope.error;
			}else{
				AuthService.setToken(response.data.token);
				$location.path('/painel');
			}
		}, function(err){
			console.log(err);
		});
	};

}]);
