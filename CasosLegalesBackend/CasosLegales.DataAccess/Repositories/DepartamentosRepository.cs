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
    public class DepartamentosRepository : IRepository<tbDepartamentos, VW_tbDepartamentos>
    {
        public RequestStatus Delete(tbDepartamentos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@depa_Id", item.depa_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarDepartamento, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbDepartamentos Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@depa_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbDepartamentos>(ScriptsDataBase.CargarDepartamento, parametros, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbDepartamentos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@depa_Nombre", item.depa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_UsuCreacion", item.depa_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarDeparatemto, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;

        }

        public IEnumerable<VW_tbDepartamentos> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbDepartamentos>(ScriptsDataBase.ListadoDepartamento, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbDepartamentos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@depa_Id", item.depa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@depa_Nombre", item.depa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_UsuModificacion", item.depa_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarDepartamento, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;


        }
    }
}
