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
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.situacao = {};                 
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor."); 
        });

    }    

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.situacao.id, $scope.situacao)
            .then(function mySuccess(response) {                
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.situacao = {};                 
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor."); 
        });
    }
}]);