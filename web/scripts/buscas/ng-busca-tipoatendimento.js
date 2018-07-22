app.controller('BuscaTipoAtendimentoCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    var url = "http://localhost:3000/api/tipoatendimento";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.tiposAtendimento = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = "http://localhost:3000/cadastro-tipoatendimento";
    }

    $scope.excluir = function(tipoAtendimento){
        httpService.deletehttp(url + "/" + tipoAtendimento.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.tiposAtendimento = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

}]);