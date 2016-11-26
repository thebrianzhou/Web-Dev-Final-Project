var mp4Services = angular.module('mp4Services', []);
var baseUrl = "http://localhost:8000";

mp4Services.factory('Users', function($http, $window) {
    return {
        get : function() {
            return $http.get(baseUrl+'/api/users');
        },
        getByID : function(id) {
            return $http.get(baseUrl+'/api/users/' + id)
        },
        put : function(data, id) {
            return $http.put(baseUrl+'/api/users/' + id, data);
        }
    }
});

mp4Services.factory('Chefs', function($http, $window) {
    return {
        get : function() {
            return $http.get(baseUrl+'/api/chefs');
        },
        getByID : function(id) {
            return $http.get(baseUrl+'/api/chefs/' + id)
        },
        put : function(data, id) {
            return $http.put(baseUrl+'/api/chefs/' + id, data);
        }
    }
});

mp4Services.factory('Requests', function($http, $window) {
    return {
        get : function() {
            return $http.get(baseUrl+'/api/requests');
        },
        getByID : function(id) {
            return $http.get(baseUrl+'/api/requests/' + id)
        },
        getForUser : function(userID) {
            return $http.get(baseUrl+'/api/requests?where={"assignedUser": "'+ userID + '"}');
        },
        getForChef : function(chefID) {
            return $http.get(baseUrl+'/api/requests?where={"assignedChef": "'+ chefID + '"}');
        }
    }
});
