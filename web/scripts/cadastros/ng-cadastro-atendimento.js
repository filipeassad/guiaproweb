app.controller('CadastroAtendimentoCtrl',[
    '$scope',
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService, 
        $rootScope){

    $scope.atendimento = {};
    var url = "http://localhost:3000/api/atendimento";    

}]);