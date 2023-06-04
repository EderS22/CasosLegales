﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class tbCasos
    {
        public tbCasos()
        {
            tbAcusadoPorCaso = new HashSet<tbAcusadoPorCaso>();
            tbEvidenciasPorCaso = new HashSet<tbEvidenciasPorCaso>();
            tbTestigosPorCaso = new HashSet<tbTestigosPorCaso>();
            tbVeredictos = new HashSet<tbVeredictos>();
        }

        public int caso_Id { get; set; }
        public string caso_Descripcion { get; set; }
        public int tica_Id { get; set; }
        public int abju_IdJuez { get; set; }
        public string caso_TipoDemandante { get; set; }
        public int caso_IdDemandante { get; set; }
        public int abju_IdAbogadoDemandante { get; set; }
        public int abju_IdAbogadoDemandado { get; set; }
        public bool caso_Abierto { get; set; }
        public DateTime caso_Fecha { get; set; }

        public bool caso_Estado { get; set; }
        public int usua_IdCreacion { get; set; }
        public DateTime caso_FechaCreacion { get; set; }
        public int? usua_IdModificacion { get; set; }
        public DateTime? caso_FechaModificacion { get; set; }


        public virtual tbAbogadosJueces abju_IdAbogadoDemandadoNavigation { get; set; }
        public virtual tbAbogadosJueces abju_IdAbogadoDemandanteNavigation { get; set; }
        public virtual tbAbogadosJueces abju_IdJuezNavigation { get; set; }
        public virtual tbUsuarios usua_IdCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_IdModificacionNavigation { get; set; }
        public virtual tbTiposdeCaso tica { get; set; }
        public virtual ICollection<tbAcusadoPorCaso> tbAcusadoPorCaso { get; set; }
        public virtual ICollection<tbEvidenciasPorCaso> tbEvidenciasPorCaso { get; set; }
        public virtual ICollection<tbTestigosPorCaso> tbTestigosPorCaso { get; set; }
        public virtual ICollection<tbVeredictos> tbVeredictos { get; set; }
    }
}