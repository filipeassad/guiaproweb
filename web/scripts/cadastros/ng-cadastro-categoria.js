app.controller('CadastroCategoriaCtrl',[
    '$scope',
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService, 
        $rootScope){

    $scope.categoria = {};
    $scope.categorias = [];    
    $scope.podeAlterar = false;
    var url = url_principal + "api/categoria";    

    $scope.cadastrar = function(){
        $scope.categoria.urlimg = "";
        httpService.posthttp(url, $scope.categoria)
            .then(function mySuccess(response) {                
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.categoria = {};
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.categoria.id, $scope.categoria)
            .then(function mySuccess(response) {
                $scope.categoria = {};
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.categoria = {};
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

}]);