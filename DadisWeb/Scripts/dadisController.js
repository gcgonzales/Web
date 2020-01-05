var app = angular.module("daddiApp", ['ngRoute', 
    '720kb.datepicker']);

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});


//app.directive('datepicker', function () {

//    return {
//        restrict: 'E',
//        transclude: true,
//        scope: {
//            date: '='
//        },
//        link: function (scope, element, attrs) {
//            element.datepicker({
//                dateFormat: 'dd-mm-yy',
//                onSelect: function (dateText, datepicker) {
//                    scope.date = dateText;
//                    scope.$apply();
//                }
//            });
//        },
//        template: '<input type="text" class="span2" ng-model="date"/>',
//        replace: true
//    };

//});

//app.config(function ($mdDateLocaleProvider) {
//    // Example of a Spanish localization.
//    $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
//        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
//    $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
//        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
//    $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
//    $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
//    // Can change week display to start on Monday.
//    $mdDateLocaleProvider.firstDayOfWeek = 1;
//    // Optional.
//    //$mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,
//    //                               20,21,22,23,24,25,26,27,28,29,30,31];
//    // In addition to date display, date components also need localized messages
//    // for aria-labels for screen-reader users.
//    $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
//        return 'Semana ' + weekNumber;
//    };
//    $mdDateLocaleProvider.msgCalendar = 'Calendario';
//    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
//});

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

 

