app.controller('BuscaSituacaoCtrl', [
    '$scope',
    'httpService', 
    function(
        $scope, 
        httpService){

        var url = "http://localhost:3000/api/situacao";

        httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.situacoes = response.data; 
        });

        $scope.cadastrar = function(){
            window.location.href = "http://localhost:3000/cadastro-situacao";
        }

        $scope.excluir = function(situacao){
            httpService.deletehttp(url + "/" + situacao.id)
            .then(function mySuccess(response) {                
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.situacoes = response.data; 
                });
            }, function myError(response) {
                alert("Erro do servidor."); 
            });
        };      
    
}]);