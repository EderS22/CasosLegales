﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace CasosLegales.Entities.Entities
{
    public partial class VW_tbAbogadosJueces
    {
        public int abju_Id { get; set; }
        public string abju_DNI { get; set; }
        public string abju_Nombres { get; set; }
        public string abju_Apellidos { get; set; }
        public string abju_NombreCompleto { get; set; }
        public string abju_Sexo { get; set; }
        public string abju_Telefono { get; set; }
        public string abju_CorreoElectronico { get; set; }
        public DateTime abju_FechaNacimiento { get; set; }
        public int eciv_Id { get; set; }
        public string eciv_Descripcion { get; set; }
        public int carg_Id { get; set; }
        public string carg_Descripcion { get; set; }
        public string muni_Id { get; set; }
        public string muni_Nombre { get; set; }
        public string depa_Id { get; set; }
        public string depa_Nombre { get; set; }
        public string abju_Direccion { get; set; }
        public int abju_UsuCreacion { get; set; }
        public string user_Creacion { get; set; }
        public DateTime abju_FechaCreacion { get; set; }
        public int? abju_UsuModificacion { get; set; }
        public string user_Modificacion { get; set; }
        public DateTime? abju_FechaModificacion { get; set; }
        public bool abju_Estado { get; set; }
    }
}