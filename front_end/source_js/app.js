var app = angular.module('mp4', ['ngRoute', 'ngMaterial', 'ngAria', 'ngMessages', 'ngAnimate', 'mp4Controllers', 'mp4Services']);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {//Brian
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  }).
  when('/addrequest/:id', {//Brian
    templateUrl: 'partials/addrequest.html',
    controller: 'AddRequestController'
  }).
  when('/chefgrid/:id', {//Sree
    templateUrl: 'partials/chefgrid.html',
    controller: 'ChefGridController'
  }).
  when('/edituser/:id', {//Sergey
    templateUrl: 'partials/edituser.html',
    controller: 'EditUserController'
  }).
  when('/editchef/:id', {//Sergey
    templateUrl: 'partials/editchef.html',
    controller: 'EditChefController'
  }).
  when('/userrequests/:id', {//Sergey
    templateUrl: 'partials/userrequests.html',
    controller: 'UserRequestsController'
  }).
  when('/chefrequests/:id', {//Sergey
    templateUrl: 'partials/chefrequests.html',
    controller: 'ChefRequestsController'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);