app.controller("daddiController", function ($scope, $window, $timeout) {

  
    $scope.DatosUsuario = {};
    $scope.DatosUsuario.Id = 0;
    $scope.DatosUsuarioLogado = {};
    $scope.DatosUsuarioLogado.Id = 0;
     
    $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };
    //$rootScope.$on('$routeChangeStart', function (event, next, current) {
    //    if (!current) {
          
    //    }
    //});

    $scope.Edicion = false;
    $scope.EdicionForo = false;
    $scope.EdicionQuedada = false;

    $scope.IrAForo = function () {
        $window.location.href = 'Foro/Index';
    };

    $scope.IrAQuedadas = function () {
        $window.location.href = 'Quedada/Index';
    };

    $scope.IrAContrataciones = function () {
        $window.location.href = 'Contratacion/Index';
    };

    $scope.IrAAccesorios = function () {
        $window.location.href = 'Accesorios/Index';
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
      
        $scope.DatosUsuario.Fotografias = [];
        $scope.DatosUsuario.Fotografias = usuario.Fotografias;

        $scope.Mensajes = [];
        $scope.Mensajes = GetMensajesUsuario($scope.DatosUsuarioLogado.Id, $scope.DatosUsuario.Id);

        if (usuario.Fotografias !== undefined && usuario.Fotografias !== null && usuario.Fotografias.Length > 0)
        {
            $scope.DatosUsuario.RutaImagenPrincipal = usuario.Fotografias[0].RutaFoto; 
        }

        if ($scope.DatosUsuario.Id === $scope.DatosUsuarioLogado.Id) {
            $scope.Edicion = true;
        }

        
        $('#divUsuario').modal('show');
    };

    $scope.EnviarMensajeUsuario = function () {

        var mensajeInput = {};
        mensajeInput.Mensaje = $scope.DatosUsuario.MensajeChat;
        mensajeInput.IdUsuarioRemitente = $scope.DatosUsuarioLogado.Id;
        mensajeInput.IdUsuarioReceptor = $scope.DatosUsuario.Id;

        EnviarMensajeUsuario(mensajeInput);

        $scope.Mensajes = GetMensajesUsuario($scope.DatosUsuarioLogado.Id, $scope.DatosUsuario.Id);
        $scope.DatosUsuario.MensajeChat = '';
    };

    $scope.MostrarUsuarioEdicion = function (id) {

        $scope.Edicion = true;

        var usuario = GetUsuario(id);

        $scope.DatosUsuario = {};
        $scope.DatosUsuario.Fotografias = [];
        $scope.DatosUsuario.Id = usuario.Id;
        $scope.DatosUsuario.Nombres = usuario.Nombres;
        $scope.DatosUsuario.ApellidoPrimero = usuario.ApellidoPrimero;
        $scope.DatosUsuario.ApellidoSegundo = usuario.ApellidoSegundo;
        $scope.DatosUsuario.Telefono = usuario.Telefono;
        $scope.DatosUsuario.Email = usuario.Email;
        $scope.DatosUsuario.Login = usuario.Login;
        $scope.DatosUsuario.Fotografias = usuario.Fotografias;
        
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
            $scope.MostrarAvisoAutocierre("Autenticado correctamente.");
            GuardarDatosSesion($scope.DatosUsuarioLogado.Id, password, $scope.DatosUsuarioLogado.Nombres, $scope.DatosUsuarioLogado.PerfilKey, $scope.DatosUsuarioLogado.Token);
            $scope.CerrarLogin();
        }
    };


    $scope.AbrirReinicioPassword = function () {
        $('#divLogin').modal('hide');
        $('#divReiniciarPassword').modal('show');
    };



    $scope.SolicitarReiniciar = function () {
        
        var usuario = ReiniciarPassword($scope.DatosUsuario.Email);

        if (usuario.IncidenciaUsuario !== undefined && usuario.IncidenciaUsuario !== "") {
            $scope.DatosUsuarioLogado.IncidenciaUsuario = usuario.IncidenciaUsuario;
        }
        else {
            $scope.CerrarReiniciarPassword();
        }
    };

    $scope.CerrarReiniciarPassword = function () {
        $('#divReiniciarPassword').modal('hide');
    };

    $scope.CerrarSesion = function () {
        $scope.DatosUsuarioLogado = {};
        $scope.DatosUsuarioLogado.Id = 0;
        
        GuardarDatosSesion(0, "", "", "", "");
        $scope.MostrarAvisoAutocierre("Sesión cerrada. Hasta pronto.");
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
        $scope.DatosUsuario.Token = $scope.DatosUsuarioLogado.Token;
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
        $scope.MensajeForo.Respondiendo = true;
        $scope.Hilo = null;
        
        $('#divMensajeForo').modal('show');
    };

    $scope.GetMensajeForo = function (id) {

        var mensajeForo = GetMensajeForo(id);

        $scope.MensajeForo = {};
        $scope.MensajeForo.Id = mensajeForo.Id;
        $scope.MensajeForo.Titulo = mensajeForo.Titulo;
        $scope.MensajeForo.Mensaje = mensajeForo.Mensaje;
        $scope.MensajeForo.IdUsuarioAlta = mensajeForo.IdUsuarioAlta;
        $scope.MensajeForo.FechaAlta = mensajeForo.FechaAlta;
        $scope.MensajeForo.TituloPadre = mensajeForo.TituloPadre;

        if ($scope.MensajeForo.IdUsuarioAlta === $scope.DatosUsuarioLogado.Id) {
            $scope.Edicion = true;
        }

        $('#divMensajeForo').modal('show');
    };

    $scope.GetHiloTema = function (id) {

        var mensajesForo = GetHiloTema(id);

        $scope.Hilo = [];

        $.each(mensajesForo, function (x, y) {
            y.Editando = false;
            $scope.Hilo.push(y);
        });

        $scope.MensajeForo = {};
        $scope.MensajeForo.Respondiendo = false;
        $scope.MensajeForo.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;
        $scope.MensajeForo.IdMensajePadre = id;
        $scope.MensajeForo.Id = 0;
        
        $('#divMensajeForo').modal('show');

        //$timeout(function () { $('textarea').autoResize(); }, 3000);
    };

    $scope.ContestarMensaje = function () {
        $scope.MensajeForo.Respondiendo = true;

        $("#divHiloForo").animate({ scrollTop: $('#divHiloForo').prop("scrollHeight") }, 1000);
    };

    $scope.GuardarContestacionMensajeForo = function () {

        GuardarMensajeForo($scope.MensajeForo);
        $scope.MensajeForo.Respondiendo = false;
        $scope.GetHiloTema($scope.MensajeForo.IdMensajePadre);
    };

    $scope.CancelarContestacionMensajeForo = function () {
        $scope.MensajeForo.Respondiendo = false;
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

    $scope.ActivarEdicionMensajeForo = function (id) {
        $.each($scope.Hilo, function (x, y) {
            if (y.Id === id) {
                $scope.MensajeForo = y;
                $scope.MensajeForoProvisional = y;
                y.Editando = true;
            }
        });

        $scope.MensajeForo = {};
        $scope.MensajeForo.Respondiendo = false;
    };

    $scope.GuardarEdicionMensajeForo = function () {
        
        $.each($scope.Hilo, function (x, y) {
            if (y.Editando === true) {
                $scope.MensajeForo = y;
                $scope.GuardarMensajeForo(); 
                y.Editando = false;
            }
        });

        $scope.MensajeForo = {};
        $scope.MensajeForo.Respondiendo = false;
    };

    $scope.CancelarEdicionMensajeForo = function () {
        $.each($scope.Hilo, function (x, y) {
            if (y.Editando === true) {
                $scope.Hilo[x] = $scope.MensajeForoProvisional;
                $scope.Hilo[x].Titulo = $scope.MensajeForoProvisional.Titulo;
                $scope.Hilo[x].Mensaje = $scope.MensajeForoProvisional.Mensaje;
                y.Editando = false;
            }
        });

        $scope.MensajeForo = {};
        $scope.MensajeForo.Respondiendo = false;
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


    $scope.BajaTemasSeleccionadosForo = function () {

        var mensajes = $scope.MensajesForo;

        var ids = [];

        $.each(mensajes, function (x, y) {
            if (y.Seleccionado === true) {
                ids.push(y.Id);
            }
        });

        BajaMensajesForo(ids);
        $scope.BuscarMensajesForo();
    };

    $scope.BajaSeleccionadosHilo = function () {

        var mensajes = $scope.Hilo;

        var idTema = $scope.Hilo[0].Id;

        var ids = [];

        $.each(mensajes, function (x, y) {
            if (y.Seleccionado === true) {
                ids.push(y.Id);
            }
        });

        BajaMensajesForo(ids);
        $scope.GetHiloTema(idTema);

        if ($scope.Hilo.length === 0)  {
            $scope.CerrarMensajeForo();
            $scope.BuscarMensajesForo();
        }
      
    };

    $scope.SubirFoto = function (IdUsuario)
    {
        var subidaFoto = SubirFoto();

        var foto = {};
        foto.Id = 0;
        foto.IdUsuario = IdUsuario;
        foto.RutaFoto = subidaFoto.Uri;
        foto.Baja = false;

        if ($scope.DatosUsuario.Fotografias === undefined || $scope.DatosUsuario.Fotografias.length === 0) { foto.EsPrincipal = true; }
        else { foto.EsPrincipal = false; }

        if ($scope.DatosUsuario.Fotografias === undefined) { $scope.DatosUsuario.Fotografias = []; }

        $scope.DatosUsuario.Fotografias.push(foto);
    };

    $scope.SubirFotoQuedada = function (IdQuedada) {
        var subidaFoto = SubirFoto();

        var foto = {};
        foto.Id = 0;
        foto.IdQuedada = IdQuedada;
        foto.RutaFoto = subidaFoto.Uri;
        foto.Baja = false;

        $scope.Quedada.Fotografias.push(foto);
    };

    $scope.SubirFotoContratacion = function (IdContratacion) {
        var subidaFoto = SubirFoto();

        var foto = {};
        foto.Id = 0;
        foto.IdContratacion = IdContratacion;
        foto.RutaFoto = subidaFoto.Uri;
        foto.Baja = false;

        $scope.Contratacion.Fotografias.push(foto);
    };

    $scope.SubirFotoOferta = function (IdOferta) {
        var subidaFoto = SubirFoto();

        var foto = {};
        foto.Id = 0;
        foto.IdOFerta = IdOferta;
        foto.RutaFoto = subidaFoto.Uri;
        foto.Baja = false;

        $scope.Oferta.Fotografias.push(foto);
    };

    $scope.BuscarQuedadas = function () {

        var parametro = $scope.ParametroBusqueda;

        if (parametro === null || parametro === undefined) { parametro = ""; }

        var quedadas = GetQuedadas(parametro);

        $scope.Quedadas = [];

        $.each(quedadas, function (x, y) {
            $scope.Quedadas.push(y);
        });

    };

    $scope.BuscarContrataciones = function () {

        var parametro = $scope.ParametroBusqueda;

        if (parametro === null || parametro === undefined) { parametro = ""; }

        var contrataciones = GetContrataciones(parametro);

        $scope.Contrataciones = [];

        $.each(contrataciones, function (x, y) {
            $scope.Contrataciones.push(y);
        });

    };

    $scope.BuscarOfertas = function () {

        var parametro = $scope.ParametroBusqueda;

        if (parametro === null || parametro === undefined) { parametro = ""; }

        var ofertas = GetOfertas(parametro);

        $scope.Ofertas = [];

        $.each(ofertas, function (x, y) {
            $scope.Ofertas.push(y);
        });

    };

    $scope.GuardarQuedada = function () {

        $scope.Quedada.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;
        GuardarQuedada($scope.Quedada);

        $('#divDetalleQuedada').modal('hide');
        $scope.EdicionQuedada = false;
        $scope.BuscarQuedadas();
    };

    $scope.GuardarContratacion = function () {

        $scope.Contratacion.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;
        GuardarContratacion($scope.Contratacion);

        $('#divDetalleContratacion').modal('hide');
        $scope.EdicionContratacion = false;
        $scope.BuscarContrataciones();
    };

    $scope.GuardarOferta = function () {

        $scope.Oferta.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;
        GuardarOferta($scope.Oferta);

        $('#divDetalleOferta').modal('hide');
        $scope.EdicionOferta = false;
        $scope.BuscarOfertas();
    };

    $scope.GuardarApunteQuedada = function () {

        var apunte = {};

        $scope.Quedada.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;

        apunte.IdQuedada = $scope.Quedada.Id;
        apunte.IdUsuario = $scope.DatosUsuarioLogado.Id;
        apunte.ApuntadosAdultos = $scope.Quedada.ApuntadosAdultos;
        apunte.ApuntadosNinos = $scope.Quedada.ApuntadosNinos;

        GuardarApunteQuedada(apunte);

        $scope.GetQuedada($scope.Quedada.Id);

 
    };

    $scope.GuardarApunteContratacion = function () {

        var apunte = {};

        $scope.Contratacion.IdUsuarioAlta = $scope.DatosUsuarioLogado.Id;

        apunte.IdQuedada = $scope.Contratacion.Id;
        apunte.IdUsuario = $scope.DatosUsuarioLogado.Id;
        apunte.ApuntadosNinos = $scope.Contratacion.ApuntadosNinos;

        GuardarApunteQuedada(apunte);

        $scope.GetContratacion($scope.Contratacion.Id);


    };


    $scope.AltaQuedada = function () {
        $scope.Quedada = {};
        $scope.Quedada.Id = 0;
        $scope.Quedada.Fotografias = [];

        $scope.EdicionQuedada = true;
        $scope.Quedada.RespondiendoQuedada = true;

        $('#divDetalleQuedada').modal('show');
    };


    $scope.AltaContratacion = function () {
        $scope.Contratacion = {};
        $scope.Contratacion.Id = 0;
        $scope.Contratacion.Fotografias = [];

        $scope.EdicionContratacion = true;
        

        $('#divDetalleContratacion').modal('show');
    };

    $scope.AltaOferta = function () {
        $scope.Oferta = {};
        $scope.Oferta.Id = 0;
        $scope.Oferta.Fotografias = [];

        $scope.EdicionOferta = true;


        $('#divDetalleOferta').modal('show');
    };

    $scope.BajaSeleccionadosQuedada = function () {

        var quedadas = $scope.Quedadas;
        var ids = [];

        $.each(quedadas, function (x, y) {
            if (y.Seleccionado === true) {
                ids.push(y.Id);
            }
        });

        BajaQuedadas(ids);
        $scope.BuscarQuedadas();
    };

    $scope.BajaSeleccionadosContratacion = function () {

        var contrataciones = $scope.Contrataciones;
        var ids = [];

        $.each(contrataciones, function (x, y) {
            if (y.Seleccionado === true) {
                ids.push(y.Id);
            }
        });

        BajaContrataciones(ids);
        $scope.BuscarContrataciones();
    };

    $scope.BajaSeleccionadosOferta = function () {

        var ofertas = $scope.Ofertas;
        var ids = [];

        $.each(ofertas, function (x, y) {
            if (y.Seleccionado === true) {
                ids.push(y.Id);
            }
        });

        BajaOfertas(ids);
        $scope.BuscarOfertas();
    };

    $scope.GetQuedada = function (id) {

        var quedada = GetQuedada(id);

        $scope.Quedada = {};
        $scope.Quedada.Id = quedada.Id;
        $scope.Quedada.Titulo = quedada.Titulo;
        $scope.Quedada.Resumen = quedada.Resumen;
        $scope.Quedada.Descripcion = quedada.Descripcion; 
        $scope.Quedada.Locacion = quedada.Locacion;
        $scope.Quedada.IdUsuarioAlta = quedada.IdUsuarioAlta;
        $scope.Quedada.FechaAlta = quedada.FechaAlta;
        $scope.Quedada.Detalle = quedada.Detalle;
        $scope.Quedada.MaximoAsistentes = quedada.MaximoAsistentes;
        $scope.Quedada.FechaEvento = quedada.FechaEvento.substring(0, 10);
        $scope.Quedada.Apuntados = quedada.Apuntados;

        var date = new Date(quedada.FechaEvento);
        $scope.Quedada.HoraEvento = date.getHours();
        $scope.Quedada.MinutoEvento = date.getMinutes();

        if ($scope.Quedada.IdUsuarioAlta === $scope.DatosUsuarioLogado.Id) {
            $scope.EdicionQuedada = true;
        }

        $scope.Quedada.Fotografias = quedada.Fotografias;

        $('#divDetalleQuedada').modal('show');
    };

    $scope.GetContratacion = function (id) {

        var contratacion = GetContratacion(id);

        $scope.Contratacion = {};
        $scope.Contratacion.Id = contratacion.Id;
        $scope.Contratacion.Titulo = contratacion.Titulo;
        $scope.Contratacion.Descripcion = contratacion.Descripcion;
        $scope.Contratacion.Locacion = contratacion.Locacion;
        $scope.Contratacion.IdUsuarioAlta = contratacion.IdUsuarioAlta;
        $scope.Contratacion.FechaAlta = contratacion.FechaAlta;
        $scope.Contratacion.Detalle = contratacion.Detalle;
        $scope.Contratacion.MaximoHijos = contratacion.MaximoHijos;
        $scope.Contratacion.PrecioTotal = contratacion.PrecioTotal;
        $scope.Contratacion.FechaContratacion = contratacion.FechaContratacion.substring(0, 10);
        $scope.Contratacion.Apuntados = contratacion.Apuntados;

        var date = new Date(contratacion.FechaContratacion);
        $scope.Contratacion.HoraContratacion = date.getHours();
        $scope.Contratacion.MinutoContratacion = date.getMinutes();

        if ($scope.Contratacion.UsuarioAlta === $scope.DatosUsuarioLogado.Id) {
            $scope.EdicionContratacion = true;
        }

        $scope.Contratacion.Fotografias = contratacion.Fotografias;

        $('#divDetalleContratacion').modal('show');
    };

    $scope.GetOferta = function (id) {

        var oferta = GetOferta(id);

        $scope.Oferta = {};
        $scope.Oferta.Id = oferta.Id;
        $scope.Oferta.Titulo = oferta.Titulo;
        $scope.Oferta.Descripcion = oferta.Descripcion;
        $scope.Oferta.Locacion = oferta.Locacion;
        $scope.Oferta.UsuarioAlta = oferta.UsuarioAlta;
        $scope.Oferta.FechaAlta = oferta.FechaAlta;
        $scope.Oferta.Resumen = oferta.Resumen;
        $scope.Oferta.Precio = oferta.Precio;
         
        if ($scope.Oferta.UsuarioAlta === $scope.DatosUsuarioLogado.Id) {
            $scope.EdicionOferta = true;
        }

        $scope.Oferta.Fotografias = oferta.Fotografias;

        $('#divDetalleOferta').modal('show');
    };

    $scope.ActivarEdicionQuedada = function (id) {

        $.each($scope.Hilo, function (x, y) {
            if (y.Id === id) {
                $scope.Quedada = y;
                $scope.QuedadaProvisional = y;
                y.Editando = true;
            }
        });

        $scope.Quedada = {};
        $scope.Quedada.EditandoQuedada = false;
    };

    $scope.CancelarEdicionQuedada = function () {
        $.each($scope.Quedadas, function (x, y) {
            if (y.EditandoQuedada === true) {
                $scope.Quedada[x] = $scope.QuedadaProvisional;
                $scope.Quedada[x].Titulo = $scope.QuedadaProvisional.Titulo;
                $scope.Quedada[x].Resumen = $scope.QuedadaProvisional.Resumen;
                $scope.Quedada[x].Desripcion = $scope.QuedadaProvisional.Desripcion;
                y.EditandoQuedada = false;
            }
        });

        $scope.MensajeForo = {};
        $scope.MensajeForo.Respondiendo = false;
    };


    $scope.MostrarAvisoAutocierre = function (mensaje) {
        $scope.DatosUsuario.MensajeAviso = mensaje;
        $('#divAvisoAutocierre').modal('show');

        $timeout(function () { $scope.CerrarAvisoAutocierre(); }, 2000);
    };

    $scope.CerrarQuedada = function () {
        $('#divDetalleQuedada').modal('hide');
    };

    $scope.CerrarContratacion = function () {
        $('#divDetalleContratacion').modal('hide');
    };

    $scope.CerrarOFerta = function () {
        $('#divDetalleOferta').modal('hide');
    };

    $scope.CerrarAvisoAutocierre = function () {
        $('#divAvisoAutocierre').modal('hide');
    }; 

    $scope.AdminKey = function () {
        var resultado = GetAdminKey();
        return resultado;
    };


    $scope.Editable = function () {
        var editable = false;
        if ($scope.DatosUsuarioLogado !== undefined && $scope.DatosUsuarioLogado.PerfilKey === $scope.AdminKey()) {
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
        $scope.DatosUsuarioLogado.PerfilKey = credencialesActuales.PerfilKey;
    }

});
