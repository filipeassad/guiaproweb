app.controller('CadastroAtendimentoCtrl',[
    '$scope',
    'httpService',
    '$rootScope', 
    function(
        $scope, 
        httpService, 
        $rootScope){

    const _TIPO_PERFIL_CLIENTE = 1;
    const _TIPO_PERFIL_PROFISSIONAL = 2;

    $scope._TIPO_PERFIL_CLIENTE = _TIPO_PERFIL_CLIENTE;
    $scope._TIPO_PERFIL_PROFISSIONAL = _TIPO_PERFIL_PROFISSIONAL;

    $scope.atendimento = {};
    $scope.clienteSelecionado = "";
    $scope.profissionalSelecionado = "";
    $scope.perfilSelecionado = {};
    $scope.perfilBusca = {};
    $scope.resultadoBusca = {};
    $scope.tipoperfil = 0;
    $scope.tiposatendimento = [];
    $scope.situacoes = [];

    var url = "http://localhost:3000/api/atendimento";    
    var url_perfil_paginado = "http://localhost:3000/api/perfil_paginado";    
    var url_tipo_atendimento = "http://localhost:3000/api/tipoatendimento";
    var url_situacao = "http://localhost:3000/api/situacao";       
    
    httpService.gethttp(url_tipo_atendimento, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.tiposatendimento = response.data; 
    });    

    httpService.gethttp(url_situacao, {})
        .then(function mySuccess(response) { 
            if(response.data != null)   
                $scope.situacoes = response.data; 
    }); 

    $scope.selecionarData = function(){
        //$('#datetimepicker1').datetimepicker();
    }

    $scope.buscarPerfil = function(pagina){
        var condicoes = {};

        condicoes.pagina = pagina;
        condicoes.tipoperfil = $scope.tipoperfil;

        if($scope.perfilBusca.nome != null &&  $scope.perfilBusca.nome.trim() != '')
            condicoes.nome = angular.copy( $scope.perfilBusca.nome);
        if($scope.perfilBusca.sobrenome != null &&  $scope.perfilBusca.sobrenome.trim() != '')
            condicoes.sobrenome = angular.copy( $scope.perfilBusca.sobrenome);
        if($scope.perfilBusca.cpf != null &&  $scope.perfilBusca.cpf.trim() != '')
            condicoes.cpf = angular.copy( $scope.perfilBusca.cpf);
        if($scope.perfilBusca.celular != null &&  $scope.perfilBusca.celular.trim() != '')
            condicoes.celular = angular.copy( $scope.perfilBusca.celular);

        httpService.posthttp(url_perfil_paginado, condicoes)
            .then(function mySuccess(response) {                
                if(response.data.success == true){
                    $scope.resultadoBusca = response.data;     
                    zerarSelecao( $scope.resultadoBusca.perfils);               
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });        

    }

    $scope.limparDadosBusca = function(tipoperfilID){
        $scope.perfilBusca = {};
        $scope.resultadoBusca = {};
        $scope.perfilSelecionado = {};
        $scope.tipoperfil = tipoperfilID;
    }

    $scope.selecionarPerfil = function(perfil){
        $scope.perfilSelecionado = angular.copy(perfil);
        zerarSelecao( $scope.resultadoBusca.perfils);
        perfil.estilo = "cursor: pointer; background: #D3D3D3;";
    }

    $scope.selecionar = function (){        
        if($scope.perfilSelecionado != null && ((typeof $scope.perfilSelecionado.nome) != "undefined")){
            if($scope.tipoperfil == _TIPO_PERFIL_CLIENTE){
                 $scope.atendimento.cliente = angular.copy($scope.perfilSelecionado);
                $scope.clienteSelecionado =  $scope.atendimento.cliente.nome + " " +  $scope.atendimento.cliente.sobrenome;
            }else if($scope.tipoperfil == _TIPO_PERFIL_PROFISSIONAL){
                 $scope.atendimento.profissional = angular.copy($scope.perfilSelecionado);
                $scope.profissionalSelecionado =  $scope.atendimento.profissional.nome + " " +  $scope.atendimento.profissional.sobrenome;
            }
        }

        $('#buscaPerfil').modal('hide');
    }

    $scope.fecharBusca = function(){        
        $('#buscaPerfil').modal('hide');
    }

    $scope.selecionaCategoria = function(perfilcategoria){
        limparCategoriasSelecionadas();
        perfilcategoria.selecionado = true;
        $scope.atendimento.categoria = perfilcategoria.categoria;
    }

    $scope.cadastrar = function(){       
        httpService.posthttp(url, $scope.atendimento)
            .then(function mySuccess(response) {                
                if(response.data.success == true){
                    $rootScope.alertaSucesso(response.data.message);
                    limparTela();
                }
                else
                    $rootScope.alertaAtencao(response.data.message);
        }, function myError(response) {
            $rootScope.alertaErro("Problemas com o servidor.");
        });
    }

    function limparTela(){

        $scope.atendimento = {};
        $scope.clienteSelecionado = "";
        $scope.profissionalSelecionado = "";
        $scope.perfilSelecionado = {};
        $scope.perfilBusca = {};
        $scope.resultadoBusca = {};
        $scope.tipoperfil = 0;
        $scope.tiposatendimento = [];
        $scope.situacoes = [];

        httpService.gethttp(url_tipo_atendimento, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.tiposatendimento = response.data; 
        });    

        httpService.gethttp(url_situacao, {})
            .then(function mySuccess(response) { 
                if(response.data != null)   
                    $scope.situacoes = response.data; 
        }); 

    }

    function limparCategoriasSelecionadas(){
        perfilCategorias =  $scope.atendimento.profissional.categorias;
        for(i = 0; i < perfilCategorias.length; i++){
            perfilCategorias[i].selecionado = false;
        }
    }

    function zerarSelecao(listaPerfis){
        for(i = 0; i < listaPerfis.length; i++){
            listaPerfis[i].estilo = "cursor: pointer;";
        }
    }
}]);