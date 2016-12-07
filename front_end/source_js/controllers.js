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
mp4Controllers.controller('UserLoginController', ['$scope', '$location', 'authentication', 'Users', function($scope, $location, authentication, Users) {
    $scope.email = "";
    $scope.password = "";
    $scope.name = "";
    $scope.profile_pic = "";
    $scope.location = [];
    $scope.password = "";
    $scope.incorrectL = false;
    $scope.incorrectS = false;
    $scope.userlogin = function()
    {
        authentication.userlogin({email : $scope.email, password : $scope.password}).success(function(data) {
            authentication.saveToken(data.token);
            $location.path('/chefgrid/' + authentication.currentUser()._id);
        }).error(function(err){
            $scope.password = "";
            $scope.incorrectLogin = "Incorrect Email or Password";
            $scope.incorrectL = true;

        });
    }

    $scope.submituser = function()
    {
        var newUser = {name: $scope.name, email: $scope.email, profile_pic: $scope.profile_pic, location: $scope.location, password: $scope.password};
        console.log(newUser);
        Users.post(newUser).success(function(data){
            $location.path('/chefgrid/' + authentication.currentUser()._id); //change once sree gets his shit together
        })
        .error(function(err) {
          $scope.incorrectS = true;
          $scope.incorrectSignup = "Error:" + err;
          console.log(err);
       });

    }

}]);

mp4Controllers.controller('ChefLoginController', ['$scope', '$location', 'authentication', 'Chefs', function($scope, $location, authentication, Chefs){
    $scope.email = "";
    $scope.password = "";
    $scope.name = "";
    $scope.profile_pic = "";
    $scope.location = [];
    $scope.cuisines = [];
    $scope.password = "";
    $scope.incorrectL = false;
    $scope.incorrectS = false;
    $scope.cheflogin = function()
    {
        authentication.cheflogin({email : $scope.email, password : $scope.password}).success(function(data) {
            authentication.saveToken(data.token);
            $location.path('/chefrequests/');
        }).error(function(err){
            $scope.password = "";
            $scope.incorrectLogin = "Incorrect Email or Password";
            $scope.incorrectL = true;

        });
    }

    $scope.submitchef = function()
    {
        var newChef = {name: $scope.name, email: $scope.email, profile_pic: $scope.profile_pic, cuisines: $scope.cuisines, description: $scope.description, carousel: $scope.carousel, location: $scope.location, password: $scope.password};
        Chefs.post(newChef).success(function(data){
            $location.path('/chefrequests/');
        })
        .error(function(err) {
          $scope.incorrectS = true;
          $scope.incorrectSignup = "Error:" + err;
       });
    }
}]);


//Brian
mp4Controllers.controller('AddRequestController', ['$scope', '$routeParams', 'Users', 'authentication', '$location', function($scope, $routeParams, Users, authentication, $location) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);
//Sree
mp4Controllers.controller('ChefGridController', ['$scope', 'Chefs' ,'$mdDialog','$mdPanel','$mdMedia', function($scope, CommonData, $mdDialog, $mdPanel, $mdMedia) {
  $scope.data = "";
   $scope.displayText = "";
   $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John'];//, 'Luis', 'Kate', 'Max','Fabio1', 'Leonardo1', 'Thomas1', 'Gabriele1','Fabio2', 'Leonardo2', 'Thomas2', 'Gabriele2'];
  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };
  $scope.searching=true;
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
  $scope.carData = [
  { src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg' },
  { src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg' },
  { src: 'https://www.travelexcellence.com/images/movil/La_Paz_Waterfall.jpg' },
  { src: 'http://lab.csschopper.com/placeholder/images/placeholder_image_logo.png' }
];


$scope.initSlick = function () {
          $(function () {
            // wait till load event fires so all resources are available
              $(document).ready(function(){
                console.log("got here!");
                $(".sliding-carousel").slick({
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  arrows: true
                });
              });
          });
      };

      //$scope.initSlick();

  $scope.$watch(function() { return $mdMedia('xs'); }, function() {
    if($mdMedia('xs') == true)
      $scope.breakpoint = "xs"
  });
  $scope.$watch(function() { return $mdMedia('sm'); }, function() {
    if($mdMedia('sm') == true)
      $scope.breakpoint = "sm"
  });
  $scope.$watch(function() { return $mdMedia('md'); }, function() {
    if($mdMedia('md') == true)
      $scope.breakpoint = "md"
  });
  $scope.$watch(function() { return $mdMedia('lg'); }, function() {
    if($mdMedia('lg') == true)
      $scope.breakpoint = "lg"
  });
  $scope.$watch(function() { return $mdMedia('xl'); }, function() {
    if($mdMedia('xl') == true)
      $scope.breakpoint = "xl"
  });
  
  
/*  $scope.Panel = function(ev,ind) {
    $mdPanel.show({
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
  };*/
  
  $scope.showDialog = function(ev,ind) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../../partials/chef_modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        user: $scope.users[ind]
      },
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function() {
      $("#sliding-carousel").slick('unslick');
    });
    
    function DialogController($scope, $mdDialog,user) {
      $scope.user = user;
      $scope.rating = 4;
      $scope.fruits = ["orange","quince","plum","apple","peach","banana","apricot","grapes","pomegranate","blueberries"];
      $scope.initSlick = function () {
         jQuery("#sliding-carousel").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            speed: 500,
            fade: true,
            cssEase: 'linear'
          });
          //jQuery("#sliding-carousel").css('opacity',"1");
      };

      
      $scope.slick_init = function(){
        console.log("initializing");
        setTimeout($scope.initSlick,500);
                console.log("initialized");
      }; 
      $scope.clic = function(){
                console.log("3 "+angular.element(document).find("md-card-title").css("color"));
      }
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
mp4Controllers.controller('EditUserController', ['$scope', '$routeParams', 'Users', 'authentication', '$location', function($scope, $routeParams, Users, authentication, $location) {
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'User')
        $scope.userID = $scope.curUser._id;
    
    Users.getByID($scope.userID).success(function(data) {
        $scope.user = data.data; 
    }).error(function(data) {
        $("md-card").hide();
    });
    
    $scope.submit = function() {
        Users.put($scope.user, $scope.userID).success(function(data) {
            $location.path('/userprofile/');
        });
    };
}]);
//Sergey
mp4Controllers.controller('EditChefController', ['$scope', '$routeParams', 'Chefs', 'authentication', '$location', function($scope, $routeParams, Chefs, authentication, $location) {
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'Chef')
        $scope.chefID = $scope.curUser._id;
    
    Chefs.getByID($scope.chefID).success(function(data) {
        $scope.chef = data.data; 
    }).error(function(data) {
        $("md-card").hide();
    });
    
    $scope.submit = function() {
        Chefs.put($scope.chef, $scope.chefID).success(function(data) {
            $location.path('/chefprofile/');
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
        }).error(function(data) {
            $("md-card").hide();
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
        }).error(function(data) {
            $("md-card").hide();
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
