'use strict'
app.config(function($routeProvider,$locationProvider) {
    $routeProvider

    .when("/", {
        templateUrl : "paginas/login/index.html",
        authorize: false,
        controller: 'UserCtrl'
    })

    .when("/painel", {
        templateUrl: "paginas/painel/index.html",
        authorize: true
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

})