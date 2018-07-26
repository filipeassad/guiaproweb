app.controller('CadastroEnderecoCtrl', function($window, $scope, httpService){

    $scope.endereco = {};
    $scope.enderecos = [];    
    $scope.podeAlterar = false;
    var url = "http://localhost:3000/api/endereco";    

    $scope.cadastrar = function(){
        $scope.endereco.urlimg = "";
        httpService.posthttp(url, $scope.endereco)
            .then(function mySuccess(response) {
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    $scope.endereco = {};
                }
                else
                    $rootScope.alertaAtencao(response.data.message);                
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });

    }

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.endereco.id, $scope.endereco)
            .then(function mySuccess(response) {
            if(response.data.success == true){
                $rootScope.alertaSucesso(response.data.message);
                $scope.endereco = {};
            }
            else
                $rootScope.alertaAtencao(response.data.message);  
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

});