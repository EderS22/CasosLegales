﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class tbAcusadoPorCaso
    {
        public int acus_Id { get; set; }
        public int caso_Id { get; set; }
        public int acus_TipoAcusado { get; set; }
        public int acus_Acusado { get; set; }
        public int acus_UsuCreacion { get; set; }
        public DateTime acus_FechaCreacion { get; set; }
        public int? acus_UsuModificacion { get; set; }
        public DateTime? acus_FechaModificacion { get; set; }
        public bool acus_Estado { get; set; }

        public virtual tbUsuarios acus_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios acus_UsuModificacionNavigation { get; set; }
        public virtual tbCasos caso { get; set; }
    }
}