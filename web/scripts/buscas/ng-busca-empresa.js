app.controller('BuscaEmpresaCtrl', [
    '$scope',
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService, 
        $rootScope){


    var url = url_principal + "api/empresa";  
    var url_empresa_paginado = url_principal + "api/empresa_paginado";    
    $scope.empresaBusca = {};
    $scope.resultadoBusca = {};

    /*httpService.gethttp(url, {})
    .then(function mySuccess(response) { 
        if(response.data != null)   
            $scope.empresas = response.data; 
    });*/

    $scope.buscarEmpresa = function(pagina){
        var condicoes = {};
        condicoes.pagina = pagina;

        if($scope.empresaBusca.nome != null &&  $scope.empresaBusca.nome.trim() != '')
            condicoes.nome = angular.copy( $scope.empresaBusca.nome);
        if($scope.empresaBusca.cnpj != null &&  $scope.empresaBusca.cnpj.trim() != '')
            condicoes.cnpj = angular.copy( $scope.empresaBusca.cnpj);

        httpService.posthttp(url_empresa_paginado, condicoes)
            .then(function mySuccess(response) {                
                if(response.data.success == true){
                    $scope.resultadoBusca = response.data; 
                    $scope.empresas = $scope.resultadoBusca.empresas;
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });    
    }

    $scope.buscarEmpresa(1);

    $scope.cadastrar = function(){
        window.location.href = url_principal + "cadastro-empresa";
    }

    $scope.editar = function(empresa){
        httpService.gethttp(url_principal + "alterar-empresa/" + empresa.id)
        .then(function mySuccess(response) { 
            console.log(response);
        });
    }

    $scope.excluir = function(empresa){
        httpService.deletehttp(url + "/" + empresa.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.empresas = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }    

}]);