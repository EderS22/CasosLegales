using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class DepartamentoViewModel
    {
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public int depa_UsuCreacion { get; set; }
        public DateTime depa_FechaCreacion { get; set; }
        public int? depa_UsuModificacion { get; set; }
        public DateTime? depa_FechaModificacion { get; set; }
        public bool? depa_Estado { get; set; }
    }
}
