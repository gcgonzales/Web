using System.Web;
using System.Web.Optimization;

namespace DadisWeb
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js").Include(
                        "~/Scripts/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                      "~/Scripts/moment.min.js"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                    "~/Scripts/angular.min.js").Include(
                "~/Scripts/angular-route.min.js").Include(
                "~/Scripts/angular-locale_es.js").Include(
                "~/Scripts/angular-datepicker.js").Include(
                "~/Scripts/dadisController.js").Include(
                "~/Scripts/dadisService.js"));

            bundles.Add(new ScriptBundle("~/bundles/cloudinary").Include(
        "~/Scripts/cloudinary/jquery.ui.widget.js").Include(
    "~/Scripts/cloudinary/jquery.iframe-transport.js") 
    //"~/Scripts/cloudinary/jquery.fileupload.js").Include(
    //"~/Scripts/cloudinary/jquery.fileupload-image.js").Include(
    //"~/Scripts/cloudinary/jquery.fileupload-process.js").Include(
    //"~/Scripts/cloudinary/jquery.fileupload-validate.js")
    .Include("~/Scripts/cloudinary/load-image.all.min.js").Include(
    "~/Scripts/cloudinary/jquery.cloudinary.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css", "~/Content/bootstrap-responsive.css",
                      "~/Content/site.css", "~/Content/angular-datepicker.css"));
        }
    }
}
