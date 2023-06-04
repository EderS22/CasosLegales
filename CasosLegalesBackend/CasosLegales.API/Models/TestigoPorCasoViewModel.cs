using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class TestigoPorCasoViewModel
    {
        public int teca_Id { get; set; }
        public int caso_Id { get; set; }
        public int teca_Testigo { get; set; }
        public string teca_Declaracion { get; set; }
        public bool teca_Demandante { get; set; }
        public bool teca_Demandado { get; set; }
        public int teca_UsuCreacion { get; set; }
        public DateTime teca_FechaCreacion { get; set; }
        public int? teca_UsuModificacion { get; set; }
        public DateTime? teca_FechaModificacion { get; set; }
    }
}
