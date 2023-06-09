﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class tbTestigosPorCaso
    {
        public int teca_Id { get; set; }
        public int caso_Id { get; set; }
        public int teca_Testigo { get; set; }
        public string teca_Declaracion { get; set; }
        public bool? teca_Demandante { get; set; }
        public bool? teca_Demandado { get; set; }
        public int teca_UsuCreacion { get; set; }
        public DateTime teca_FechaCreacion { get; set; }
        public int? teca_UsuModificacion { get; set; }
        public DateTime? teca_FechaModificacion { get; set; }
        public bool? teca_Estado { get; set; }

        public virtual tbCasos caso { get; set; }
        public virtual tbCiviles teca_TestigoNavigation { get; set; }
        public virtual tbUsuarios teca_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios teca_UsuModificacionNavigation { get; set; }
    }
}