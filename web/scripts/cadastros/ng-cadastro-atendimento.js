app.controller('CadastroAtendimentoCtrl',[
    '$scope',
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService, 
        $rootScope){

    $scope.atendimento = {};
    //var clienteModal = document.getElementById("clienteModal");
    var url = "http://localhost:3000/api/atendimento";    

    $scope.fecharBusca = function(){        
        $('#clienteModal').modal('hide');
    }

}]);