var mp4Controllers = angular.module('mp4Controllers', []);


//Brian
mp4Controllers.controller('LoginController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);
//Brian
mp4Controllers.controller('AddRequestController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);
//Sree
mp4Controllers.controller('ChefGridController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);
//Sergey
mp4Controllers.controller('EditUserController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.userID = $routeParams.id;
}]);
//Sergey
mp4Controllers.controller('EditChefController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.chefID = $routeParams.id;
}]);
//Sergey
mp4Controllers.controller('UserRequestsController', ['$scope', '$routeParams', 'Requests', 'Chefs', function($scope, $routeParams, Requests, Chefs) {
    $scope.userID = $routeParams.id;
    
    var addChefToRequest = function(request) {
        Chefs.getByID(request.assignedChef).success(function(data) {
            request.chef = data.data; 
        });
    };
    
    Requests.getForUser($scope.userID).success(function(data) {
        $scope.requests = data.data; 
        
        for (var i = 0; i < $scope.requests.length; i++)
        {
            addChefToRequest($scope.requests[i]);   
        }
    });
    
}]);
//Sergey
mp4Controllers.controller('ChefRequestsController', ['$scope', '$routeParams', 'Requests', 'Users', function($scope, $routeParams, Requests, Users) {
    $scope.chefID = $routeParams.id;
    
    var addUserToRequest = function(request) {
        Users.getByID(request.assignedUser).success(function(data) {
            request.user = data.data; 
        });
    };
    
    Requests.getForChef($scope.chefID).success(function(data) {
        $scope.requests = data.data; 
        
        for (var i = 0; i < $scope.requests.length; i++)
        {
            addUserToRequest($scope.requests[i]);
        }
    });
}]);