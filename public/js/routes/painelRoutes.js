'use strict'

app.config(['$stateProvider','$locationProvider', '$urlRouterProvider' , function($stateProvider,$locationProvider, $urlRouterProvider) {

    $stateProvider    

    .state("painel.usuario", {
        url: '/usuario',
        templateUrl : "paginas/login/index.html",
        authorize: false,
        controller: 'UserCtrl'
    })
    

    $urlRouterProvider
    .otherwise('/');

    $locationProvider.html5Mode(true);
}])



