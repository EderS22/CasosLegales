using CasosLegales.DataAccess.Repositories;
using CasosLegales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasosLegales.BusinessLogic.Services
{
    public class CasosLegalesService
    {
        private readonly CivilesRepository _civilesRepository;

        public CasosLegalesService(CivilesRepository civilesRepository)
        {
            _civilesRepository = civilesRepository;
        }

        #region Civiles

        public ServiceResult ListadoCiviles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _civilesRepository.List();
                return result.Ok(list);
            }   
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarCiviles(tbCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _civilesRepository.Insert(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult EditarCiviles(tbCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _civilesRepository.Update(item);
                if (map.CodeStatus > 0)
                {
                    return result.Ok(map);
                }
                else
                {
                    map.MessageStatus = (map.CodeStatus == 0) ? "404 Error de consulta" : map.MessageStatus;
                    return result.Error(map);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ServiceResult EliminarCiviles(tbCiviles item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _civilesRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }

        public VW_tbCiviles BuscarCiviles(int? id)
        {
            try
            {
                var list = _civilesRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

    }
}
