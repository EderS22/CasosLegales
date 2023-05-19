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
    public class RolesPorPantallaRepository : IRepository<tbRolesPorPantalla, tbRolesPorPantalla>
    {
        public RequestStatus Delete(tbRolesPorPantalla item)
        {
            throw new NotImplementedException();
        }

        public tbRolesPorPantalla Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbRolesPorPantalla item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pant_Id", item.pant_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_IdCreacion", item.usua_IdCreacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.GuardarNuevoRopa, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado insert"
            };

            return request;
        }

        public IEnumerable<tbRolesPorPantalla> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbRolesPorPantalla item)
        {
            throw new NotImplementedException();
        }

        public RequestStatus ValidarRolTienePantalla(tbRolesPorPantalla item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@pant_Pantalla", item.pant_Pantalla, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ValidarRolTienePantalla, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Rol por pantalla"
            };

            return request;
        }

        public RequestStatus EliminarPantallasdeRol(tbRolesPorPantalla item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_IdModificacion", item.usua_IdModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarPantallasDeRol, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado delete pantallas de rol"
            };

            return request;
        }

    }
}
