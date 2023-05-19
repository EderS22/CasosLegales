using AutoMapper;
using CasosLegales.API.Models;
using CasosLegales.Entities.Entities;

namespace CasosLegales.API.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {

            #region Acceso
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            CreateMap<RolesViewModel, tbRoles>().ReverseMap();
            CreateMap<PantallasViewModel, tbPantallas>().ReverseMap();
            CreateMap<RolesPorPantallaViewModel, tbRolesPorPantalla>().ReverseMap();
            #endregion
        }
    }
}
