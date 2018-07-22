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
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.tiposAtendimento = response.data; 
                });
                $scope.tipoAtendimento = {};
                $rootScope.alertaSucesso("O Tipo de Atendimento foi cadastrado com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("O Tipo de Atendimento não foi cadastrado!");
        });

    }

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.tipoAtendimento.id, $scope.tipoAtendimento)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.tiposAtendimento = response.data; 
                });
                $scope.podeAlterar = false;
                $scope.tipoAtendimento = {};
                $rootScope.alertaSucesso("O Tipo de Atendimento foi alterado com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("O Tipo de Atendimento não foi alterado!");
        });
    }
}]);