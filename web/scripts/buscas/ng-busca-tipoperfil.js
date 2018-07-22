app.controller('BuscaTipoPerfilCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    var url = "http://localhost:3000/api/tipoperfil";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.tiposperfil = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = "http://localhost:3000/cadastro-tipoperfil";
    }

    $scope.excluir = function(tipoperfil){
        httpService.deletehttp(url + "/" + tipoperfil.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.tiposperfil = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }   

}]);