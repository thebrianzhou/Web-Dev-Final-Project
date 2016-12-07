var mp4Controllers = angular.module('mp4Controllers', []);
const months = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

mp4Controllers.controller('SplashPageController', ['$scope', '$location', function($scope, $location)
{
  $scope.displayText = "Hello World";
  $scope.cheflogin= function()
  {
    //console.log("chef login function");
    var path = '/cheflogin';
    $location.path(path);
  };

  $scope.userlogin = function()
  {
    //console.log("user login function");
    var path = '/userlogin';
    $location.path(path);
  };
}])

//Brian
mp4Controllers.controller('UserLoginController', ['$scope', '$location', 'authentication', function($scope, $location, authentication) {
    $scope.displayText = "Hello World";
    $scope.email = "";
    $scope.password = "";
    $scope.name = "";
    $scope.profile_pic = "";
    $scope.location = [];
    $scope.password = "";
    $scope.incorrect = false;
    $scope.userlogin = function()
    {
        //console.log("inside login function");
        if(typeof $scope.email === 'undefined' || $scope.email == ""
        || typeof $scope.password === 'undefined' || $scope.password == "")
            return;
        //console.log($scope.email);
        authentication.userlogin({email : $scope.email, password : $scope.password}).success(function(data) {
            authentication.saveToken(data.token);
            //console.log(data);
            //console.log("success!");
            $location.path('/chefgrid/' + authentication.currentUser()._id);
        }).error(function(err){
            //console.log(err);
            $scope.password = "";
            $scope.displayText = "Incorrect Email or Password";
            $scope.incorrect = true;
        });
    }

    $scope.submitUser = function()
    {
        //console.log("inside submit user");
        if(typeof $scope.name === 'undefined' || $scope.name==""
        || typeof $scope.email === 'undefined' || $scope.email==""
        || typeof $scope.location === 'undefined' || $scope.location.length==0
        || typeof $scope.password === 'undefined' || $scope.password =="")
                return;
        console.log($scope.name);
        console.log($scope.email);
        console.log($scope.profile_pic);
        console.log($scope.location);

        /*BRIAN DOES INSERT CODE HERE FOR USERS*/
    }

}]);

