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
    public class TiposDeCasoRepository : IRepository<tbTiposdeCaso, VW_tbTiposdeCaso>
    {
        public RequestStatus Delete(tbTiposdeCaso item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tica_Id", item.tica_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarTipoDeCaso, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbTiposdeCaso Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tica_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbTiposdeCaso>(ScriptsDataBase.CargarTopoDeCaso, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbTiposdeCaso item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tica_Nombre", item.tica_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@tica_Descripcion", item.tica_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tica_UsuCreacion", item.tica_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarTiposDeCaso, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbTiposdeCaso> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbTiposdeCaso>(ScriptsDataBase.ListadoTiposDeCaso, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTiposdeCaso item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tica_Id", item.tica_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tica_Nombre", item.tica_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@tica_Descripcion", item.tica_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tica_UsuCreacion", item.tica_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarTipodDeCaso, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
