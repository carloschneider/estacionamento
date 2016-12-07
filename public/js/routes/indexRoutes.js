'use strict'
app.config(function($stateProvider,$locationProvider,$urlRouterProvider) {
    
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

});
