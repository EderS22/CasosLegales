using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class EmpresaViewModel
    {
        public int emsa_Id { get; set; }
        public string emsa_Nombre { get; set; }
        public string emsa_RNT { get; set; }
        public string muni_Id { get; set; }
        public string emsa_Direccion { get; set; }
        public string emsa_RepresentanteNombre { get; set; }
        public string emsa_RepresentanteDNI { get; set; }
        public string emsa_RepresentanteTelefono { get; set; }
        public string emsa_RepresentanteSexo { get; set; }
        public int? eciv_Id { get; set; }
        public bool emsa_EsDemandante { get; set; }
        public bool emsa_EsAcusado { get; set; }
        public int emsa_UsuCreacion { get; set; }
        public DateTime emsa_FechaCreacion { get; set; }
        public int? emsa_UsuModificacion { get; set; }
        public DateTime? emsa_FechaModificacion { get; set; }
        public bool? emsa_Estado { get; set; }
    }
}
