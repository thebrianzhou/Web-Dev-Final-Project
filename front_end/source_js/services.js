var mp4Services = angular.module('mp4Services', []);
var baseUrl = "http://fa16-cs498rk-085.cs.illinois.edu:8000";

mp4Services.factory('Users', function($http, $window, authentication) {
    return {
        get : function() {
            return $http.get(baseUrl+'/api/users');
        },
        getByID : function(id) {
            return $http.get(baseUrl+'/api/users/' + id,{
                headers:{
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        },
        post : function(user){
           return $http.post('/api/userlogin', user).success(function(data){
            authentication.saveToken(data.token);
        });
       },
       put : function(data, id) {
        return $http.put(baseUrl+'/api/users/' + id, data);
    }
}
});

mp4Services.factory('Chefs', function($http, $window, authentication) {
    return {
        get : function() {
            return $http.get(baseUrl+'/api/chefs');
        },
        getByID : function(id) {
            return $http.get(baseUrl+'/api/chefs/' + id,{
                headers:{
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        },
        post : function(chef){
           return $http.post('/api/chefs', chef).success(function(data){
            authentication.saveToken(data.token);
        });
       },
       put : function(data, id) {
        return $http.put(baseUrl+'/api/chefs/' + id, data);
    }
}
});

mp4Services.factory('authentication', function($http, $window){
        var saveToken = function (token) {
          $window.localStorage['mean-token'] = token;
      };

      var getToken = function () {
          return $window.localStorage['mean-token'];
      };

      var isLoggedIn = function() {
          var token = getToken();
          var payload;

          if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name,
          _id : payload._id,
          type : payload.type
      };
    }
    };
    var cheflogin = function(chef) {
        return $http.post(baseUrl + '/api/cheflogin', chef).success(function(data) {
            saveToken(data.token);
        });
    };
    var userlogin = function(user) {
        return $http.post(baseUrl + '/api/userlogin', user);
    };

    var logout = function() {
        $window.localStorage.removeItem('mean-token');
    };

    return {
        currentUser : currentUser,
        saveToken : saveToken,
        getToken : getToken,
        isLoggedIn : isLoggedIn,
        userlogin : userlogin,
        cheflogin : cheflogin,
        logout : logout
    };
});

mp4Services.factory('Requests', function($http, $window) {
    return {
        get : function() {
            return $http.get(baseUrl+'/api/requests');
        },
        getByID : function(id) {
            return $http.get(baseUrl+'/api/requests/' + id)
        },
        getFutureForUser : function(userID) {
            return $http.get(baseUrl+'/api/requests?where={"assignedUser": "'+ userID + '", "status": {$ne: "completed"}}');
        },
        getCompletedForUser : function(userID) {
            return $http.get(baseUrl+'/api/requests?where={"assignedUser": "'+ userID + '", "status": "completed"}');
        },
        getPendingForChef : function(chefID) {
            return $http.get(baseUrl+'/api/requests?where={"assignedChef": "'+ chefID + '", "status": "pending"}');
        },
        getAcceptedForChef : function(chefID) {
            return $http.get(baseUrl+'/api/requests?where={"assignedChef": "'+ chefID + '", "status": "accepted"}');
        },
        put : function(data, id) {
            return $http.put(baseUrl+'/api/requests/' + id, data);
        },
        delete : function(id) {
            return $http.delete(baseUrl+'/api/requests/' + id);
        }
    }
});

