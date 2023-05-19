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
    public class UsuariosRepository : IRepository<tbUsuarios, tbUsuarios>
    {
        public RequestStatus Delete(tbUsuarios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametro = new DynamicParameters();
            parametro.Add("@usua_Id", item.usua_Id, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.EliminarUsuario, parametro, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado delete"
            };

            return request;
        }

        public tbUsuarios Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@usua_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<tbUsuarios>(ScriptsDataBase.CargarUsuarioPorId, parametros, commandType: CommandType.StoredProcedure);
        }


        public RequestStatus Insert(tbUsuarios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parameters = new DynamicParameters();
            parameters.Add("@usua_Nombre", item.usua_Nombre, DbType.String, ParameterDirection.Input);
            parameters.Add("@usua_Clave", item.usua_Clave, DbType.String, ParameterDirection.Input);
            parameters.Add("@role_Id", item.role_Id, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("@empe_Id", item.empe_Id, DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add("@usua_EsAdmin", item.usua_EsAdmin, DbType.Boolean, direction: ParameterDirection.Input);
            parameters.Add("@usua_IdCreacion", item.usua_IdCreacion, DbType.Int32, direction: ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.InsertarUsuario, parameters, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado insert"
            };

            return request;
        }

        public IEnumerable<tbUsuarios> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<tbUsuarios>(ScriptsDataBase.ListadoUsuarios, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbUsuarios item)
        {
            var parametros = new DynamicParameters();
            parametros.Add("@usua_Id", item.usua_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@usua_Nombre", item.usua_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_EsAdmin", item.usua_EsAdmin, DbType.Boolean, direction: ParameterDirection.Input);
            parametros.Add("@role_Id", item.role_Id, DbType.Int32, direction: ParameterDirection.Input);
            parametros.Add("@empe_Id", item.empe_Id, DbType.Int32, direction: ParameterDirection.Input);
            parametros.Add("@usua_IdModificacion", item.usua_IdModificacion, DbType.Int32, direction: ParameterDirection.Input);

            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.UpdateUsuario, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado update"
            };

            return request;
        }

        public tbUsuarios ValidarLogin(tbUsuarios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@usua_Nombre", item.usua_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_Clave", item.usua_Clave, DbType.String, ParameterDirection.Input);

            return db.QueryFirst<tbUsuarios>(ScriptsDataBase.ValidarLogin, parametros, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus ValidarUserNameExiste(string username)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@usua_Nombre", username, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ValidarUsernameExiste, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Id Usuario"
            };

            return request;
        }

        public RequestStatus ActualizarContrasenia(tbUsuarios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@usua_Nombre", item.usua_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@usua_Clave", item.usua_Clave, DbType.String, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ActualizarContrasenia, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Estado Actualizacion"
            };

            return request;
        }

        public IEnumerable<tbUsuarios> EmpleadosNoTienenUsuario()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            return db.Query<tbUsuarios>(ScriptsDataBase.EmpleadosNoTienenUsuario, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus ValidarUsuariosPoseenRol(int role_Id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);

            var parametros = new DynamicParameters();

            parametros.Add("@role_Id", role_Id, DbType.Int32, ParameterDirection.Input);

            var resultado = db.QueryFirst<int>(ScriptsDataBase.ValidarUsuariosPoseenRol, parametros, commandType: CommandType.StoredProcedure);

            RequestStatus request = new()
            {
                CodeStatus = resultado,
                MessageStatus = "Usuarios poseen rol"
            };

            return request;
        }

        public tbUsuarios CargarDatosUsuario(tbUsuarios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametro = new DynamicParameters();
            parametro.Add("@usua_Id", item.usua_Id, DbType.Int32, ParameterDirection.Input);
            return db.QueryFirst<tbUsuarios>(ScriptsDataBase.CargarDatosUsuario, parametro, commandType: CommandType.StoredProcedure);
        }

    }
}
