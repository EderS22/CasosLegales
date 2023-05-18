using CasosLegales.BusinessLogic.Services;
using CasosLegales.DataAccess;
using CasosLegales.DataAccess.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace CasosLegales.BusinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAcces(this IServiceCollection services, string conection)
        {
            #region Acceso
            services.AddScoped<UsuariosRepository>();
            services.AddScoped<PantallasRepository>();
            services.AddScoped<RolesRepository>();
            services.AddScoped<RolesPorPantallaRepository>();
            #endregion

            #region General
            services.AddScoped<DepartamentosRepository>();
            services.AddScoped<MunicipiosRepository>();
            services.AddScoped<EstadosCivilesRepository>();
            services.AddScoped<CargosRepositoy>();
            #endregion

            #region Casos Legales
            services.AddScoped<AbogadosJuecesRepository>();
            services.AddScoped<AcusadoPorCasoRepository>();
            services.AddScoped<CasosRepository>();
            services.AddScoped<CivilesRepository>();
            services.AddScoped<DetallesVeredictosRepository>();
            services.AddScoped<EmpleadosRepository>();
            services.AddScoped<EmpresasRepository>();
            services.AddScoped<EvidenciasPorCasoRepository>();
            services.AddScoped<TestigosPorCasoRepository>();
            services.AddScoped<TiposDeCasoRepository>();
            services.AddScoped<TiposDeEvidenciaRepository>();
            services.AddScoped<VeredictosRepository>();
            #endregion

            CasosLegalesContext.BuildConnectionString(conection);
        }

        public static void BusinessLogic(this IServiceCollection services)
        {
            services.AddScoped<AccesoService>();
            services.AddScoped<GeneralService>();
            services.AddScoped<CasosLegalesService>();
        }
    }
}
