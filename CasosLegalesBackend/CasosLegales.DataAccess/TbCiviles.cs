﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.DataAccess
{
    public partial class TbCiviles
    {
        public TbCiviles()
        {
            TbTestigosPorCaso = new HashSet<TbTestigosPorCaso>();
        }

        public int CiviId { get; set; }
        public string CiviDni { get; set; }
        public string CiviNombres { get; set; }
        public string CiviApellidos { get; set; }
        public string CiviSexo { get; set; }
        public string CiviTelefono { get; set; }
        public string CiviCorreoElectronico { get; set; }
        public DateTime CiviFechaNacimiento { get; set; }
        public int EcivId { get; set; }
        public string MuniId { get; set; }
        public string CiviDireccion { get; set; }
        public int CiviUsuCreacion { get; set; }
        public DateTime CiviFechaCreacion { get; set; }
        public int? CiviUsuModificacion { get; set; }
        public DateTime? CiviFechaModificacion { get; set; }
        public bool? CiviEstado { get; set; }

        public virtual TbUsuarios CiviUsuCreacionNavigation { get; set; }
        public virtual TbUsuarios CiviUsuModificacionNavigation { get; set; }
        public virtual TbEstadosCiviles Eciv { get; set; }
        public virtual TbMunicipios Muni { get; set; }
        public virtual ICollection<TbTestigosPorCaso> TbTestigosPorCaso { get; set; }
    }
}