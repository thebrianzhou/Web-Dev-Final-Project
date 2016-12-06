

var app = angular.module('mp4', ['ngRoute', 'ngMaterial', 'ngMatTheme','ngAria', 'ngMessages', 'ngAnimate', 'mp4Controllers', 'mp4Services', 'angular-input-stars']);

angular.module('ngMatTheme', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('red');
});
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
  when('/userprofile/:id', {//Sergey
    templateUrl: 'partials/userprofile.html',
    controller: 'UserProfileController'
  }).
  when('/chefprofile/:id', {//Sergey
    templateUrl: 'partials/chefprofile.html',
    controller: 'ChefProfileController'
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
  when('/splashpage',{
    templateUrl: 'partials/splashpage.html',
    controller: 'SplashPageController'
  }).
  when('/signup',{
    templateUrl: 'partials/signup.html',
    controller: 'SignupController'
  }).
  otherwise({
    redirectTo: '/splashpage'
  });
}]);


