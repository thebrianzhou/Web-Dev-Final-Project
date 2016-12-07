

var app = angular.module('mp4', ['ngRoute', 'ngMaterial', 'ngMatTheme','ngAria', 'ngMessages', 'ngAnimate', 'mp4Controllers', 'mp4Services', 'angular-input-stars']);

angular.module('ngMatTheme', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('red');
});
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/userlogin', {//Brian
    templateUrl: 'partials/userlogin.html',
    controller: 'UserLoginController'
  }).
  when('/addrequest/:id', {//Brian
    templateUrl: 'partials/addrequest.html',
    controller: 'AddRequestController'
  }).
  when('/chefgrid/:id', {//Sree
    templateUrl: 'partials/chefgrid.html',
    controller: 'ChefGridController'
  }).
  when('/userprofile/', {//Sergey
    templateUrl: 'partials/userprofile.html',
    controller: 'UserProfileController'
  }).
  when('/chefprofile/', {//Sergey
    templateUrl: 'partials/chefprofile.html',
    controller: 'ChefProfileController'
  }).
  when('/edituser/', {//Sergey
    templateUrl: 'partials/edituser.html',
    controller: 'EditUserController'
  }).
  when('/editchef/', {//Sergey
    templateUrl: 'partials/editchef.html',
    controller: 'EditChefController'
  }).
  when('/userrequests/', {//Sergey
    templateUrl: 'partials/userrequests.html',
    controller: 'UserRequestsController'
  }).
  when('/chefrequests/', {//Sergey
    templateUrl: 'partials/chefrequests.html',
    controller: 'ChefRequestsController'
  }).
  when('/splashpage',{
    templateUrl: 'partials/splashpage.html',
    controller: 'SplashPageController'
  }).
  when('/cheflogin',{
    templateUrl: 'partials/cheflogin.html',
    controller: 'ChefLoginController'
  }).
  otherwise({
    redirectTo: '/splashpage'
  });
}]);

/*app.run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication){
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if (($location.path() !== '/login' && $location.path() !== '/signup' && $location.path() !== '/splashpage') && !authentication.isLoggedIn()) {
        console.log("hey i'm walking here");
        $location.path('/splashpage');
      }
    });
}]);
}]);*/
