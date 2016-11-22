var civility = angular.module('civApp', ['ngRoute'])
    .config(Router);

Router.$inject = ['$routeProvider'];

function Router($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'civController as civ'
        })
        .when('/home', {
            templateUrl: '../views/home.html',
            controller: 'civController as civ'
        })
        .when('/pollfind', {
            templateUrl: '../views/pollfind.html',
            controller: 'civController as civ'
        })
        .when('/repfind', {
            templateUrl: '../views/repfind.html',
            controller: 'civController as civ'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'controller.login as login'
        })
        .when('/register', {
            templateUrl: '../views/register.html',
            controller: 'civController as civ'
        })
        .otherwise({
            redirectTo: '/home'
        });
};
