using CasosLegales.Entities.Entities;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasosLegales.DataAccess.Repositories
{
    public class CivilesRepository : IRepository<tbCiviles, VW_tbCiviles>
    {
        public RequestStatus Delete(tbCiviles item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@civi_Id", item.civi_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarCiviles, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public RequestStatus Insert(tbCiviles item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@civi_DNI", item.civi_DNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_Nombres", item.civi_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_Apellidos", item.civi_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_Sexo", item.civi_Sexo, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_Telefono", item.civi_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_CorreoElectronico", item.civi_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_FechaNacimiento", item.civi_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_Direccion", item.civi_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_EsDemandante", item.civi_EsDemandante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_EsAcusado", item.civi_EsAcusado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_EsTestigo", item.civi_EsTestigo, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_UsuCreacion", item.civi_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarCiviles, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbCiviles> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbCiviles>(ScriptsDataBase.ListadoCiviles, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCiviles item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@civi_Id", item.civi_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_DNI", item.civi_DNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_Nombres", item.civi_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_Apellidos", item.civi_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_Sexo", item.civi_Sexo, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_Telefono", item.civi_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_CorreoElectronico", item.civi_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_FechaNacimiento", item.civi_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_Direccion", item.civi_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@civi_EsDemandante", item.civi_EsDemandante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_EsAcusado", item.civi_EsAcusado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_EsTestigo", item.civi_EsTestigo, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@civi_UsuModificacion", item.civi_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarCiviles, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbCiviles Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@civi_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbCiviles>(ScriptsDataBase.CargarCiviles, parametros, commandType: System.Data.CommandType.StoredProcedure);

        }
    }
}
