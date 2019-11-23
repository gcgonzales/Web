using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DadisWeb.Models
{
    public class Credenciales
    {
        public Credenciales()
        {
            Id = 0;
        }

        public int Id { get; set; }
     
        public string Nombre { get; set; }

        public string Password { get; set; }

        public string HashKey { get; set; }
    }
}