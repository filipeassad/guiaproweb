app.service('httpService', function($http) {

    this.gethttp = function(url, param){
        return $http({ method: 'GET', url: url, param: param });            
    };

    this.posthttp = function(url, data){
        return $http({ method: 'POST', url: url, data: data });                
    };

    this.puthttp = function(url, data){
        return $http({ method: 'PUT', url: url, data: data }); 
    };

    this.deletehttp = function(url){
        return $http({ method: 'DELETE', url: url }); 
    };

    this.posthttpArquivo = function(url, data){
        return $http({ method: 'POST', url: url, data: data, headers: { 'Content-Type': undefined}, transformRequest: angular.identity});                
    };

});