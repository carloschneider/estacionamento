
(function(){
	'use strict'
	app.controller('UserCtrl', ['$scope', 'AuthService','Flash','$state','UserFactory'
		,function($scope,AuthService,Flash,$state,UserFactory){
			$scope.user = {};
			$scope.error = {};
			Flash.timeout = 5000;
			$scope.grupo = [
				{valor: 0, nome: 'Administrador'},
				{valor: 1, nome: 'Atendimento'}
			]
			$scope.status = [{valor: false,nome: 'Ativo'},{valor: true, nome: 'Bloqueado'}]

				/*
					Efetuar o Login
					*/
					$scope.logar = function(usuario){
						AuthService.signin(usuario).then(function(response){
							Flash.clear();
							if(!response.data.success){
								$scope.error = response.data;
								Flash.create('danger', $scope.error.message);
								delete $scope.error;
							}else{
								AuthService.setToken(response.data.token);
								$state.go('painel')
							}
						}, function(err){
							console.log(err);
						});
					};
			/*
				listar Usuário
				*/	

				$scope.cadastrar = function(){
					$state.go('painel.user.cadastrar');
				}
				$scope.listar = function(){
					$scope.listar = true;
					UserFactory.listar().then(function(response){
						$state.go('painel.user.listar');
						$scope.users = response.data;	
					});
				}

				$scope.update = function(data,id){
					
					var user = {
						nome: data.nome,
						status: data.status,
						tipo:  data.tipo,
						_id: id
					};
					
					UserFactory.update(user).then(function(response){
						console.log(response);
					}, function(err){
						console.log(err);
					})
				}


			}]);
})();

