

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

function GuardarUsuario(param) {


    var urlBase = GetUrlBase();
    var resultado = {};
    url = urlBase + "Usuarios/Guardar";
    var dataParam = JSON.stringify(param); 
    $.ajax({
        type: "POST",
        url: url,
        data: dataParam,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        error: function (request, status, error) {
            alert(request.responseText);
        }
    }).done(function (result) {
        //resultado = JSON.parse(JSON.stringify(result));

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
            alert(request.responseText);
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