using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DadisWeb.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        public ActionResult Index()
        {
            ViewBag.IdUsuario = 0;
            return View();
        }

        public ActionResult Insertar()
        {

            return View();
        }
    }
}