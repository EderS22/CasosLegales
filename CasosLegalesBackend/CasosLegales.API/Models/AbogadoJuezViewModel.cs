using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class AbogadoJuezViewModel
    {
        public int abju_Id { get; set; }
        public string abju_DNI { get; set; }
        public string abju_Nombres { get; set; }
        public string abju_Apellidos { get; set; }
        public string abju_Sexo { get; set; }
        public string abju_Telefono { get; set; }
        public string abju_CorreoElectronico { get; set; }
        public DateTime abju_FechaNacimiento { get; set; }
        public int eciv_Id { get; set; }
        public int carg_Id { get; set; }
        public int muni_Id { get; set; }
        public string abju_Direccion { get; set; }
        public int abju_UsuCreacion { get; set; }
        public DateTime abju_FechaCreacion { get; set; }
        public int? abju_UsuModificacion { get; set; }
        public DateTime? abju_FechaModificacion { get; set; }
        public bool? abju_Estado { get; set; }
    }
}
