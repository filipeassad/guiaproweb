app.controller('CadastroTipoPerfilCtrl', [
    '$scope',
    'httpService',
    '$rootScope', 
function(
    $scope, 
    httpService, 
    $rootScope){

    $scope.tipoperfil = {};
    $scope.tiposperfil = [];    
    $scope.podeAlterar = false;
    var url = "http://localhost:3000/api/tipoperfil";      
    
    $scope.cadastrar = function(){   
        httpService.posthttp(url, $scope.tipoperfil)
            .then(function mySuccess(response) {
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.tipoperfil = {};
                }
                else
                    $rootScope.alertaAtencao(response.data.message); 
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    } 

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.tipoperfil.id, $scope.tipoperfil)
            .then(function mySuccess(response) {
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.tipoperfil = {};
                }
                else
                    $rootScope.alertaAtencao(response.data.message); 
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

}]);