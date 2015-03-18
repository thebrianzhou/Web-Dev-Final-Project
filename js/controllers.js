var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('UserListController', ['$scope', '$http', 'Users', 'CommonData', '$window' , function($scope, $http,  Users, CommonData, $window) {
  
  var baseUrl = $window.sessionStorage.baseurl;

  Users.get(baseUrl).success(function(data){
    $scope.users = data;
  });


}]);

demoControllers.controller('SettingsController', ['$scope', 'CommonData' , '$window' , function($scope, CommonData, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    //CommonData.setUrl($scope.url);
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set"

  };

}]);
