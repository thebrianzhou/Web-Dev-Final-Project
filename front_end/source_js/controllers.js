var mp4Controllers = angular.module('mp4Controllers', []);

var setFlexSize = function() {
    var correctSize = Math.max(0, ($(window).width() - 1400) / 2);
    $(".flex-size").css("width", correctSize);
}

var fixTabs = function() {
    $("md-tabs-wrapper").wrap("<div class='content'></div>");
    $(".content").wrap("<div class='full-width'></div>");
}

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
            $location.path('/chefgrid/');
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
            $location.path('/chefgrid/'); //change once sree gets his shit together
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

mp4Controllers.controller('AddRequestController', ['$scope', '$routeParams', 'Users', 'Chefs', 'Requests', 'authentication', '$location', function($scope, $routeParams, Users, Chefs, Requests, authentication, $location) {
    $scope.budget = 0;
    $scope.chefname = "";
    $scope.payment = 0;
    $scope.date = new Date();
    $scope.cuisine = "";
    $scope.description = "";
    $scope.err=0;
    $scope.errormessage="";
    console.log("hi");
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'User')
        $scope.userID = $scope.curUser._id;
    
    Users.getByID($scope.userID).success(function(data) {
        $scope.user = data.data; 
    }).error(function(data) {
        $("md-card").hide();
    });
    $scope.chefid = $routeParams.id;
    Chefs.getByID($scope.chefid).success(function(data){
      console.log(data);
      $scope.chef = data.data;
      $scope.chefname = $scope.chef.name;
      $scope.cuisines = $scope.chef.cuisines;
    }).error(function(err){
      console.log(err);
    });
    
    $scope.submit = function() {
        var newRequest = {assignedChef : $scope.chefid, assignedUser : $scope.userID, date : $scope.date, cuisine : $scope.cuisine, budget : $scope.budget, payment : $scope.payment, description : $scope.description};
        console.log(newRequest);
        Requests.post(newRequest).success(function(data) {
            $scope.err = 0;
            $location.path('/userrequests/');
        })
        .error(function(err){
            $scope.err = 1;
            $scope.errormessage = "Request could not be submitted!";
            console.log(err);
        });
    };
    
    $scope.goToChefs = function() {
        $location.path("/chefgrid/");
    }
    
    $scope.goToProfile = function() {
        $location.path("/userprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/userrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
}]);

//Sree
mp4Controllers.controller('ChefGridController', ['$scope', 'Chefs' , 'Users', '$mdDialog','$mdMedia', '$location', 'authentication',function($scope, Chefs, Users, $mdDialog, $mdMedia, $location, authentication) {
  $scope.data = "";
  $scope.displayText = "";
   $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John'];//, 'Luis', 'Kate', 'Max','Fabio1', 'Leonardo1', 'Thomas1', 'Gabriele1','Fabio2', 'Leonardo2', 'Thomas2', 'Gabriele2'];
   Chefs.get().success(function(data){
    $scope.chefs = data.data;
    //console.log($scope.chefs[0]);
    //console.log($scope.chefs[0].reviews);
    })
   .error(function(err){
      console.log('Error' + err);
   })

   $scope.$watch(function() { return $mdMedia('xs'); }, function() {
    if($mdMedia('xs') == true)
      $scope.breakpoint = "xs";
    });
   $scope.$watch(function() { return $mdMedia('sm'); }, function() {
    if($mdMedia('sm') == true)
      $scope.breakpoint = "sm";
    });
   $scope.$watch(function() { return $mdMedia('md'); }, function() {
    if($mdMedia('md') == true)
      $scope.breakpoint = "md";
    });
   $scope.$watch(function() { return $mdMedia('lg'); }, function() {
    if($mdMedia('lg') == true)
      $scope.breakpoint = "lg";
    });
   $scope.$watch(function() { return $mdMedia('xl'); }, function() {
    if($mdMedia('xl') == true)
      $scope.breakpoint = "xl";
    });
    $scope.count = 0;
    Users.getByID(authentication.currentUser()._id).success(function(data) {
      console.log(data);
      $scope.user = data.data;
      console.log($scope.user.location);
    })
    .error(function(err){
      console.log(err);
    });
    
    $scope.myFilter = function(chef){
      for(var ctr=0;ctr<$scope.user.location.length; ctr++){
        for(var ctr2=0;ctr2<chef.location.length; ctr2++){
          if(chef.location[ctr2] === $scope.user.location[ctr]){
            return true;
          }
        }
      }
      return false;
    }
    

   $scope.showDialog = function(ev,ind,chef) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../../partials/chef_modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: {
        chef: chef
    },
    clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
  })
    .then(function() {
      $("#sliding-carousel").slick('unslick');
  });

    function DialogController($scope, $mdDialog,chef) {
      $scope.chef = chef;
      console.log(chef);
     
      $scope.fruits = ["orange","quince","plum","apple","peach","banana","apricot","grapes","pomegranate","blueberries"];
      
      
      $scope.getTotalRating = function(){
        var inc = 0;
        for(var ctr = 0 ;ctr < $scope.chef.reviews.length; ctr++){
          inc+=$scope.chef.reviews[ctr].rating;
        }
        return inc/$scope.chef.reviews.length;
      };
      $scope.rating = $scope.getTotalRating();
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
      $scope.usernames = {};
      $scope.getUserName = function(_id,index){
         Users.getByID(_id).success(function(data) {
            console.log(data);
            $scope.usernames[index]= data.data.name;
          })
          .error(function(err){
            console.log(err);
          });
          
      }
      $scope.noreviews = ($scope.chef.reviews.length === 0);
      for(var ctr =0;ctr < $scope.chef.reviews.length; ctr++){
        $scope.getUserName($scope.chef.reviews[ctr].assignedUser,ctr);
      }
     
      
      $scope.slick_init = function(){
        //console.log("initializing");
        setTimeout($scope.initSlick,100);
                //console.log("initialized");
      }; 
      
      $scope.closeDialog = function(){
        $mdDialog.hide();
      }
    }; 
    
  }
   
    $scope.$on('$viewContentLoaded', function(){
        setFlexSize();
    });
   
    $scope.goToChefs = function() {
        $location.path("/chefgrid/");
    }
    
    $scope.goToProfile = function() {
        $location.path("/userprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/userrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
}]);
//Sergey
mp4Controllers.controller('UserProfileController', ['$scope', '$routeParams', 'Users', 'authentication', '$location', function($scope, $routeParams, Users, authentication, $location) {
    $scope.curUser = authentication.currentUser();
    if ($scope.curUser.type == 'User')
        $scope.userID = $scope.curUser._id;
    
    $scope.curPage = "profile";
    
    Users.getByID($scope.userID).success(function(data) {
        $scope.user = data.data;

        $(".md-card-image").error(function () { 
            $(this).hide(); 
        });
    }).error(function(data) {
        $("md-card").hide();
    });
    
    $scope.$on('$viewContentLoaded', function(){
        setFlexSize();
    });
    
    $scope.editProfile = function() {
        $location.path("/edituser/");
    }
    
    $scope.goToChefs = function() {
        $location.path("/chefgrid/");
    }
    
    $scope.goToProfile = function() {
        $location.path("/userprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/userrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
}]);
//Sergey
mp4Controllers.controller('ChefProfileController', ['$scope', '$routeParams', 'Chefs', 'authentication', '$location', function($scope, $routeParams, Chefs, authentication, $location) {
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
    
    $scope.$on('$viewContentLoaded', function(){
        setFlexSize();
    });
    
    $scope.editProfile = function() {
        $location.path("/editchef/");
    }
    
    $scope.goToProfile = function() {
        $location.path("/chefprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/chefrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
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
    
    $scope.$on('$viewContentLoaded', function(){
        setFlexSize();
    });
    
    $scope.submit = function() {
        Users.put($scope.user, $scope.userID).success(function(data) {
            $location.path('/userprofile/');
        });
    };
    
    $scope.goToChefs = function() {
        $location.path("/chefgrid/");
    }
    
    $scope.goToProfile = function() {
        $location.path("/userprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/userrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
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
    
    $scope.$on('$viewContentLoaded', function(){
        setFlexSize();
    });
    
    $scope.submit = function() {
        Chefs.put($scope.chef, $scope.chefID).success(function(data) {
            $location.path('/chefprofile/');
        });
    };
    
    $scope.goToProfile = function() {
        $location.path("/chefprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/chefrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
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
        Requests.getPendingForUser($scope.userID).success(function(data) {
            $scope.pendingRequests = data.data; 

            for (var i = 0; i < $scope.pendingRequests.length; i++)
            {
                addChefToRequest($scope.pendingRequests[i]);  
                var date = new Date($scope.pendingRequests[i].date);
                $scope.pendingRequests[i].dateString = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
            }
        });
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
    
    $scope.$on('$viewContentLoaded', function(){
        setFlexSize();
        fixTabs();
    });
    
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
            var newReview = {assignedUser: $scope.curUser.name, rating: $scope.DialogCont.rating, review: $scope.review};
            $scope.chef.reviews.push(newReview);
            Chefs.put($scope.chef, $scope.chef._id).success(function(data) {
                $scope.hide(); 
            });
        }
        
        $scope.closeDialog = function() {
            $mdDialog.hide();
        }
    }
  };
    
    $scope.goToChefs = function() {
        $location.path("/chefgrid/");
    }
    
    $scope.goToProfile = function() {
        $location.path("/userprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/userrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
}]);
//Sergey
mp4Controllers.controller('ChefRequestsController', ['$scope', '$routeParams', 'Requests', 'Users', 'authentication', '$location', function($scope, $routeParams, Requests, Users, authentication, $location) {
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
    
    $scope.$on('$viewContentLoaded', function(){
        setFlexSize();
        fixTabs();
    });
    
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
    
    $scope.goToProfile = function() {
        $location.path("/chefprofile/");
    }
    
    $scope.goToRequests = function() {
        $location.path("/chefrequests/");
    }
    
    $scope.logOut = function() {
        authentication.logout();
        $location.path("/splashpage/");
    }
}]);
