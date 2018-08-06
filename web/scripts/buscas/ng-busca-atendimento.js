app.controller('BuscaAtendimentoCtrl', [
    '$scope',
    'httpService', 
function($scope, httpService){

    var url = "http://localhost:3000/api/atendimento";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.atendimentos = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = "http://localhost:3000/cadastro-atendimento";
    }

    $scope.excluir = function(atendimento){
        httpService.deletehttp(url + "/" + atendimento.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.atendimentos = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

}]);