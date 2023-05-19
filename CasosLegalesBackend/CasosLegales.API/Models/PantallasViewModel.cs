using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class PantallasViewModel
    {
        public int pant_Id { get; set; }
        public string pant_Pantalla { get; set; }
        public string pant_Href { get; set; }
        public string pant_Esquema { get; set; }
        public int usua_IdCreacion { get; set; }
        public DateTime? pant_FechaCreacion { get; set; }
        public int? usua_IdModificacion { get; set; }
        public DateTime? pant_FechaModificacion { get; set; }
        public string usua_NombreCreacion { get; set; }
        public string usua_NombreModificacion { get; set; }
    }
}
