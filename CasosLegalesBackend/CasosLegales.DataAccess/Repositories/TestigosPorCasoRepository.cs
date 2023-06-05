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
    public class TestigosPorCasoRepository : IRepository<tbTestigosPorCaso, tbTestigosPorCaso>
    {
        public RequestStatus Delete(tbTestigosPorCaso item)
        {
            throw new NotImplementedException();
        }

        public tbTestigosPorCaso Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbTestigosPorCaso item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id", item.caso_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@teca_Testigo", item.teca_Testigo, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@teca_Declaracion", item.teca_Declaracion, DbType.String, ParameterDirection.Input);
            parametros.Add("@teca_Demandante", item.teca_Demandante, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@teca_Demandado", item.teca_Demandado, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@teca_UsuCreacion", item.teca_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbTestigosPorCaso_Insert, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus()
            {
                CodeStatus = result,
                MessageStatus = "Estado Insert"
            };
        }

        public IEnumerable<tbTestigosPorCaso> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbTestigosPorCaso item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbTestigosPorCaso> TestogosPorCasoReporte(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id",id, DbType.Int32, ParameterDirection.Input);
            return db.Query<tbTestigosPorCaso>(ScriptsDataBase.UDP_tbTestigosPorCaso_Reporte, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
