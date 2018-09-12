app.controller('BuscaEmpresaCtrl', [
    '$scope',
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService, 
        $rootScope){


    var url = url_principal + "api/empresa";    

    httpService.gethttp(url, {})
    .then(function mySuccess(response) { 
        if(response.data != null)   
            $scope.empresas = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = url_principal + "cadastro-empresa";
    }

    $scope.excluir = function(empresa){
        httpService.deletehttp(url + "/" + empresa.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.empresas = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }
    

}]);