app.directive('alertaCustom', function() {
    return {
        template:   '<div style="position: absolute; bottom:0; right:0; margin-right: 40px;">' +
                    '      <div class="{{alertSuccess.classe}}" role="alert">' +
                    '         <button type="button" class="close" aria-label="Close" ng-click="fecharAlerta(alertSuccess)"><span aria-hidden="true">&times;</span></button>' +
                    '          <strong>{{alertSuccess.titulo}}</strong> {{alertSuccess.texto}}' +
                    '      </div>'+
                    '  </div> '
    };
});