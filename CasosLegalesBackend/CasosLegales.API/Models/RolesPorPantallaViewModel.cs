using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class RolesPorPantallaViewModel
    {
        public int ropa_Id { get; set; }
        public int role_Id { get; set; }
        public int pant_Id { get; set; }
        public int usua_IdCreacion { get; set; }
        public DateTime? ropa_FechaCreacion { get; set; }
        public int? usua_IdModificacion { get; set; }
        public DateTime? ropa_FechaModificacion { get; set; }
        public string usua_NombreCreacion { get; set; }
        public string pant_Pantalla { get; set; }
    }
}
