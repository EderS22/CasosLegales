﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class tbEstadosCiviles
    {
        public tbEstadosCiviles()
        {
            tbAbogadosJueces = new HashSet<tbAbogadosJueces>();
            tbCiviles = new HashSet<tbCiviles>();
            tbEmpleados = new HashSet<tbEmpleados>();
            tbEmpresas = new HashSet<tbEmpresas>();
        }

        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public bool? eciv_Estado { get; set; }
        public int eciv_UsuCreacion { get; set; }
        public DateTime? eciv_FechaCreacion { get; set; }
        public int? eciv_UsuModificacion { get; set; }
        public DateTime? eciv_FechaModificacion { get; set; }

        public virtual ICollection<tbAbogadosJueces> tbAbogadosJueces { get; set; }
        public virtual ICollection<tbCiviles> tbCiviles { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleados { get; set; }
        public virtual ICollection<tbEmpresas> tbEmpresas { get; set; }
    }
}