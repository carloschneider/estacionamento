'use strict'
app.controller('UserCtrl', ['$scope', 'AuthService','Flash','$location' 
	,function($scope,AuthService,Flash,$location){
	$scope.user = {};
	$scope.error = {};
	Flash.timeout = 5000
	
	$scope.logar = function(usuario){

		AuthService.signin(usuario).then(function(response){
			Flash.clear();
			if(!response.data.success){
				$scope.error = response.data;
				Flash.create('danger', $scope.error.message);
				delete $scope.error
			}else{
				AuthService.setToken(response.data.token);
				$location.path('/painel');
			}
		}, function(err){
			console.log(err);
		});
	};

}]);
