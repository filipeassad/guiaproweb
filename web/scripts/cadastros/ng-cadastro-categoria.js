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
    var url = "http://localhost:3000/api/categoria";    

    $scope.cadastrar = function(){
        $scope.categoria.urlimg = "";
        httpService.posthttp(url, $scope.categoria)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.categorias = response.data; 
                });
                $scope.categoria = {};
                $rootScope.alertaSucesso("A Categoria foi cadastrada com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("A Categoria não foi cadastrada!");
        });
    }

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.categoria.id, $scope.categoria)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.categorias = response.data; 
                });
                $scope.podeAlterar = false;
                $scope.categoria = {};
                $rootScope.alertaSucesso("A Categoria foi alterada com sucesso!");
        }, function myError(response) {
            $rootScope.alertaErro("A Categoria não foi alterada!");
        });
    }

}]);