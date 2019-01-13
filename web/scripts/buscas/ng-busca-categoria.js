app.controller('BuscaCategoriaCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    var url = url_principal + "api/categoria";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.categorias = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = url_principal + "cadastro-categoria";
    }

    $scope.alterar = function(categoria){
        window.location.href = url_principal + "alterar-categoria/" + categoria.id; 
    }

    $scope.excluir = function(categoria){
        httpService.deletehttp(url + "/" + categoria.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.categorias = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

}]);