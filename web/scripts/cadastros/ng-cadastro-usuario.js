app.controller('CadastroUsuarioCtrl', [
    '$scope',
    'httpService', 
    '$rootScope', 
    '$window', 
    function(
        $scope, 
        httpService,
        $rootScope,
        $window){   

    var url = url_principal + "api/usuario";
    var url_tiposperfil = url_principal + "api/tipoperfil";
    var url_tiposcategoria = url_principal + "api/categoria";
    var url_permissao = url_principal + "api/permissao";
    var url_empresa = url_principal + "api/empresa";
    var arquivo = null;
    $scope.podeAlterar = false;
    $scope.titulo = "Cadastrar de Usuário";

    var id = document.URL.split("https://guiapro.herokuapp.com/alterar-usuario/").pop();     

    limparDados();

    function limparDados(){

        $scope.usuario = {
            perfil:{
                tipoperfil: {
                    id: null,
                    descricao: ""
                },
                categorias: [], 
                permissoes: [],
                empresas: [],
                ativo: "true"
            }
        };
    
        $scope.sexos = ['M','F'];
        $scope.categorias = [];
        $scope.permissoes = [];
        $scope.tiposperfil = [];
        $scope.empresas = [];  
        $scope.podeAlterar = false;
        $scope.mostrarCategorias = $scope.usuario.perfil.tipoperfil.descricao == "Profissional";  

        httpService.gethttp(url_tiposperfil, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.tiposperfil = response.data; 

            httpService.gethttp(url_tiposcategoria, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.categorias = response.data; 

                httpService.gethttp(url_permissao, {})
                .then(function mySuccess(response) { 
                    if(response.data != null)
                        $scope.permissoes = response.data; 

                    httpService.gethttp(url_empresa, {})
                    .then(function mySuccess(response) { 
                        if(response.data != null)   
                            $scope.empresas = response.data;
                        
                        if(isNaN(id) == false){
                            $scope.podeAlterar = true;
                            $scope.titulo = "Alterar de Usuário";
                            httpService.gethttp(url + "/" + id, {})
                            .then(function mySuccess(response) { 
                                if(response.data != null) {  
                                    $scope.usuario = response.data;
                                    $scope.usuario.perfil.datanascimento = formatarData(response.data.perfil.datanascimento);
                                    carregarPermissoesSelecionadas();
                                    carregarCategoriasSelecionadas();
                                    carregarEmpresasSelecionadas();
                                }
                            });                                    
                        }                                 
                    }); 
                }); 
            });
        });        
    }    

    $scope.cadastrar = function(){         

        httpService.posthttp(url, $scope.usuario)
        .then(function mySuccess(response) {
            $window.scrollTo(0, 0);           
            retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
        
    }    

    $scope.alterar = function(){   
        httpService.puthttp(url + "/" + $scope.usuario.id, $scope.usuario)
        .then(function mySuccess(response) {   
            $window.scrollTo(0, 0);            
            $scope.podeAlterar = false;              
            retornoMensagem(response.data);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }
    
    function callbackBusca(retorno){
        if(!("erro" in retorno)){
            $scope.usuario.perfil.endereco.logradouro = retorno.logradouro;
            $scope.usuario.perfil.endereco.bairro = retorno.bairro;
            $scope.usuario.perfil.endereco.cidade = retorno.localidade;
            $scope.usuario.perfil.endereco.uf = retorno.uf;
        }else{
            alert("Cep Não Encontrado!");
        }       
    }

    $scope.buscarEndereco = function(){       

        $scope.usuario.perfil.endereco.logradouro = "";
        $scope.usuario.perfil.endereco.bairro = "";
        $scope.usuario.perfil.endereco.cidade = ""; 
        $scope.usuario.perfil.endereco.uf = "";
        $scope.usuario.perfil.endereco.pais = "";
        $scope.usuario.perfil.endereco.numero = "";

        if($scope.usuario.perfil.endereco.cep != null){
            var cep = $scope.usuario.perfil.endereco.cep.replace(/\D/g,'');
            if(cep != ""){
                 httpService.gethttp('https://viacep.com.br/ws/'+ cep + '/json/', {})
                    .then(function mySuccess(response) { 
                        if(response.data != null)   
                            callbackBusca(response.data); 
                }); 
                /*var script = document.createElement('script');
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=callbackBusca';
                document.body.appendChild(script);*/
            }else{
                alert("CEP Inválido!");
            }
        }else{
            alert("Informe o CEP!");
        }
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
        if(retorno.success){
            console.log('Entrou aqui');
            $rootScope.alertaSucesso(retorno.message);
            limparDados();
        }else{
            console.log('Entrou aqui erro');
            $rootScope.alertaErro(retorno.message);
        }        
    }

    function formatarData(dataNasc){
        var dataStr = "";
        try {
            dataNasc = new Date(dataNasc);
            dataStr = pad(dataNasc.getDate() + 1, 1) + "/" + pad((dataNasc.getMonth() + 1), 1) + "/" + dataNasc.getFullYear();
        } catch (error) {
            
        }
        return dataStr;
    }

    function pad(num, size) {
        if(num < 10){
            var s = num+"";
            for(var i = 0; i < size ; i++){
                s = "0" + s;
            }            
            return s;
        }else{
            return num +"";
        }        
    }

    function carregarPermissoesSelecionadas(){
        var listaPermissao = [];
        var i=0;
        var j=0;
        for(i=0; i < $scope.usuario.perfil.permissoes.length; i++){
            for(j=0; j < $scope.permissoes.length; j++){
                if($scope.usuario.perfil.permissoes[i].permissao.id == $scope.permissoes[j].id){                                                
                    $scope.permissoes[j].selecionado = true;
                }
            }   
            listaPermissao.push(angular.copy($scope.usuario.perfil.permissoes[i].permissao));                                     
        }
        $scope.usuario.perfil.permissoes = angular.copy(listaPermissao);
    }

    function carregarCategoriasSelecionadas(){
        var listaCategoria = [];
        var i=0;
        var j=0;
        for(i=0; i < $scope.usuario.perfil.categorias.length; i++){
            for(j=0; j < $scope.categorias.length; j++){
                if($scope.usuario.perfil.categorias[i].categoria.id == $scope.categorias[j].id){                                                
                    $scope.categorias[j].selecionado = true;
                }
            }   
            listaCategoria.push(angular.copy($scope.usuario.perfil.categorias[i].categoria));                                     
        }
        $scope.usuario.perfil.categorias = angular.copy(listaCategoria);
    }

    function carregarEmpresasSelecionadas(){
        var listaEmpresas = [];
        var i=0;
        var j=0;
        for(i=0; i < $scope.usuario.perfil.empresas.length; i++){
            for(j=0; j < $scope.empresas.length; j++){
                if($scope.usuario.perfil.empresas[i].empresa.id == $scope.empresas[j].id){                                                
                    $scope.empresas[j].selecionado = true;
                }
            } 
            listaEmpresas.push(angular.copy($scope.usuario.perfil.empresas[i].empresa));                                     
        }
        $scope.usuario.perfil.empresas = angular.copy(listaEmpresas);
    }

    $scope.uploadFile = function(files) {
        arquivo = files[0];  
        if(arquivo != null){
            var payload = new FormData();
            payload.append('image', arquivo);
    
            httpService.posthttpArquivo(url_upload_arquivo, payload)
            .then(function mySuccess(response) {  
                $scope.usuario.perfil.urlimg = response.data.url;                    
            }, function myError(response) {
                console.log(response);  
            });
        }
    }; 

}]);