using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class VeredictoViewModel
    {
        public int vere_Id { get; set; }
        public int caso_Id { get; set; }
        public string vere_Descripcion { get; set; }
        public int vere_UsuCreacion { get; set; }
        public DateTime vere_FechaCreacion { get; set; }
        public int? vere_UsuModificacion { get; set; }
        public DateTime? vere_FechaModificacion { get; set; }
    }
}
