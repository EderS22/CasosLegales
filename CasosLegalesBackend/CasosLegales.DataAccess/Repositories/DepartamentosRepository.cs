using CasosLegales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasosLegales.DataAccess.Repositories
{
    public class DepartamentosRepository : IRepository<tbDepartamentos, VW_tbDepartamentos>
    {
        public RequestStatus Delete(tbDepartamentos item)
        {
            throw new NotImplementedException();
        }

        public VW_tbDepartamentos Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbDepartamentos item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VW_tbDepartamentos> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbDepartamentos item)
        {
            throw new NotImplementedException();
        }
    }
}
