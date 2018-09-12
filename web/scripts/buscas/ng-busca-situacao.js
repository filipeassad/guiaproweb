app.controller('BuscaSituacaoCtrl', [
    '$scope',
    'httpService', 
    function(
        $scope, 
        httpService){

        var url = url_principal + "api/situacao";

        httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.situacoes = response.data; 
        });

        $scope.cadastrar = function(){
            window.location.href = url_principal + "cadastro-situacao";
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