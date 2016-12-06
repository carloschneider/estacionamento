'use strict'
var app = angular.module('app',['btford.socket-io','ngRoute','ngStorage','ngFlash'])
.factory('mySocket', function (socketFactory) {
	return socketFactory();
})

.run(function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.authorize) {
            if (!AuthService.getToken()) {
                event.preventDefault();
                $location.path('/');
                $rootScope.$evalAsync(function () {
                    $location.path('/');
                })
            }
        }
    });
});



// respiridona mg 2
// prometazina mg 25
