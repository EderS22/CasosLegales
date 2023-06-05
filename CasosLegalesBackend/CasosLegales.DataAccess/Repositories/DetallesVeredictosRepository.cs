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
    public class DetallesVeredictosRepository : IRepository<tbDetallesVeredictos, tbDetallesVeredictos>
    {
        public RequestStatus Delete(tbDetallesVeredictos item)
        {
            throw new NotImplementedException();
        }

        public tbDetallesVeredictos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDetallesVeredictos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@vere_Id", item.vere_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deve_EsCulpable", item.deve_EsCulpable, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@deve_TipoEmpresaCivil", item.deve_TipoEmpresaCivil, DbType.String, ParameterDirection.Input);
            parametros.Add("@deve_EmpresaCivil", item.deve_EmpresaCivil, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@deve_UsuCreacion", item.deve_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbDetallesVeredictos_Insert, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus()
            {
                CodeStatus = result,
                MessageStatus = "Estado insert"
            };
        }

        public IEnumerable<tbDetallesVeredictos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbDetallesVeredictos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbDetallesVeredictos> ObtenerPorIdVeredicto(int id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@vere_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<tbDetallesVeredictos>(ScriptsDataBase.UDP_tbDetallesVeredicto_ObtenerPorIdVeredicto, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus EliminarTodoPorIdVeredicto(int id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@vere_Id", id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbDetallesVeredicto_EliminarTodosPorIdVeredicto, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus()
            {
                CodeStatus = result,
                MessageStatus = "Estado operacion"
            };
        }
    }
}
