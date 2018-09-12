app.controller('BuscaPermissaoCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    var url = url_principal + "api/permissao";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.permissoes = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = url_principal + "cadastro-permissao";
    }

    $scope.excluir = function(permissao){
        httpService.deletehttp(url + "/" + permissao.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.permissoes = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

}]);