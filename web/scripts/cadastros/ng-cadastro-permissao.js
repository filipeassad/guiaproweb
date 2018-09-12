app.controller('CadastroPermissaoCtrl', [ 
    '$scope',
    'httpService',
    '$rootScope',
    function(
        $scope, 
        httpService,
        $rootScope){

    $scope.permissao = {};
    $scope.permissoes = [];    
    $scope.podeAlterar = false;
    var url = url_principal + "api/permissao";    

    $scope.cadastrar = function(){
       
        httpService.posthttp(url, $scope.permissao)
            .then(function mySuccess(response) {
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.permissao = {};                  
                }
                else
                    $rootScope.alertaAtencao(response.data.message);                   
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });

    }    

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.permissao.id, $scope.permissao)
            .then(function mySuccess(response) {
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.permissao = {};                  
                }
                else
                    $rootScope.alertaAtencao(response.data.message);  
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

}]);