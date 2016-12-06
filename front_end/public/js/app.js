var app=angular.module("mp4",["ngRoute","ngMaterial","ngMatTheme","ngAria","ngMessages","ngAnimate","mp4Controllers","mp4Services"]);angular.module("ngMatTheme",["ngMaterial"]).config(function($mdThemingProvider){$mdThemingProvider.theme("default").primaryPalette("orange").accentPalette("red")}),app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/login",{templateUrl:"partials/login.html",controller:"LoginController"}).when("/addrequest/:id",{templateUrl:"partials/addrequest.html",controller:"AddRequestController"}).when("/chefgrid/:id",{templateUrl:"partials/chefgrid.html",controller:"ChefGridController"}).when("/userprofile/:id",{templateUrl:"partials/userprofile.html",controller:"UserProfileController"}).when("/chefprofile/:id",{templateUrl:"partials/chefprofile.html",controller:"ChefProfileController"}).when("/edituser/:id",{templateUrl:"partials/edituser.html",controller:"EditUserController"}).when("/editchef/:id",{templateUrl:"partials/editchef.html",controller:"EditChefController"}).when("/userrequests/:id",{templateUrl:"partials/userrequests.html",controller:"UserRequestsController"}).when("/chefrequests/:id",{templateUrl:"partials/chefrequests.html",controller:"ChefRequestsController"}).when("/splashpage",{templateUrl:"partials/splashpage.html",controller:"SplashPageController"}).otherwise({redirectTo:"/login"})}]);