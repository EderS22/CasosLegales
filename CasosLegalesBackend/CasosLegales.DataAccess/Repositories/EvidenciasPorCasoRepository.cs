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
    public class EvidenciasPorCasoRepository : IRepository<tbEvidenciasPorCaso, tbEvidenciasPorCaso>
    {
        public RequestStatus Delete(tbEvidenciasPorCaso item)
        {
            throw new NotImplementedException();
        }

        public tbEvidenciasPorCaso Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEvidenciasPorCaso item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id", item.caso_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@tiev_Id", item.tiev_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@evca_NombreArchivo", item.evca_NombreArchivo, DbType.String, ParameterDirection.Input);
            parametros.Add("@evca_UrlArchivo", item.evca_UrlArchivo, DbType.String, ParameterDirection.Input);
            parametros.Add("@evca_Demandante", item.evca_Demandante, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@evca_Demandado", item.evca_Demandado, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@evca_UsuCreacion", item.evca_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbEvidenciasPorCaso_Insert, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus()
            {
                CodeStatus = result,
                MessageStatus = "Estado Insert"
            };
        }

        public IEnumerable<tbEvidenciasPorCaso> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbEvidenciasPorCaso item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbEvidenciasPorCaso> EvidenciaPorCasoReporte(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id", id, DbType.Int32, ParameterDirection.Input);
            return db.Query<VW_tbEvidenciasPorCaso>(ScriptsDataBase.UDP_tbEvidenciasPorCaso_Reporte, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
