using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class RolesViewModel
    {
        public int role_Id { get; set; }
        public string role_Nombre { get; set; }
        public string role_Descripcion { get; set; }
        public int usua_IdCreacion { get; set; }
        public DateTime? role_FechaCreacion { get; set; }
        public int? usua_IdModificacion { get; set; }
        public DateTime? role_FechaModificacion { get; set; }

        public string usua_NombreCreacion { get; set; }

        public string usua_NombreModificacion { get; set; }
    }
}
