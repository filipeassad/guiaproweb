app.controller('BuscaCategoriaCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    var url = "http://localhost:3000/api/categoria";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.categorias = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = "http://localhost:3000/cadastro-categoria";
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