﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.DataAccess
{
    public partial class TbEmpleados
    {
        public int EmpeId { get; set; }
        public string EmpeDni { get; set; }
        public string EmpeNombres { get; set; }
        public string EmpeApellidos { get; set; }
        public string EmpeSexo { get; set; }
        public string EmpeTelefono { get; set; }
        public string EmpeCorreoElectronico { get; set; }
        public DateTime EmpeFechaNacimiento { get; set; }
        public int EcivId { get; set; }
        public string MuniId { get; set; }
        public string EmpeDireccion { get; set; }
        public int EmpeUsuCreacion { get; set; }
        public DateTime EmpeFechaCreacion { get; set; }
        public int? EmpeUsuModificacion { get; set; }
        public DateTime? EmpeFechaModificacion { get; set; }
        public bool? EmpeEstado { get; set; }

        public virtual TbEstadosCiviles Eciv { get; set; }
        public virtual TbUsuarios EmpeUsuCreacionNavigation { get; set; }
        public virtual TbUsuarios EmpeUsuModificacionNavigation { get; set; }
        public virtual TbMunicipios Muni { get; set; }
    }
}