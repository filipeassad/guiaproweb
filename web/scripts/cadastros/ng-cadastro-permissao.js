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
    var url = "http://localhost:3000/api/permissao";    

    $scope.cadastrar = function(){
       
        httpService.posthttp(url, $scope.permissao)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.permissoes = response.data; 
                });
                $scope.permissao = {};               
                $rootScope.alertaSucesso("A Permissão foi cadastrada com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("A Permissão não foi cadastrada!");
        });

    }    

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.permissao.id, $scope.permissao)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.permissoes = response.data; 
                });
                $scope.podeAlterar = false;
                $scope.permissao = {};
                $rootScope.alertaSucesso("A Permissão foi alterada com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("A Permissão não foi alterado!");
        });
    }

}]);