
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
    public class CargosRepositoy : IRepository<tbCargos, VW_tbCargos>
    {
        public RequestStatus Delete(tbCargos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarCargo, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbCargos Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@carg_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbCargos>(ScriptsDataBase.CargarCargos, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbCargos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@carg_Descripcion", item.carg_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UsuCreacion", item.carg_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarCargo, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbCargos> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbCargos>(ScriptsDataBase.ListadoCargos, null, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Update(tbCargos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Descripcion", item.carg_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@carg_UsuModificacion", item.carg_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarCargo, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;

        }
    }
}
