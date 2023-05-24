using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class CivilesViewModel
    {
        public int civi_Id { get; set; }
        public string civi_DNI { get; set; }
        public string civi_Nombres { get; set; }
        public string civi_Apellidos { get; set; }
        public string civi_Sexo { get; set; }
        public string civi_Telefono { get; set; }
        public string civi_CorreoElectronico { get; set; }
        public DateTime civi_FechaNacimiento { get; set; }
        public int eciv_Id { get; set; }
        public string muni_Id { get; set; }
        public string civi_Direccion { get; set; }
        public bool civi_EsDemandante { get; set; }
        public bool civi_EsAcusado { get; set; }
        public bool civi_EsTestigo { get; set; }
        public int civi_UsuCreacion { get; set; }
        public DateTime civi_FechaCreacion { get; set; }
        public int? civi_UsuModificacion { get; set; }
        public DateTime? civi_FechaModificacion { get; set; }
        public bool? civi_Estado { get; set; }
    }
}
