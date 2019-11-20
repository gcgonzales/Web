using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DadisWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            ViewBag.IdUsuario = 0;

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [HttpGet]
        public JsonResult GetUrlBase()
        {
            string url = ConfigurationManager.AppSettings["UrlServicio"].ToString();
            return Json (url, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}