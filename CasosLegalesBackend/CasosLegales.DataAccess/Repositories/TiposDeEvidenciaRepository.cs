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
    public class TiposDeEvidenciaRepository : IRepository<tbTiposdeEvidencia, VW_tbTiposdeEvidencia>
    {
        public RequestStatus Delete(tbTiposdeEvidencia item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tiev_Id", item.tiev_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarTipodeEvidencia, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbTiposdeEvidencia Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tiev_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbTiposdeEvidencia>(ScriptsDataBase.CargarTipodeEvidencia, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbTiposdeEvidencia item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tiev_Nombre", item.tiev_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@tiev_Descripcion", item.tiev_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tiev_UsuCreacion", item.tiev_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarTipodeEvidencia, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbTiposdeEvidencia> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbTiposdeEvidencia>(ScriptsDataBase.ListadoTipodeEvidencia, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbTiposdeEvidencia item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@tiev_Id", item.tiev_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@tiev_Nombre", item.tiev_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@tiev_Descripcion", item.tiev_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tiev_UsuModificacion", item.tiev_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarTipodeEvidencia, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
