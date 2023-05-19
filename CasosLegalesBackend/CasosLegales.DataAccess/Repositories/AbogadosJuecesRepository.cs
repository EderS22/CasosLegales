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
    public class AbogadosJuecesRepository : IRepository<tbAbogadosJueces, VW_tbAbogadosJueces>
    {
        public RequestStatus Delete(tbAbogadosJueces item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@abju_Id", item.abju_Id, DbType.Int32, ParameterDirection.Input);
          
            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarAbogadosJueces, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbAbogadosJueces Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@abju_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbAbogadosJueces>(ScriptsDataBase.CargarAbogadosJueces, parametros, commandType: System.Data.CommandType.StoredProcedure);

        }

        public RequestStatus Insert(tbAbogadosJueces item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@abju_DNI", item.abju_DNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Nombres", item.abju_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Apellidos", item.abju_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Sexo", item.abju_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Telefono", item.abju_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_CorreoElectronico", item.abju_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_FechaNacimiento", item.abju_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Id", item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_Direccion", item.abju_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_UsuCreacion", item.abju_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarAbogadosJueces, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbAbogadosJueces> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbAbogadosJueces>(ScriptsDataBase.ListadoAbogadosJueces, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbAbogadosJueces item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@abju_Id",                  item.abju_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_DNI",                 item.abju_DNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Nombres",             item.abju_Nombres, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Apellidos",           item.abju_Apellidos, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Sexo",                item.abju_Sexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_Telefono",            item.abju_Telefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_CorreoElectronico",   item.abju_CorreoElectronico, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_FechaNacimiento",     item.abju_FechaNacimiento, DbType.Date, ParameterDirection.Input);
            parametros.Add("@eciv_Id",                  item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@carg_Id",                  item.carg_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Id",                  item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@abju_Direccion",           item.abju_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@abju_UsuModificacion",     item.abju_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarAbogadosJueces, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
