//simple factory loading data from data.json file
angular.module('newApp').factory('dataFactory', function($http) {
       
    function getJSON() {
        return $http.get('data/data.json');
    }
    
    return {
        getJSON: getJSON
    }
    
});