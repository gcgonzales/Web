var app = angular.module("daddiApp", []);

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});

app.directive('enterBuscarUsuario', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.enterBuscarUsuario);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller("daddiController", function ($scope) {

    $scope.Edicion = false;
    $('#divUsuario').modal('hide');
    
    $scope.ObtenerUsuarioLogado = function (id) {
        var usuario = GetUsuario(id);

        $scope.DatosUsuarioLogado = {};
        $scope.DatosUsuarioLogado.Id = usuario.Id;
        $scope.DatosUsuarioLogado.Nombres = usuario.Nombres;
        $scope.DatosUsuarioLogado.ApellidoPrimero = usuario.ApellidoPrimero;
        $scope.DatosUsuarioLogado.ApellidoSegundo = usuario.ApellidoSegundo;
        if (usuario.Fotos !== undefined && usuario.Fotos !== null && usuario.Fotos.Length > 0) {
            $scope.DatosUsuarioLogado.RutaImagenPrincipal = usuario.Fotos[0].NombreFichero + usuario.Fotos[0].Extension;
        }

       
    };

    $scope.MostrarUsuario = function (id) {

        var usuario = GetUsuario(id);

        $scope.DatosUsuario = {};
        $scope.DatosUsuario.Id = usuario.Id;
        $scope.DatosUsuario.Nombres = usuario.Nombres;
        $scope.DatosUsuario.ApellidoPrimero = usuario.ApellidoPrimero;
        $scope.DatosUsuario.ApellidoSegundo = usuario.ApellidoSegundo;
        $scope.DatosUsuario.Telefono = usuario.Telefono;
        $scope.DatosUsuario.Email = usuario.Email;
        $scope.DatosUsuario.Login = usuario.Login;
        if (usuario.Fotos !== undefined && usuario.Fotos !== null && usuario.Fotos.Length > 0)
        {
            $scope.DatosUsuario.RutaImagenPrincipal = usuario.Fotos[0].NombreFichero + usuario.Fotos[0].Extension;
        }
        
        $('#divUsuario').modal('show');
    };

    $scope.MostrarUsuarioEdicion = function (id) {

        $scope.Edicion = true;

        var usuario = GetUsuario(id);

        $scope.DatosUsuario = {};
        $scope.DatosUsuario.Id = usuario.Id;
        $scope.DatosUsuario.Nombres = usuario.Nombres;
        $scope.DatosUsuario.ApellidoPrimero = usuario.ApellidoPrimero;
        $scope.DatosUsuario.ApellidoSegundo = usuario.ApellidoSegundo;
        $scope.DatosUsuario.Telefono = usuario.Telefono;
        $scope.DatosUsuario.Email = usuario.Email;
        $scope.DatosUsuario.Login = usuario.Login;
        if (usuario.Fotos !== undefined && usuario.Fotos !== null && usuario.Fotos.Length > 0) {
            $scope.DatosUsuario.RutaImagenPrincipal = usuario.Fotos[0].NombreFichero + usuario.Fotos[0].Extension;
        }

        $('#divUsuario').modal('show');
    };

    $scope.BuscarUsuarios = function () {

        var parametro = $scope.ParametroBusqueda;

        if (parametro === null || parametro === undefined) { parametro = "";}

        var usuarios = GetUsuarios(parametro);

        $scope.Usuarios = [];
        
        $.each(usuarios, function (x,y) {
            $scope.Usuarios.push(y);
        }); 
        
    };

    $scope.AbrirLogin = function () {
        $('#divLogin').modal('show');
    };

    $scope.CerrarLogin = function () {
        $('#divLogin').modal('hide');
    };

    $scope.Autenticarse = function () {
        var usuarioLogin = GetUsuarioAutenticado($scope.DatosUsuarioLogado.Login, $scope.DatosUsuarioLogado.Password);
        $scope.DatosUsuarioLogado = usuarioLogin;

        if (usuarioLogin.Id !== 0) {
            $scope.CerrarLogin();
        }

    };

    $scope.Registrarse = function () {
        $scope.DatosUsuario = {};
        $scope.DatosUsuario.Id = 0;
        $scope.Edicion = true;
        $('#divUsuario').modal('show');
    };

    $scope.AltaUsuario = function () {
        $scope.DatosUsuario = {};
        $scope.DatosUsuario.Id = 0;
        $scope.Edicion = true;
        $('#divUsuario').modal('show');
    };

    $scope.GuardarUsuario = function () {

        $scope.DatosUsuario.IdUsuarioAlta = 1;
        GuardarUsuario($scope.DatosUsuario);
      
        $('#divUsuario').modal('hide');
        $scope.Edicion = false;
        $scope.BuscarUsuarios();
    };

    $scope.CerrarUsuario = function () {
        $('#divUsuario').modal('hide');
    };

    $scope.BajaSeleccionados = function () {

        var usuarios = $scope.Usuarios;

        var ids = [];

        $.each(usuarios, function (x, y) {
            if (y.Seleccionado === true) {
                ids.push(y.Id);
            }
        });

        BajaUsuarios(ids);
        $scope.BuscarUsuarios();
    };

    if ($scope.ParametroBusqueda === null || $scope.ParametroBusqueda === undefined || $scope.ParametroBusqueda === "") {
       // $scope.BuscarUsuarios("");
        var usuarios = GetUsuarios("");

        $scope.Usuarios = [];

        $.each(usuarios, function (x, y) {
            $scope.Usuarios.push(y);
        }); 
    }

});
