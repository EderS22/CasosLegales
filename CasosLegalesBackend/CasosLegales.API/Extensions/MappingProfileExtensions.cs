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

            #region General
            CreateMap<DepartamentoViewModel, tbDepartamentos>().ReverseMap();
            CreateMap<MunicipioViewModel, tbMunicipios>().ReverseMap();
            CreateMap<EstadoCivilViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<CargoViewModel, tbCargos>().ReverseMap();
            #endregion

            #region Casos Legales
            CreateMap<EmpleadoViewModel, tbEmpleados>().ReverseMap();
            CreateMap<TipoDeCasoViewModel, tbTiposdeCaso>().ReverseMap();
            CreateMap<TipoDeEvidenciaViewModel, tbTiposdeEvidencia>().ReverseMap();
            CreateMap<AbogadoJuezViewModel, tbAbogadosJueces>().ReverseMap();
            CreateMap<CivilesViewModel, tbCiviles>().ReverseMap();
            CreateMap<EmpresaViewModel, tbEmpresas>().ReverseMap();
            #endregion
        }
    }
}
