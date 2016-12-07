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

