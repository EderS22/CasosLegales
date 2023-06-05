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
    public class VeredictosRepository : IRepository<tbVeredictos, tbVeredictos>
    {
        public RequestStatus Delete(tbVeredictos item)
        {
            throw new NotImplementedException();
        }

        public tbVeredictos Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<tbVeredictos>(ScriptsDataBase.UDP_tbVeredictos_ObtenerPorIdCaso, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbVeredictos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id", item.caso_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@vere_Descripcion", item.vere_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@vere_UsuCreacion", item.vere_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbVeredictos_Insert, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus()
            {
                CodeStatus = result,
                MessageStatus = "Id Veredicto"
            };
        }

        public IEnumerable<tbVeredictos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbVeredictos item)
        {
            throw new NotImplementedException();
        }

        public tbVeredictos VeredictosReprte(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@caso_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<tbVeredictos>(ScriptsDataBase.UDP_tbVeredictos_Reporte, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
