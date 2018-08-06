app.controller('IndexCtrl',[
    '$scope',
    'httpService',
    function(
        $scope, 
        httpService){
        
        var url = "http://localhost:3000/api/perfil_logado";

        $scope.perfilLogado = {};

        httpService.gethttp(url, {})
        .then(function mySuccess(response) { 
            if(response.data == null || response.data.nome == null || response.data.nome.trim() == '') 
                $scope.perfilLogado = {};
            else
                $scope.perfilLogado = response.data;
        });

        $scope.logar = function(){
            window.location.href = "http://localhost:3000/login";
        };

        $scope.sair = function(){
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href = "http://localhost:3000/login";
        };

        $scope.administrativo = function(){
            window.location.href = "http://localhost:3000/cadastro-usuario";
        }

        $scope.usuarioEstaLogado = function(){
            var perfilDeslogado = $scope.perfilLogado == null || $scope.perfilLogado.nome == null || $scope.perfilLogado.nome.trim() == '';

            if(perfilDeslogado)
                return false;
            
            return true;
        }

        $scope.perfilEhAdministrador = function(){          

            var perfilDeslogado = $scope.perfilLogado == null || $scope.perfilLogado.nome == null || $scope.perfilLogado.nome.trim() == '';

            if(perfilDeslogado)
                return false;

            var perfilNaoTemPermissoes = $scope.perfilLogado.permissoesPerfil == null || $scope.perfilLogado.permissoesPerfil.length == 0;
            if(perfilNaoTemPermissoes){
                return false;
            }
            
            var permissoesPerfil = $scope.perfilLogado.permissoesPerfil;

            for(i = 0; i < permissoesPerfil.length; i++){
                if(permissoesPerfil[i].permissao.descricao == "Ação Administrador" || 
                    permissoesPerfil[i].permissao.descricao == "Ação Desenvolvedor" ||
                    permissoesPerfil[i].permissao.descricao == "Ação Moderador" )
                    return true; 
            }           
            return false;
          
        }

}]);