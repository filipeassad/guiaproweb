app.controller('CadastroTipoAtendimentoCtrl',[
    '$scope', 
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService,
        $rootScope){

    $scope.tipoAtendimento = {};
    $scope.tiposAtendimento = [];    
    $scope.podeAlterar = false;
    var url = "http://localhost:3000/api/tipoatendimento";    

    $scope.cadastrar = function(){
       
        httpService.posthttp(url, $scope.tipoAtendimento)
            .then(function mySuccess(response) {
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.tipoAtendimento = {};               
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });

    }

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.tipoAtendimento.id, $scope.tipoAtendimento)
            .then(function mySuccess(response) {
            if(response.data.success == true){
                $rootScope.alertaSucesso(response.data.message);
                $scope.tipoAtendimento = {};               
            }
            else
                $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }
}]);