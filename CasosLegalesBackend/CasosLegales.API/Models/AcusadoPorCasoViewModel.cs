using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class AcusadoPorCasoViewModel
    {
        public int acus_Id { get; set; }
        public int caso_Id { get; set; }
        public string acus_TipoAcusado { get; set; }
        public int acus_Acusado { get; set; }
        public int acus_UsuCreacion { get; set; }
        public DateTime acus_FechaCreacion { get; set; }
        public int? acus_UsuModificacion { get; set; }
        public DateTime? acus_FechaModificacion { get; set; }
    }
}
