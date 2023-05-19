using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class TipoDeCasoViewModel
    {
        public int tica_Id { get; set; }
        public string tica_Nombre { get; set; }
        public string tica_Descripcion { get; set; }
        public int tica_UsuCreacion { get; set; }
        public DateTime tica_FechaCreacion { get; set; }
        public int? tica_UsuModificacion { get; set; }
        public DateTime? tica_FechaModificacion { get; set; }
        public bool? tica_Estado { get; set; }
    }
}
