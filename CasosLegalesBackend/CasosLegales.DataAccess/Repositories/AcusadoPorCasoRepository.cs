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
    public class AcusadoPorCasoRepository : IRepository<tbAcusadoPorCaso, tbAcusadoPorCaso>
    {
        public RequestStatus Delete(tbAcusadoPorCaso item)
        {
            throw new NotImplementedException();
        }

        public tbAcusadoPorCaso Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbAcusadoPorCaso item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id", item.caso_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@acus_TipoAcusado", item.acus_TipoAcusado, DbType.String, ParameterDirection.Input);
            parametros.Add("@acus_Acusado", item.acus_Acusado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@acus_UsuCreacion", item.acus_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbAcusadosPorCaso_Insert, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus()
            {
                CodeStatus = result,
                MessageStatus = "Estado Insert"
            };
        }

        public IEnumerable<tbAcusadoPorCaso> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbAcusadoPorCaso item)
        {
            throw new NotImplementedException();
        }
    }
}
