app.controller('AdministrativoCtrl', [
    '$scope',
    'httpService',
    function(
        $scope, 
        httpService){         

        $scope.sair = function(){
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href = url_principal + "login";
        };

        $scope.paginaInicial = function(){
            window.location.href = url_principal;
        }

}]);