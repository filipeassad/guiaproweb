app.controller('LoginCtrl',[
    '$scope',
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService, 
        $rootScope){

        var url = "http://localhost:3000/api/login";
        $scope.usuario = {};

        $scope.logar = function(){

            httpService.posthttp(url, $scope.usuario)
            .then(function mySuccess(response) {                
                if(response.data.success == true){
                    document.cookie = "token="+response.data.token; 
                     window.location.href = "http://localhost:3000";    
                }
                else
                    alert("Usuário ou senha incorretos.");
            }, function myError(response) {
                alert("Problemas com o servidor.");
            });

        }

}]);