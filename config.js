angular.module("civapp", ["ngRoute"])
  .config(Router);

Router.$inject=["$routeProvider"];

function Router($routeProvider) {
  $routeProvider

  .when("/", {templateUrl: "/pages/home.html"})
  .when("/", {templateUrl: "/pages/pollfinder.html"})
  .otherwise({redirectTo: "/"});
}
