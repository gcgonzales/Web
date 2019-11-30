using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;
using DadisWeb.Models;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using System.IO;

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

        [HttpPost]
        public JsonResult GuardarDatosSesion(int Id, string Password, string Nombre, string HashKey)
        {
            string HashPassword = MD5Hash(Password);

            Credenciales credenciales = new Credenciales();
            credenciales.Id = Id;
            credenciales.Nombre = Nombre;
            credenciales.Password = Password;
            credenciales.HashKey = HashKey;

            Session["Credenciales"] = credenciales;

            return Json("Ok", JsonRequestBehavior.AllowGet);
        }


        
        [HttpPost]
        public JsonResult UploadPhoto(HttpPostedFileBase fileInput)
        {

             
             
           // HttpPostedFile file = fileInput.PostedFile;
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(fileInput.FileName, fileInput.InputStream),
            };
    

            //if (file != null && file.ContentLength > 0)
            //{
            //    var fileName = Path.GetFileName(file.FileName);
            //    path = Path.Combine(Server.MapPath("~/Images/"), fileName);
            //    file.SaveAs(path);
            //}

            Account account = new Account(

  ConfigurationManager.AppSettings["CloudName"].ToString(),
   ConfigurationManager.AppSettings["CloudApiKey"].ToString(),
   ConfigurationManager.AppSettings["CloudApiSecret"].ToString());

            Cloudinary cloudinary = new Cloudinary(account);

            //var uploadParams = new ImageUploadParams()
            //{
            //    File = new FileDescription(@rutaFoto)
                
            //};
            var uploadResult = cloudinary.Upload(uploadParams);

            return Json(uploadResult);
        }

        [HttpPost]
        public JsonResult GetDatosSesion()
        {
            Credenciales resultado = new Credenciales();

            if (Session["Credenciales"] != null) {
                resultado = (Credenciales)Session["Credenciales"];
            }

            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        public string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text  
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it  
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }
    }
}