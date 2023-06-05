﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class tbEvidenciasPorCaso
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
        public bool evca_Estado { get; set; }
        [NotMapped]
        public string tiev_Nombre { get; set; }

        public virtual tbCasos caso { get; set; }
        public virtual tbUsuarios evca_UsuCreacionNavigation { get; set; }
        public virtual tbUsuarios evca_UsuModificacionNavigation { get; set; }
        public virtual tbTiposdeEvidencia tiev { get; set; }
    }
}