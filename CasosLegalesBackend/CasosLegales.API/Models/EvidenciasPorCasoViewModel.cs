using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Models
{
    public class EvidenciasPorCasoViewModel
    {
        public int evca_Id { get; set; }
        public int tiev_Id { get; set; }
        public int caso_Id { get; set; }
        public bool evca_Demandante { get; set; }
        public bool evca_Demandado { get; set; }
        public string evca_NombreArchivo { get; set; }
        public string evca_UrlArchivo { get; set; }
        public int evca_UsuCreacion { get; set; }
        public DateTime evca_FechaCreacion { get; set; }
        public int? evca_UsuModificacion { get; set; }
        public DateTime? evca_FechaModificacion { get; set; }
    }
}
