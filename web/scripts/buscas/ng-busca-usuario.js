app.controller('BuscaUsuarioCtrl', [
    '$scope',
    'httpService', 
    function(
        $scope, 
        httpService){

    var url = "http://localhost:3000/api/usuario";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.usuarios = response.data; 
    });

    $scope.cadastrar = function(){
        window.location.href = "http://localhost:3000/cadastro-usuario";
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