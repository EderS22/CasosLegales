﻿using CasosLegales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasosLegales.DataAccess.Repositories
{
    public class EmpresasRepository : IRepository<tbEmpresas, tbEmpresas>
    {
        public RequestStatus Delete(tbEmpresas item)
        {
            throw new NotImplementedException();
        }

        public tbEmpresas Find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insert(tbEmpresas item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<tbEmpresas> List()
        {
            throw new NotImplementedException();
        }

        public RequestStatus Update(tbEmpresas item)
        {
            throw new NotImplementedException();
        }
    }
}