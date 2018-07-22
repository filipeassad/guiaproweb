app.controller('SideBarCtrl', [
    '$scope',
    'httpService',
    function(
        $scope, 
        httpService){                   

        $scope.itensMenu = [];

        $scope.itensMenu.push(new ItemMenu(1,'Tipo Perfil','/busca-tipoperfil','item-menu-nav','fa fa-address-card-o'));
        $scope.itensMenu.push(new ItemMenu(2,'Permissão','/busca-permissao','item-menu-nav','fa fa-lock'));
        $scope.itensMenu.push(new ItemMenu(3,'Categoria','/busca-categoria','item-menu-nav','fa fa-wrench'));
        $scope.itensMenu.push(new ItemMenu(4,'Tipo Atendimento','/busca-tipoatendimento','item-menu-nav','fa fa-exchange'));
        $scope.itensMenu.push(new ItemMenu(5,'Situação','/busca-situacao','item-menu-nav','fa fa-handshake-o'));
        $scope.itensMenu.push(new ItemMenu(6,'Usuário','/busca-usuario','item-menu-nav','fa fa-user-o'));

        function ItemMenu(id, label, url, classe, icone){
            this.id = id;
            this.label = label;
            this.url = url;
            this.classe = classe;
            this.icone = icone;
        }

        $scope.redirecionar = function(item){
            window.location.href = "http://localhost:3000" + item.url;
        } 

}]);

app.controller('AlertaCtrl', [
    '$scope',
    '$timeout',
    '$rootScope', function(
        $scope, 
        $timeout,
        $rootScope){

        const _CLASSE_SUCESSO_HIDE = "alert alert-success alert-dismissible snack-basico";
        const _CLASSE_SUCESSO_SHOW = "alert alert-success alert-dismissible snack-basico show";

        const _CLASSE_ERRO_HIDE = "alert alert-danger alert-dismissible snack-basico";
        const _CLASSE_ERRO_SHOW = "alert alert-danger alert-dismissible snack-basico show";

        const _CLASSE_ATENCAO_HIDE = "alert alert-warning alert-dismissible snack-basico";
        const _CLASSE_ATENCAO_SHOW = "alert alert-warning alert-dismissible snack-basico show";

        $scope.alertSuccess = new Alert(1,"Sucesso","Sucesso: ",_CLASSE_SUCESSO_HIDE);
        $scope.alertError = new Alert(2, "Erro","Erro: ", _CLASSE_ERRO_HIDE);
        $scope.alertWarning = new Alert(3, "Atenção","Atenção: ", _CLASSE_ATENCAO_HIDE);

        $rootScope.alertaSucesso = function(texto){           
            $scope.alertSuccess.texto = texto;
            $scope.alertSuccess.visivel = true;
            $scope.alertSuccess.classe = _CLASSE_SUCESSO_SHOW;
            $timeout(function () {                
                $scope.alertSuccess.classe = _CLASSE_SUCESSO_HIDE;
                $scope.alertSuccess.visivel = false;
            }, 4500);
        }

        $rootScope.alertaErro = function(texto){
            $scope.alertError.texto = texto;
            $scope.alertError.visivel = true;
            $scope.alertError.classe = _CLASSE_ERRO_SHOW;
            $timeout(function () {                
                $scope.alertError.classe = _CLASSE_ERRO_HIDE;
                $scope.alertError.visivel = false;
            }, 4500);
        }

        $rootScope.alertaAtencao = function(texto){
            $scope.alertWarning.texto = texto;
            $scope.alertWarning.visivel = true;
            $scope.alertWarning.classe = _CLASSE_ATENCAO_SHOW;
            $timeout(function () {                
                $scope.alertWarning.classe = _CLASSE_ATENCAO_HIDE;
                $scope.alertWarning.visivel = false;
            }, 4500);
        }

        $scope.fecharAlerta = function(alerta){
            if(alerta.id == 1)
                alerta.classe = _CLASSE_SUCESSO_HIDE;
            else if(alerta.id == 2)
                alerta.classe = _CLASSE_ERRO_HIDE;
            else if(alerta.id == 3)
                alerta.classe = _CLASSE_ATENCAO_HIDE;
            alert.visivel = false;
            $timeout.cancel();
        }; 

        function Alert(id, texto, titulo, classe){
            this.id = id;
            this.texto = texto;
            this.titulo = titulo;
            this.classe = classe;
            this.visivel = false;
        };
       
    
}]);