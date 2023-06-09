﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class tbRolesPorPantalla
    {
        public int ropa_Id { get; set; }
        public int role_Id { get; set; }
        public int pant_Id { get; set; }
        public bool? ropa_Estado { get; set; }
        public int usua_IdCreacion { get; set; }
        public DateTime? ropa_FechaCreacion { get; set; }
        public int? usua_IdModificacion { get; set; }
        public DateTime? ropa_FechaModificacion { get; set; }

        [NotMapped]
        public string pant_Pantalla { get; set; }

        public virtual tbPantallas pant { get; set; }
        public virtual tbRoles role { get; set; }
        public virtual tbUsuarios usua_IdCreacionNavigation { get; set; }
        public virtual tbUsuarios usua_IdModificacionNavigation { get; set; }
    }
}