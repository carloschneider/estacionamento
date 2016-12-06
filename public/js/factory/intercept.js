'use strict'
app.factory('AuthInterceptor', ['$location','AuthService','$q','$httpProvider' ,
  function($location,AuthService,$q,$httpProvider){
   function AuthInterceptor ($location, AuthService, $q) {
    return {
      request: function(config) {
        config.headers = config.headers || {};

        if (AuthService.getToken()) {
          config.headers['x-access-token'] =  + AuthService.getToken();
        }

        return config;
      },

      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/');
        }
        return $q.reject(response);
      }
    }
  }
  $httpProvider.interceptors.push('AuthInterceptor');
}]);

