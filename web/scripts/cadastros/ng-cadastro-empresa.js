app.controller('CadastroEmpresaCtrl', [
    '$scope',
    'httpService', 
    '$rootScope',  
    function(
        $scope, 
        httpService,
        $rootScope){
    var url = "http://localhost:3000/api/empresa";
    $scope.empresa = {};

    $scope.cadastrar = function(){
        httpService.posthttp(url, $scope.empresa)
            .then(function mySuccess(response) {               
                $scope.empresa = {};
                retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }
    
    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.empresa.id, $scope.empresa)
            .then(function mySuccess(response) {               
                $scope.podeAlterar = false;
                $scope.empresa = {};                
                retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

    function retornoMensagem(retorno){
        if(retorno.success)
            $rootScope.alertaSucesso(retorno.message);
        else
            $rootScope.alertaErro(retorno.message);
    }

}]);