app.controller('CadastroEmpresaCtrl', [
    '$scope',
    'httpService', 
    '$rootScope',  
    function(
        $scope, 
        httpService,
        $rootScope){
    var url = url_principal + "api/empresa";

    $scope.titulotela = "Cadastro de Empresa";
    $scope.empresa = {};

    $scope.empresa.id = id_empresa;

    console.log($scope.empresa.id);

    $scope.cadastrar = function(){
        httpService.posthttp(url, $scope.empresa)
            .then(function mySuccess(response) {               
                $scope.empresa = {};
                retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }
    
    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.empresa.id, $scope.empresa)
            .then(function mySuccess(response) {               
                $scope.podeAlterar = false;
                $scope.empresa = {};                
                retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

    function retornoMensagem(retorno){
        if(retorno.success)
            $rootScope.alertaSucesso(retorno.message);
        else
            $rootScope.alertaErro(retorno.message);
    }

    function callbackBusca(retorno){
        if(!("erro" in retorno)){
            $scope.empresa.endereco.logradouro = retorno.logradouro;
            $scope.empresa.endereco.bairro = retorno.bairro;
            $scope.empresa.endereco.cidade = retorno.localidade;
            $scope.empresa.endereco.uf = retorno.uf;
        }else{
            alert("Cep Não Encontrado!");
        }       
    }

    $scope.buscarEndereco = function(){       

        $scope.empresa.endereco.logradouro = "";
        $scope.empresa.endereco.bairro = "";
        $scope.empresa.endereco.cidade = ""; 
        $scope.empresa.endereco.uf = "";
        $scope.empresa.endereco.pais = "";
        $scope.empresa.endereco.numero = "";

        if($scope.empresa.endereco.cep != null){
            var cep = $scope.empresa.endereco.cep.replace(/\D/g,'');
            if(cep != ""){
                 httpService.gethttp('https://viacep.com.br/ws/'+ cep + '/json/', {})
                    .then(function mySuccess(response) { 
                        if(response.data != null)   
                            callbackBusca(response.data); 
                }); 
            }else{
                alert("CEP Inválido!");
            }
        }else{
            alert("Informe o CEP!");
        }
    }  

}]);