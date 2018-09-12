app.controller('BuscaUsuarioCtrl', [
    '$scope',
    'httpService', 
    function(
        $scope, 
        httpService){

    var url = url_principal + "api/usuario";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.usuarios = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = url_principal + "cadastro-usuario";
    }

    $scope.excluir = function(usuario){
        httpService.deletehttp(url + "/" + usuario.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.usuarios = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }
       
    
}]);