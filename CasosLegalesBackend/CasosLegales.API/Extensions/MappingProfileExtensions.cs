using AutoMapper;
using CasosLegales.API.Models;
using CasosLegales.Entities.Entities;

namespace CasosLegales.API.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<UsuarioViewModel, tbUsuarios>().ReverseMap();


            CreateMap<DepartamentoViewModel,    tbDepartamentos>().ReverseMap();
            CreateMap<MunicipioViewModel,       tbMunicipios>().ReverseMap();
            CreateMap<CargoViewModel,           tbCargos>().ReverseMap();
            CreateMap<EstadoCivilViewModel,     tbEstadosCiviles>().ReverseMap();
        }
    }
}
