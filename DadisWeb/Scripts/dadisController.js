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

  
    $scope.DatosUsuario = {};
    $scope.DatosUsuario.Id = 0;
    $scope.DatosUsuarioLogado = {};
    $scope.DatosUsuarioLogado.Id = 0;


    //$rootScope.$on('$routeChangeStart', function (event, next, current) {
    //    if (!current) {
          
    //    }
    //});

    $scope.Edicion = false;
    $scope.EdicionForo = false;
   
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

        if ($scope.DatosUsuario.Id === $scope.DatosUsuarioLogado.Id) {
            $scope.Edicion = true;
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
        var password = $scope.DatosUsuarioLogado.Password;
        var usuarioLogin = GetUsuarioAutenticado($scope.DatosUsuarioLogado.Login, $scope.DatosUsuarioLogado.Password);
        $scope.DatosUsuarioLogado = usuarioLogin;

        if (usuarioLogin.Id !== 0) {
            GuardarDatosSesion($scope.DatosUsuarioLogado.Id, password, $scope.DatosUsuarioLogado.Nombres, $scope.DatosUsuarioLogado.HashKey);
            $scope.CerrarLogin();
        }
    };

    $scope.CerrarSesion = function () {
        $scope.DatosUsuarioLogado = {};
        $scope.DatosUsuarioLogado.Id = 0;
        GuardarDatosSesion(0, "","","");
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

        $scope.DatosUsuario.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;
        GuardarUsuario($scope.DatosUsuario);
      
        $('#divUsuario').modal('hide');
        $scope.Edicion = false;
        $scope.BuscarUsuarios();
    };
    $scope.CerrarUsuario = function () {
        $('#divUsuario').modal('hide');
    };
    $scope.AltaMensajeForo = function () {
        $scope.MensajeForo = {};
        $scope.MensajeForo.Id = 0;
        $scope.EdicionForo = true;
        $('#divMensajeForo').modal('show');
    };




    $scope.BuscarMensajesForo = function () {

        var parametro = $scope.ParametroBusqueda;

        if (parametro === null || parametro === undefined) { parametro = ""; }

        var mensajesForo = GetMensajesPrincipalesForo(parametro);

        $scope.MensajesForo = [];

        $.each(mensajesForo, function (x, y) {
            $scope.MensajesForo.push(y);
        });

    };
    $scope.CerrarUsuario = function () {
        $('#divUsuario').modal('hide');
    };

    $scope.GuardarMensajeForo = function () {

        $scope.MensajeForo.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;
        GuardarMensajeForo($scope.MensajeForo);

        $('#divMensajeForo').modal('hide');
        $scope.EdicionForo = false;
        $scope.BuscarMensajesForo();
    };
    $scope.CerrarMensajeForo = function () {
        $('#divMensajeForo').modal('hide');
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

    $scope.AdminKey = function () {
        var resultado = GetAdminKey();
        return resultado;
    };


    $scope.Editable = function () {
        var editable = false;
        if ($scope.DatosUsuarioLogado !== undefined && $scope.DatosUsuarioLogado.HashKey === $scope.AdminKey()) {
            editable = true;
        }
        else if ($scope.DatosUsuario !== undefined && $scope.DatosUsuarioLogado.Id === $scope.DatosUsuario.Id) {
            editable = true;
        }

        return editable;
    };

    if ($scope.ParametroBusqueda === null || $scope.ParametroBusqueda === undefined || $scope.ParametroBusqueda === "") {
       // $scope.BuscarUsuarios("");
        var usuarios = GetUsuarios("");

        $scope.Usuarios = [];

        $.each(usuarios, function (x, y) {
            $scope.Usuarios.push(y);
        }); 
    }

    var credencialesActuales = GetDatosSesion();

    if (credencialesActuales !== undefined && credencialesActuales !== null && credencialesActuales.Id !== "0" && credencialesActuales.Id !== 0) {
        $scope.DatosUsuarioLogado = {};
        $scope.DatosUsuarioLogado.Id = credencialesActuales.Id;
        $scope.DatosUsuarioLogado.Nombres = credencialesActuales.Nombre;
        $scope.DatosUsuarioLogado.Password = credencialesActuales.Password;
        $scope.DatosUsuarioLogado.HashKey = credencialesActuales.HashKey;
    }

});
