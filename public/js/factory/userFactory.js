(function(){
	'use strict'
	app.factory('UserFactory', ['$http','Config' ,function($http,Config){
		return {
			listar: function(){
				return $http.get(Config.principal + 'users');
			},
			update: function(data){
				return $http.put(Config.principal + 'users/' , data);
			}

		};
	}]);
})();