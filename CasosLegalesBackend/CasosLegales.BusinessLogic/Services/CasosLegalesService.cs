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
        private readonly TiposDeEvidenciaRepository _tiposDeEvidenciaRepository;
        private readonly CivilesRepository _civilesRepository;
        private readonly EmpresasRepository _empresasRepository;

        public CasosLegalesService(TiposDeEvidenciaRepository tiposDeEvidenciaRepository,
                                   CivilesRepository civilesRepository, 
                                   EmpresasRepository empresasRepository)
        {
            _tiposDeEvidenciaRepository = tiposDeEvidenciaRepository;
            _civilesRepository = civilesRepository;
            _empresasRepository = empresasRepository;
        }

        #region Tipos de Evidencias

        public ServiceResult ListadoTipodeEvidencia()
        {
            var result = new ServiceResult();
            try
            {
                var list = _tiposDeEvidenciaRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarTipodeEvidencia(tbTiposdeEvidencia item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _tiposDeEvidenciaRepository.Insert(item);
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

        public ServiceResult EditarTipodeEvidencia(tbTiposdeEvidencia item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _tiposDeEvidenciaRepository.Update(item);
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

        public ServiceResult EliminarTipodeEvidencia(tbTiposdeEvidencia item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _tiposDeEvidenciaRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }

        public VW_tbTiposdeEvidencia BuscarTipodeEvidencia(int? id)
        {
            try
            {
                var list = _tiposDeEvidenciaRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Empresas

        public ServiceResult ListadoEmpresas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empresasRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarEmpresa(tbEmpresas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empresasRepository.Insert(item);
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

        public ServiceResult EditarEmpresas(tbEmpresas item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empresasRepository.Update(item);
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

        public ServiceResult EliminarEmpresas(tbEmpresas item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _empresasRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }

        public VW_tbEmpresas BuscarEmpresas(int? id)
        {
            try
            {
                var list = _empresasRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

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
