using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class TipoDeEvidenciaViewModel
    {
        public int tiev_Id { get; set; }
        public string tiev_Nombre { get; set; }
        public string tiev_Descripcion { get; set; }
        public int tiev_UsuCreacion { get; set; }
        public DateTime tiev_FechaCreacion { get; set; }
        public int? tiev_UsuModificacion { get; set; }
        public DateTime? tiev_FechaModificacion { get; set; }
        public bool? tiev_Estado { get; set; }
    }
}
