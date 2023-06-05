using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class CasoViewModel
    {
        public int caso_Id { get; set; }
        public string caso_Descripcion { get; set; }
        public int tica_Id { get; set; }
        public string tica_Nombre { get; set; }
        public int abju_IdJuez { get; set; }
        public string caso_TipoDemandante { get; set; }
        public int caso_IdDemandante { get; set; }
        public int abju_IdAbogadoDemandante { get; set; }
        public int abju_IdAbogadoDemandado { get; set; }
        public bool caso_Abierto { get; set; }
        public DateTime caso_Fecha { get; set; }
        public int usua_IdCreacion { get; set; }
        public DateTime caso_FechaCreacion { get; set; }
        public int? usua_IdModificacion { get; set; }
        public DateTime? caso_FechaModificacion { get; set; }
        public string abju_DNI { get; set; }
        public string abju_Nombres { get; set; }
        public string abju_Apellidos { get; set; }
    }
}
