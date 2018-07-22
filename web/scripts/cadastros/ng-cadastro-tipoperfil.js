app.controller('CadastroTipoPerfilCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    $scope.tipoperfil = {};
    $scope.tiposperfil = [];    
    $scope.podeAlterar = false;
    var url = "http://localhost:3000/api/tipoperfil";      
    
    $scope.cadastrar = function(){   
        httpService.posthttp(url, $scope.tipoperfil)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.tiposperfil = response.data; 
                });
                $scope.tipoperfil = {};
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    } 

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.tipoperfil.id, $scope.tipoperfil)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.tiposperfil = response.data; 
                });
                $scope.podeAlterar = false;
                $scope.tipoperfil = {};
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

}]);