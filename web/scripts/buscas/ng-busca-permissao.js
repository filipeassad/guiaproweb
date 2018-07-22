app.controller('BuscaPermissaoCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    var url = "http://localhost:3000/api/permissao";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.permissoes = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = "http://localhost:3000/cadastro-permissao";
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