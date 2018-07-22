app.controller('CadastroEnderecoCtrl', function($window, $scope, httpService){

    $scope.endereco = {};
    $scope.enderecos = [];    
    $scope.podeAlterar = false;
    var url = "http://localhost:3000/api/endereco";

    httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.enderecos = response.data; 
    });

    $scope.cadastrar = function(){
        $scope.endereco.urlimg = "";
        httpService.posthttp(url, $scope.endereco)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.enderecos = response.data; 
                });
                $scope.endereco = {};
        }, function myError(response) {
            alert("Erro do servidor."); 
        });

    }

    $scope.excluir = function(endereco){
        httpService.deletehttp(url + "/" + endereco.id)
        .then(function mySuccess(response) {                
            httpService.gethttp(url, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.enderecos = response.data; 
            });
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.endereco.id, $scope.endereco)
            .then(function mySuccess(response) {
                httpService.gethttp(url, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)   
                        $scope.enderecos = response.data; 
                });
                $scope.podeAlterar = false;
                $scope.endereco = {};
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

    $scope.paraAlterar = function(endereco){
        $scope.endereco = angular.copy(endereco);
        $scope.podeAlterar = true;
    }

});