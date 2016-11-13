angular.module('civApp', ['ngRoute', 'ngAnimate'])
  .config(Router);

Router.$inject=['$routeProvider'];

function Router($routeProvider) {
  $routeProvider

  .when('/home', {templateUrl: '/views/home.html'})
  .when('/pollfinder', {templateUrl: '/views/pollfind.html'})
  .when('/repfinder', {templateUrl: '/views/repfind.html'})
  .otherwise({redirectTo: '/home'});
}
