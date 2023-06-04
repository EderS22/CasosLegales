using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class DetallesVeredictoViewModel
    {
        public int deve_Id { get; set; }
        public int vere_Id { get; set; }
        public bool deve_EsInocente { get; set; }
        public bool deve_EsCulpable { get; set; }
        public string deve_TipoEmpresaCivil { get; set; }
        public int deve_EmpresaCivil { get; set; }
        public int deve_UsuCreacion { get; set; }
        public DateTime deve_FechaCreacion { get; set; }
        public int? deve_UsuModificacion { get; set; }
        public DateTime? deve_FechaModificacion { get; set; }

    }
}
