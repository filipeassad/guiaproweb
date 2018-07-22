app.controller('SideBarCtrl', [
    '$scope',
    'httpService', function($scope, httpService){

        $scope.itensMenu = [];

        $scope.itensMenu.push(new ItemMenu(1,'Tipo Perfil','/busca-tipoperfil','item-menu-nav','fa fa-user-o'));
        $scope.itensMenu.push(new ItemMenu(2,'Permissão','/busca-permissao','item-menu-nav','fa fa-lock'));
        $scope.itensMenu.push(new ItemMenu(3,'Categoria','/busca-categoria','item-menu-nav','fa fa-wrench'));

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