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
mp4Controllers.controller('ChefGridController', ['$scope', 'Chefs' ,'$mdDialog', function($scope, CommonData, $mdDialog) {
  $scope.data = "";
   $scope.displayText = "";
   $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John'];//, 'Luis', 'Kate', 'Max','Fabio1', 'Leonardo1', 'Thomas1', 'Gabriele1','Fabio2', 'Leonardo2', 'Thomas2', 'Gabriele2'];
  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };
  /*$scope.showDialog = function(ev,ind) {
    console.log(ind);
    $mdDialog.show({
      controller: ['$scope','$mdDialog','user',function ($scope2, $mdDialog, user) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.user = user;
        $scope.yo="hi";
        console.log(user);
        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }],
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        user: "hi"
      },
      clickOutsideToClose: true
    });
    
    
  };*/
  
  $scope.showAdvanced = function(ev,ind) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../../partials/trial.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        user: $scope.users[ind]
      },
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    
    function DialogController($scope, $mdDialog,user) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.user = user;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  };
  
  
}]);
//Sergey
mp4Controllers.controller('UserProfileController', ['$scope', '$routeParams', 'Users', function($scope, $routeParams, Users) {
    $scope.userID = $routeParams.id;
    
    Users.getByID($scope.userID).success(function(data) {
        $scope.user = data.data; 
    });
}]);
//Sergey
mp4Controllers.controller('ChefProfileController', ['$scope', '$routeParams', 'Chefs', function($scope, $routeParams, Chefs) {
    $scope.chefID = $routeParams.id;
    
    Chefs.getByID($scope.chefID).success(function(data) {
        $scope.chef = data.data; 
    });
}]);
//Sergey
mp4Controllers.controller('EditUserController', ['$scope', '$routeParams', 'Users', function($scope, $routeParams, Users) {
    $scope.userID = $routeParams.id;
    
    Users.getByID($scope.userID).success(function(data) {
        $scope.user = data.data; 
    });
    
    $scope.submit = function() {
        Users.put($scope.user, $scope.userID).success(function(data) {
            console.log(data.data); 
        });
    };
}]);
//Sergey
mp4Controllers.controller('EditChefController', ['$scope', '$routeParams', 'Chefs', function($scope, $routeParams, Chefs) {
    $scope.chefID = $routeParams.id;
    
    Chefs.getByID($scope.chefID).success(function(data) {
        $scope.chef = data.data; 
    });
    
    $scope.submit = function() {
        Chefs.put($scope.chef, $scope.chefID).success(function(data) {
            console.log(data.data); 
        });
    };
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
