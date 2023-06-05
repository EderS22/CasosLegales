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
    public class CasosRepository : IRepository<tbCasos, tbCasos>
    {
        public RequestStatus Delete(tbCasos item)
        {
            throw new NotImplementedException();
        }

        public tbCasos Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@caso_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<tbCasos>(ScriptsDataBase.UDP_tbCasos_ObtenerCasoPorId, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbCasos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Descripcion", item.caso_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tica_Id", item.tica_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_IdJuez", item.abju_IdJuez, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@caso_TipoDemandante", item.caso_TipoDemandante, DbType.String, ParameterDirection.Input);
            parametros.Add("@caso_IdDemandante", item.tica_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_IdAbogadoDemandante", item.abju_IdAbogadoDemandante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_IdAbogadoDemandado", item.abju_IdAbogadoDemandado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@caso_Abierto", item.caso_Abierto, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@usua_IdCreacion", item.usua_IdCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbCasos_Insert, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus() { 
                CodeStatus = result,
                MessageStatus = "Id Caso"
            };
        }

        public IEnumerable<tbCasos> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            return db.Query<tbCasos>(ScriptsDataBase.UDP_tbCasos_Listado, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbCasos item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();

            parametros.Add("@caso_Id", item.caso_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@caso_Descripcion", item.caso_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@tica_Id", item.tica_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_IdJuez", item.abju_IdJuez, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@caso_TipoDemandante", item.caso_TipoDemandante, DbType.String, ParameterDirection.Input);
            parametros.Add("@caso_IdDemandante", item.tica_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_IdAbogadoDemandante", item.abju_IdAbogadoDemandante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_IdAbogadoDemandado", item.abju_IdAbogadoDemandado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@caso_Abierto", item.caso_Abierto, DbType.Boolean, ParameterDirection.Input);
            parametros.Add("@usua_IdModificacion", item.usua_IdModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<int>(ScriptsDataBase.UDP_tbCasos_Editar, parametros, commandType: CommandType.StoredProcedure);

            return new RequestStatus()
            {
                CodeStatus = result,
                MessageStatus = "Estado update"
            };
        }


        public VW_tbCasos DatosReporte(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@caso_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbCasos>(ScriptsDataBase.UDP_tbCasos_DatosReporte, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
