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
    public class EmpresasRepository : IRepository<tbEmpresas, VW_tbEmpresas>
    {
        public RequestStatus Delete(tbEmpresas item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@emsa_Id", item.emsa_Id, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarEmpresas, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbEmpresas Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@emsa_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbEmpresas>(ScriptsDataBase.CargarEmpresas, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbEmpresas item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@emsa_Nombre", item.emsa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RNT", item.emsa_RNT, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_Direccion", item.emsa_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteNombre", item.emsa_RepresentanteNombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteDNI", item.emsa_RepresentanteDNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteTelefono", item.emsa_RepresentanteTelefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteSexo", item.emsa_RepresentanteSexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@emsa_EsDemandante", item.emsa_EsDemandante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@emsa_EsAcusado", item.emsa_EsAcusado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@emsa_UsuCreacion", item.emsa_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarEmpresas, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbEmpresas> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbEmpresas>(ScriptsDataBase.ListadoEmpresas, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbEmpresas item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@emsa_Id", item.emsa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@emsa_Nombre", item.emsa_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RNT", item.emsa_RNT, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Id", item.muni_Id, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_Direccion", item.emsa_Direccion, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteNombre", item.emsa_RepresentanteNombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteDNI", item.emsa_RepresentanteDNI, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteTelefono", item.emsa_RepresentanteTelefono, DbType.String, ParameterDirection.Input);
            parametros.Add("@emsa_RepresentanteSexo", item.emsa_RepresentanteSexo, DbType.String, ParameterDirection.Input);
            parametros.Add("@eciv_Id", item.eciv_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@emsa_EsDemandante", item.emsa_EsDemandante, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@emsa_EsAcusado", item.emsa_EsAcusado, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@emsa_UsuModificacion", item.emsa_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarEmpresas, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
