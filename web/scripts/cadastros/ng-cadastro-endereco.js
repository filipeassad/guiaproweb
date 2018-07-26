app.controller('CadastroEnderecoCtrl', function($window, $scope, httpService){

    $scope.endereco = {};
    $scope.enderecos = [];    
    $scope.podeAlterar = false;
    var url = "http://localhost:3000/api/endereco";    

    $scope.cadastrar = function(){
        $scope.endereco.urlimg = "";
        httpService.posthttp(url, $scope.endereco)
            .then(function mySuccess(response) {
                $scope.endereco = {};
        }, function myError(response) {
            alert("Erro do servidor."); 
        });

    }

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.endereco.id, $scope.endereco)
            .then(function mySuccess(response) {
                $scope.podeAlterar = false;
                $scope.endereco = {};
        }, function myError(response) {
            alert("Erro do servidor."); 
        });
    }

});