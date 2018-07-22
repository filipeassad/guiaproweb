app.controller('CadastroSituacaoCtrl', [
    '$scope',
    'httpService',
    '$rootScope',
    function(
        $scope, 
        httpService,
        $rootScope){

    $scope.situacao = {};
    $scope.situacoes = [];    
    $scope.podeAlterar = false;
    var url = "http://localhost:3000/api/situacao";    

    $scope.cadastrar = function(){
       
        httpService.posthttp(url, $scope.situacao)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.situacoes = response.data; 
                });
                $scope.situacao = {};
                $rootScope.alertaSucesso("A Situação foi cadastrada com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("A Situação não foi cadastrada!"); 
        });

    }    

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.situacao.id, $scope.situacao)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.situacoes = response.data; 
                });
                $scope.podeAlterar = false;
                $scope.situacao = {};
                $rootScope.alertaSucesso("A Situação foi alterada com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("A Situação não foi alterada!"); 
        });
    }
}]);