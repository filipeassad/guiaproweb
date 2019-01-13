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
    $scope.titulo = "Cadastro de Categoria";

    var id = document.URL.split("https://guiapro.herokuapp.com/alterar-categoria/").pop();

    if(isNaN(id) == false){
        $scope.podeAlterar = true;
        $scope.titulo = "Alterar de Categoria";
        console.log(id);

        httpService.gethttp(url, id)
        .then(function mySuccess(response) { 
            if(response.data != null)  {
                $scope.categoria = response.data[0]; 
            } 
        });
    }   

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
                if(response.data.success == true)
                    $rootScope.alertaSucesso(response.data.message);                
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

}]);