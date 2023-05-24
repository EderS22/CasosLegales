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
    public class PantallasRepository : IRepository<tbPantallas, tbPantallas>
    {
        public RequestStatus Delete(tbPantallas item)
        {
            throw new NotImplementedException();
        }

        public tbPantallas Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@pant_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<tbPantallas>(ScriptsDataBase.CargarPantallasPorId, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbPantallas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPantallas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbPantallas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbPantallas> ListadoPantallasPorIdRolyAdmin(int role_Id, bool usua_EsAdmin)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_EsAdmin", usua_EsAdmin, DbType.Boolean, ParameterDirection.Input);

            return db.Query<tbPantallas>(ScriptsDataBase.ListadoPantallasPorIdRolyAdmin, parametros, commandType: CommandType.StoredProcedure);
        }

        public IEnumerable<tbPantallas> ListadoPantallasQueNoTieneRol(int role_Id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", role_Id, DbType.Int32, ParameterDirection.Input);

            return db.Query<tbPantallas>(ScriptsDataBase.ListadoPantallasQueNoTieneRol, parametros, commandType: CommandType.StoredProcedure);
        }
    }
}
