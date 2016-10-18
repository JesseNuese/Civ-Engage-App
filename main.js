angular.module('civApp', ['ngRoute', ])
  .config(Router);

Router.$inject=['$routeProvider'];

function Router($routeProvider) {
  $routeProvider

  .when('/home', {templateUrl: '/views/home.html'})
  .when('/pollfinder', {templateUrl: '/views/pollfind.html'})
  .otherwise({redirectTo: '/home'});
}