mp4Controllers.controller('ChefLoginController', ['$scope', '$location', 'authentication', function($scope, $location, authentication){
    $scope.displayText = "Hello World";
    $scope.email = "";
    $scope.password = "";
    $scope.name = "";
    $scope.profile_pic = "";
    $scope.location = [];
    $scope.cuisines = [];
    $scope.description = "";
    $scope.carousel = [];
    $scope.password = "";
    $scope.incorrect = false;
    $scope.cheflogin = function()
    {
        //console.log("inside cheflogin function");
        if(typeof $scope.email === 'undefined' || $scope.email == ""
        || typeof $scope.password === 'undefined' || $scope.password == "")
            return;
        //console.log($scope.email);
        authentication.cheflogin({email : $scope.email, password : $scope.password}).success(function(data) {
            authentication.saveToken(data.token);
           // console.log(data);
           // console.log("success!");
            $location.path('/chefrequests/');
        }).error(function(err){
            //console.log(err);
            $scope.password = "";
            $scope.displayText = "Incorrect Email or Password";
            $scope.incorrect = true;
        });
    }

    $scope.submitchef = function()
    {
        console.log("inside submit chef");
        if(typeof $scope.name === 'undefined' || $scope.name==""
        || typeof $scope.email === 'undefined' || $scope.email==""
        || typeof $scope.location === 'undefined' || $scope.location.length==0
        || typeof $scope.password === 'undefined' || $scope.password =="")
                return;
        console.log($scope.name);
        console.log($scope.email);
        console.log($scope.profile_pic);
        console.log($scope.location);

        /*BRIAN DOES INSERT CODE HERE FOR USERS*/
    }
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
      $scope.user = user;
    }
  };
  
  
}]);
//Sergey
mp4Controllers.controller('UserProfileController', ['$scope', '$routeParams', 'Users', 'authentication', function($scope, $routeParams, Users, authentication) {
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'User')
        $scope.userID = $scope.curUser._id;
    
    Users.getByID($scope.userID).success(function(data) {
        $scope.user = data.data;

        $(".md-card-image").error(function () { 
            $(this).hide(); 
        });
    }).error(function(data) {
        $("md-card").hide();
    });
}]);
//Sergey
mp4Controllers.controller('ChefProfileController', ['$scope', '$routeParams', 'Chefs', 'authentication', function($scope, $routeParams, Chefs, authentication) {
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'Chef')
        $scope.chefID = $scope.curUser._id;
    
    Chefs.getByID($scope.chefID).success(function(data) {
        $scope.chef = data.data; 
                    
        $(".md-card-image").error(function () { 
            $(this).hide(); 
        });
    }).error(function(data) {
        $("md-card").hide();
    });
}]);
//Sergey
mp4Controllers.controller('EditUserController', ['$scope', '$routeParams', 'Users', 'authentication', function($scope, $routeParams, Users, authentication) {
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'User')
        $scope.userID = $scope.curUser._id;
    
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
mp4Controllers.controller('EditChefController', ['$scope', '$routeParams', 'Chefs', 'authentication', function($scope, $routeParams, Chefs, authentication) {
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'Chef')
        $scope.chefID = $scope.curUser._id;
    
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
mp4Controllers.controller('UserRequestsController', ['$scope', '$routeParams', 'Requests', 'Chefs', '$location', '$mdDialog', 'authentication', function($scope, $routeParams, Requests, Chefs, $location, $mdDialog, authentication) {
    var addChefToRequest = function(request) {
        Chefs.getByID(request.assignedChef).success(function(data) {
            request.chef = data.data; 
                        
            $(".md-card-image").error(function () { 
                $(this).hide(); 
            });
        });
    };
    
    var reloadRequests = function() {
        Requests.getFutureForUser($scope.userID).success(function(data) {
            $scope.futureRequests = data.data; 
        
            for (var i = 0; i < $scope.futureRequests.length; i++)
            {
                addChefToRequest($scope.futureRequests[i]);  
                var date = new Date($scope.futureRequests[i].date);
                $scope.futureRequests[i].dateString = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
            }
        });
        Requests.getCompletedForUser($scope.userID).success(function(data) {
            $scope.completedRequests = data.data; 
        
            for (var i = 0; i < $scope.completedRequests.length; i++)
            {
                addChefToRequest($scope.completedRequests[i]);  
                var date = new Date($scope.completedRequests[i].date);
                $scope.completedRequests[i].dateString = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
            }
        });
    }
    
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'User')
        $scope.userID = $scope.curUser._id;
    reloadRequests();
    
    $scope.cancelRequest = function(request) {
        Requests.delete(request._id).success(function(data) {
           reloadRequests();                                  
        });
    }
    
    $scope.markCompleted = function(request) {
        request.status = 'completed';
        Requests.put(request, request._id).success(function(data) { 
            reloadRequests();
        });
    }
    
    $scope.markPending = function(request) {
        request.status = 'pending';
        Requests.put(request, request._id).success(function(data) { 
            reloadRequests();
        });
    }
    
    $scope.addReview = function(ev, userID, chef) {
    $mdDialog.show({
      controller: DialogController,
      controllerAs: 'DialogCont',
      templateUrl: '../../partials/addreview.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        userID: userID,
        chef: chef
      },
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    
    function DialogController($scope, $mdDialog, userID, chef, Chefs) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.userID = userID;
      $scope.chef = chef;
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
        
        $scope.DialogCont.rating = 3;
        $scope.review = "";
        
        $scope.submit = function() {
            var newReview = {assignedUser: $scope.userID, rating: $scope.DialogCont.rating, review: $scope.review};
            $scope.chef.reviews.push(newReview);
            Chefs.put($scope.chef, $scope.chef._id).success(function(data) {
                $scope.hide(); 
            });
        }
    }
  };
}]);
//Sergey
mp4Controllers.controller('ChefRequestsController', ['$scope', '$routeParams', 'Requests', 'Users', 'authentication', function($scope, $routeParams, Requests, Users, authentication) {
    var addUserToRequest = function(request) {
        Users.getByID(request.assignedUser).success(function(data) {
            request.user = data.data; 
            
            $(".md-card-image").error(function () { 
                $(this).hide(); 
            });
        });
    };
    
    var reloadRequests = function() {
        Requests.getPendingForChef($scope.chefID).success(function(data) {
            $scope.pendingRequests = data.data; 
        
            for (var i = 0; i < $scope.pendingRequests.length; i++)
            {
                addUserToRequest($scope.pendingRequests[i]);
                var date = new Date($scope.pendingRequests[i].date);
                $scope.pendingRequests[i].dateString = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
            }
        });
    
        Requests.getAcceptedForChef($scope.chefID).success(function(data) {
            $scope.acceptedRequests = data.data; 
        
            for (var i = 0; i < $scope.acceptedRequests.length; i++)
            {
                addUserToRequest($scope.acceptedRequests[i]);
                var date = new Date($scope.acceptedRequests[i].date);
                $scope.acceptedRequests[i].dateString = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
            }
        });
    }
    
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'Chef')
        $scope.chefID = $scope.curUser._id;
    reloadRequests();
    
    $scope.acceptRequest = function(request) {
        request.status = 'accepted';
        Requests.put(request, request._id).success(function(data) { 
            reloadRequests();
        });
    }
    
    $scope.rejectRequest = function(request) {
        Requests.delete(request._id).success(function(data) { 
            reloadRequests();
        });
    }
    
    $scope.markPending = function(request) {
        request.status = 'pending';
        Requests.put(request, request._id).success(function(data) { 
            reloadRequests();
        });
    }
}]);
