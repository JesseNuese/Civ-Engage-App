angular.module("civapp", ["ngRoute"])
  .config(Router);

Router.$inject=["$routeProvider"];

function Router($routeProvider) {
  $routeProvider

  .when("/", {templateUrl: "views/home.html"})
  .when("/", {templateUrl: "views/pollfinder.html"})
  .otherwise({redirectTo: "/"});
}
