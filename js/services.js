// js/services/todos.js
angular.module('demoServices', [])

    // super simple service
    // each function returns a promise object 
    .factory('Users', function($http) {
        return {
            get : function(baseurl) {
                console.log(baseurl);
                return $http.get(baseurl+'/api/users');
            },
            post : function(baseurl, task) {
                return $http.post(baseurl+'/api/users', user);
            },
            delete : function(baseurl, id) {
                return $http.delete(baseurl+'/api/users/' + id);
            }
        }
    })
    .factory('CommonData', function(){
        var baseUrl = "";
        return{
            getUrl : function(){
                return baseUrl;
            },
            setUrl : function(url){
                baseUrl = url;
                 console.log("url set to "+ baseUrl);
                

            }
        }
    });