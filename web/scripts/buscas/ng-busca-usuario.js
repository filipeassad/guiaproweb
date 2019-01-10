app.controller('BuscaUsuarioCtrl', [
    '$scope',
    'httpService', 
    function(
        $scope, 
        httpService){

    var url = url_principal + "api/usuario";
    var url_usuario_paginado = url_principal + "api/usuario_paginado";
    var condicoes = {};
    $scope.usuarioBusca = {};
    $scope.resultadoBusca = {};

    /*httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.usuarios = response.data; 
    });*/

    $scope.buscarUsuario = function(pagina){
        var condicoes = {};
        condicoes.pagina = pagina;

        if($scope.usuarioBusca.email != null &&  $scope.usuarioBusca.email.trim() != '')
            condicoes.email = angular.copy( $scope.usuarioBusca.email);

        httpService.posthttp(url_usuario_paginado, condicoes)
            .then(function mySuccess(response) {                
                if(response.data.success == true){
                    $scope.resultadoBusca = response.data; 
                    $scope.usuarios = $scope.resultadoBusca.usuarios;
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });    
    }

    $scope.buscarUsuario(1);

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