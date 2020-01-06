

function GetUsuario(idParam) {

    var idUsuario = idParam;
    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/GetUsuario";

    $.ajax({
        type: "GET",
        url: url,
        data: { id: idUsuario },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result)
    {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetUsuarioAutenticado(paramLogin, paramPassword) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/Autenticarse";

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({ Login: paramLogin, Password: paramPassword }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetUsuarios(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/GetListaUsuarios";

    $.ajax({
        type: "GET",
        url: url,
        data: { textoBusqueda: param },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}


function ReiniciarPassword(emailParam) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/ReiniciarPassword?email=" + emailParam;

    var emailBusqueda = emailParam;
    
    $.ajax({
        type: "GET",
        url: url,
        data: { email: emailBusqueda },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    ).fail(function () { });

    return resultado;
}

function GuardarUsuario(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/Guardar";
    var dataParam = JSON.stringify(param); 
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        headers: { "Authorization": param.Token },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
           
        }
    }).done(function (result) {
    }
    ).fail(function () { });

    return resultado;
}


function BajaUsuarios(arrayIdsUsuarios) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/BajaUsuarios";
    var dataParam = JSON.stringify(arrayIdsUsuarios);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function BajaQuedadas(arrayIdsQuedadas) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Quedada/BajaQuedada";
    var dataParam = JSON.stringify(arrayIdsQuedadas);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function BajaContrataciones(arrayIdsContrataciones) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Contratacion/BajaContratacion";
    var dataParam = JSON.stringify(arrayIdsContrataciones);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}


function BajaOfertas(arrayIdsOfertas) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Oferta/BajaOferta";
    var dataParam = JSON.stringify(arrayIdsOfertas);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function GetUrlBase() {

    var resultado = '';

    $.ajax({
        type: "GET",
        url: "/Home/GetUrlBase",
        dataType: 'json',
      
        async: false
    }).done(function (result) {
        resultado = result;
    }
        );

    return resultado;
}


function GetMensajesPrincipalesForo(param) {


    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Foro/GetMensajesPrincipales";

    $.ajax({
        type: "GET",
        url: url,
        data: { textoBusqueda: param },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetMensajeForo(idParam) {

    var idMensaje = idParam;
    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Foro/GetMensaje";

    $.ajax({
        type: "GET",
        url: url,
        data: { id: idMensaje },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}


function GetHiloTema(idParam) {

    var idMensaje = idParam;
    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Foro/GetHiloTema";

    $.ajax({
        type: "GET",
        url: url,
        data: { idMensajePadre: idMensaje },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GuardarMensajeForo(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Foro/Guardar";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function BajaMensajesForo(arrayIdsMensajes) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Foro/BajaMensajesForo";
    var dataParam = JSON.stringify(arrayIdsMensajes);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}



function GuardarDatosSesion(idParam, passwordParam, nombre, perfilkey, token) {

       
    var resultado = {};
    url = "/Home/GuardarDatosSesion";
    
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({Id: idParam, Password: passwordParam, Nombre: nombre, PerfilKey: perfilkey, Token: token }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}


function GetQuedadas(param) {


    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Quedada/GetQuedadas";

    $.ajax({
        type: "GET",
        url: url,
        data: { textoBusqueda: param },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetContrataciones(param) {


    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Contratacion/GetContrataciones";

    $.ajax({
        type: "GET",
        url: url,
        data: { textoBusqueda: param },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetOfertas(param) {


    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Oferta/GetOfertas";

    $.ajax({
        type: "GET",
        url: url,
        data: { textoBusqueda: param },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetQuedada(idParam) {

    var idQuedada = idParam;
    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Quedada/GetQuedada";

    $.ajax({
        type: "GET",
        url: url,
        data: { id: idQuedada },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetContratacion(idParam) {

    var idContratacion = idParam;
    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Contratacion/GetContratacion";

    $.ajax({
        type: "GET",
        url: url,
        data: { id: idContratacion },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetOferta(idParam) {

    var idOferta = idParam;
    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Oferta/GetOferta";

    $.ajax({
        type: "GET",
        url: url,
        data: { id: idOferta },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}

function GetMensajesUsuario(idUsuarioLogado, idUsuarioConsulta) {


    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/GetMensajes";

    $.ajax({
        type: "GET",
        url: url,
        data: { idUsuarioSesion: idUsuarioLogado, idUsuario: idUsuarioConsulta },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false
    }).done(function (result) {
        resultado = JSON.parse(JSON.stringify(result));
    }
    );

    return resultado;
}
function GuardarQuedada(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Quedada/Guardar";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function GuardarContratacion(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Contratacion/Guardar";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function GuardarOferta(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Oferta/Guardar";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function EnviarMensajeUsuario(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/EnviarMensaje";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));
    }
    ).fail(function () { });

    return resultado;
}

function GuardarApunteQuedada(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Quedada/Apuntarse";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function GuardarApunteContratacion(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Quedada/Apuntarse";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}


function GuardarDesapunteQuedada(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Quedada/Desapuntarse";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}

function GuardarDesapunteContratacion(param) {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Contratacion/Desapuntarse";
    var dataParam = JSON.stringify(param);
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

    }
    ).fail(function () { });

    return resultado;
}
function GetDatosSesion() {

     
    var resultado = {};
    url = "/Home/GetDatosSesion";

    $.ajax({
        type: "POST",
        url: url,
        data: { },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));
        resultado = JSON.parse(JSON.stringify(result));
    }
    ).fail(function () { });

    return resultado;
}

function SubirFoto() {
    var resultado = {};
    var url = "/Home/UploadPhoto";
    var formData = new FormData($('#formUsuarioPhoto')[0]);
    $.ajax({
        type: "POST",
        url: url,
        data: formData,  
        contentType: false,
        processData: false,
        dataType: "json",
        async: false,
        error: function (request, status, error) {
        }
    }).done(function (result) {
        resultado = result;
    }
    ).fail(function () { });
    return resultado;
}

function GetAdminKey() {

    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/GetAdminKey";

    $.ajax({
        type: "GET",
        url: url,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));
        resultado = result;
    }
    ).fail(function () { });

    return resultado;
}