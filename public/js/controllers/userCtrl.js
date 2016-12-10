
(function(){
	'use strict'
	app.controller('UserCtrl', ['$scope', 'AuthService','Flash','$state','UserFactory'
		,function($scope,AuthService,Flash,$state,UserFactory){
			$scope.user = {};
			$scope.error = {};
			$scope.user = {};
			Flash.timeout = 5000;
			$scope.grupo = [{valor: 0, nome: 'Administrador'},{valor: 1, nome: 'Atendimento'}];
			$scope.status = [{valor: false,nome: 'Ativo'},{valor: true, nome: 'Bloqueado'}];

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
						$scope.listarFm = !$scope.listarFm;
						$state.go('painel.user.cadastrar');
					};
					$scope.listar = function(){
						$scope.listarFm = true;
						UserFactory.listar().then(function(response){
							$state.go('painel.user.listar');
							$scope.users = response.data;	
						});
					};
				/*
					Update Usuário
					*/
					$scope.update = function(data,id){
						var user = {
							nome: data.nome,
							status: data.status,
							tipo:  data.tipo,
							_id: id
						};

						UserFactory.update(user).then();
					}
					/*
						Valida se Já existe o login
						*/
						$scope.validar = function(user){
							UserFactory.listLogin(user).then(function(response){
								Flash.clear();
								if(response.data.msg){

									$scope.user.login = ''
									Flash.create('danger', response.data.error);
								};
							});
						};

					/*
						Adiciona um novo usuário
						*/
						$scope.add = function(user){
							UserFactory.cadastrar(user).then(function(response){
								if(response.data.msg){
									Flash.create('success', response.data.error);
									delete $scope.user
								}else{
									Flash.create('danger', response.data.error);
									delete $scope.user
								}
							}, function(err){
								console.log(err);
							});
						}

					/*
						Deleta um usuário
						*/

						$scope.del = function(user){
							UserFactory.delete(user).then(function(response){
								/*
									Retirando o usuario do array
								*/
								$scope.users = $scope.users.filter(function(usuario){
									if(user._id != usuario._id) return usuario
								});
							}, function(err){
								console.log(err);
							})

						}


					}]);
})();

