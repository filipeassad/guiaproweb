app.controller('CadastroUsuarioCtrl', [
    '$scope',
    'httpService', 
    '$rootScope',  
    function(
        $scope, 
        httpService,
        $rootScope){

    $scope.usuario = {
        perfil:{
            tipoperfil: {
                descricao: ""
            },
            categorias: [], 
            permissoes: [],
            empresas: []
        }
    };

    $scope.categorias = [];
    $scope.permissoes = [];
    $scope.tiposperfil = [];
    $scope.empresas = [];  
    $scope.podeAlterar = false;
    $scope.mostrarCategorias = $scope.usuario.perfil.tipoperfil.descricao == "Profissional";  

    var url = "http://localhost:3000/api/usuario";
    var url_tiposperfil = "http://localhost:3000/api/tipoperfil";
    var url_tiposcategoria = "http://localhost:3000/api/categoria";
    var url_permissao = "http://localhost:3000/api/permissao";
    var url_empresa = "http://localhost:3000/api/empresa";

    httpService.gethttp(url_tiposperfil, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.tiposperfil = response.data; 
    });

    httpService.gethttp(url_tiposcategoria, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.categorias = response.data; 
    });

    httpService.gethttp(url_permissao, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.permissoes = response.data; 
    });  
    
    httpService.gethttp(url_empresa, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.empresas = response.data; 
    }); 

    $scope.cadastrar = function(){
        httpService.posthttp(url, $scope.usuario)
            .then(function mySuccess(response) {               
                $scope.usuario = {};
                retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }    

    $scope.alterar = function(){
        httpService.puthttp(url + "/" + $scope.usuario.id, $scope.usuario)
            .then(function mySuccess(response) {               
                $scope.podeAlterar = false;
                $scope.usuario = {};                
                retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

    $scope.selecionaCategoria = function(categoria){
        if(categoria.selecionado == null || categoria.selecionado == false){
            categoria.selecionado = true;
            var categoriaC = angular.copy(categoria);
            $scope.usuario.perfil.categorias.push(categoriaC);
        }else{
            categoria.selecionado = false;
            var index = 0;
            for(indexCategoria in $scope.usuario.perfil.categorias){
                if(categoria.id == $scope.usuario.perfil.categorias[indexCategoria].id)
                    index = indexCategoria;
            }
            $scope.usuario.perfil.categorias.splice(index,1);
        }
    }

    $scope.selecionaPermissao = function(permissao){
        if(permissao.selecionado == null || permissao.selecionado == false){
            permissao.selecionado = true;
            var permissaoC = angular.copy(permissao);
            $scope.usuario.perfil.permissoes.push(permissaoC);
        }else{
            permissao.selecionado = false;
            var index = 0;
            for(indexPermissao in $scope.usuario.perfil.permissoes){
                if(permissao.id == $scope.usuario.perfil.permissoes[indexPermissao].id)
                    index = indexPermissao;
            }
            $scope.usuario.perfil.permissoes.splice(index,1);
        }
    }

    $scope.selecionaEmpresa = function(empresa){
        if(empresa.selecionado == null || empresa.selecionado == false){
            empresa.selecionado = true;
            var empresaC = angular.copy(empresa);
            $scope.usuario.perfil.empresas.push(empresaC);
        }else{
            empresa.selecionado = false;
            var index = 0;
            for(indexEmpresa in $scope.usuario.perfil.empresas){
                if(empresa.id == $scope.usuario.perfil.permissoes[indexEmpresa].id)
                    index = indexEmpresa;
            }
            $scope.usuario.perfil.empresas.splice(index,1);
        }
    }

    function retornoMensagem(retorno){
        if(retorno.success)
            $rootScope.alertaSucesso(retorno.message);
        else
            $rootScope.alertaErro(retorno.message);
    }

}]);