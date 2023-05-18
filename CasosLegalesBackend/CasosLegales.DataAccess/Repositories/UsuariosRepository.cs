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
            throw new NotImplementedException();
        }

        public tbUsuarios Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbUsuarios> List()
        {
            using var db = new SqlConnection(CasosLegalesContext.ConnectionString);
            return db.Query<tbUsuarios>(ScriptsDataBase.ListadoUsuarios, null, commandType: CommandType.StoredProcedure);
        }

        public RequestStatus Update(tbUsuarios item)
        {
            throw new NotImplementedException();
        }
    }
}
