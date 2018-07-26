app.controller('BuscaCategoriaCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.enderecos = response.data; 
    });

    scope.cadastrar = function(){
        window.location.href = "http://localhost:3000/cadastro-endereco";
    }

    $scope.excluir = function(endereco){
        httpService.deletehttp(url + "/" + endereco.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.enderecos = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

}]);