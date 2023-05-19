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
    public class RolesRepository : IRepository<tbRoles, tbRoles>
    {
        public RequestStatus Delete(tbRoles item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_IdModificacion", item.usua_IdModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarRol, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado delete"
            };

            return request;
        }

        public tbRoles Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<tbRoles>(ScriptsDataBase.CargarRolPorId, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbRoles item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Nombre", item.role_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_Descripcion", item.role_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_IdCreacion", item.usua_IdCreacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.GuardarNuevoRol, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Rol"
            };

            return request;
        }

        public IEnumerable<tbRoles> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            return db.Query<tbRoles>(ScriptsDataBase.ListadoRoles, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbRoles item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", item.role_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@role_Nombre", item.role_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@role_Descripcion", item.role_Descripcion, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_IdModificacion", item.usua_IdModificacion, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EditarRol, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado update"
            };

            return request;
        }

        public RequestStatus ValidarRolExiste(string role_Nombre)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Nombre", role_Nombre, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ValidarRolExiste, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Rol"
            };

            return request;
        }
    }
}
