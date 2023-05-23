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
    public class MunicipiosRepository : IRepository<tbMunicipios, VW_tbMunicipios>
    {
        public RequestStatus Delete(tbMunicipios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
   
            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.EliminarMunicipio, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public VW_tbMunicipios Find(int? id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.QueryFirst<VW_tbMunicipios>(ScriptsDataBase.CargarMunicipios, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Insert(tbMunicipios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Nombre", item.muni_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Codigo", item.muni_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_Id", item.depa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_UsuCreacion", item.muni_UsuCreacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.InsertarMunicipio, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbMunicipios> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<VW_tbMunicipios>(ScriptsDataBase.ListadoMunicipios, null, commandType: System.Data.CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbMunicipios item)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_Nombre", item.muni_Nombre, DbType.String, ParameterDirection.Input);
            parametros.Add("@muni_Codigo", item.muni_Codigo, DbType.String, ParameterDirection.Input);
            parametros.Add("@depa_Id", item.depa_Id, DbType.Int32, ParameterDirection.Input);
            parametros.Add("@muni_UsuModificacion", item.muni_UsuModificacion, DbType.Int32, ParameterDirection.Input);

            var result = db.QueryFirst<RequestStatus>(ScriptsDataBase.ActualizarMunicipio, parametros, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<VW_tbMunicipios> MunicipioDDL(int id)
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            var parametros = new DynamicParameters();
            parametros.Add("@depa_Id", id, DbType.Int32, ParameterDirection.Input);

            return db.Query<VW_tbMunicipios>(ScriptsDataBase.UDP_tbMunicipios_DDL, parametros, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
