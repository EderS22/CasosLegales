﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class tbEmpleados
    {
        public int empe_Id { get; set; }
        public string empe_DNI { get; set; }
        public string empe_Nombres { get; set; }
        public string empe_Apellidos { get; set; }
        public string empe_Sexo { get; set; }
        public string empe_Telefono { get; set; }
        public string empe_CorreoElectronico { get; set; }
        public DateTime empe_FechaNacimiento { get; set; }
        public int eciv_Id { get; set; }
        public string muni_Id { get; set; }
        public string empe_Direccion { get; set; }
        public int empe_UsuCreacion { get; set; }
        public DateTime empe_FechaCreacion { get; set; }
        public int? empe_UsuModificacion { get; set; }
        public DateTime? empe_FechaModificacion { get; set; }
        public bool? empe_Estado { get; set; }

        public virtual tbEstadosCiviles eciv { get; set; }
        public virtual tbUsuarios empe_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios empe_UsuModificacionNavigation { get; set; }
        public virtual tbMunicipios muni { get; set; }
    }
}