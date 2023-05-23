using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class UsuariosViewModel
    {
        public int usua_Id { get; set; } 

        public string usua_Nombre { get; set; }

        public string usua_Clave{ get; set; }

        public bool? usua_EsAdmin { get; set; }

        public int? role_Id { get; set; }

        public string role_Nombre { get; set; }

        public int? empe_Id { get; set; }

        public string empe_Nombres { get; set; }

        public string empe_Apellidos { get; set; }

        public int? usua_IdCreacion { get; set; }

        public DateTime usua_FechaCreacion { get; set; }

        public string usua_NombreCreacion { get; set; }

        public int? usua_IdModificacion { get; set; }

        public string? usua_NombreModificacion { get; set; }

        public DateTime? usua_FechaModificacion { get; set; }
    }
}
