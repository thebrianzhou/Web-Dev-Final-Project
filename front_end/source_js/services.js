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
