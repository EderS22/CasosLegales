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
        private readonly EmpleadosRepository _empleadosRepository;
        private readonly TiposDeCasoRepository _tiposDeCasoRepository;
        private readonly AbogadosJuecesRepository _abogadosJuecesRepository;
        private readonly CasosRepository _casosRepository;
        private readonly AcusadoPorCasoRepository _acusadoPorCasoRepository;
        private readonly EvidenciasPorCasoRepository _evidenciasPorCasoRepository;
        private readonly TestigosPorCasoRepository _testigosPorCasoRepository;
        private readonly VeredictosRepository _veredictosRepository;
        private readonly DetallesVeredictosRepository _detallesVeredictosRepository;

        public CasosLegalesService(CivilesRepository civilesRepository,
                                   EmpleadosRepository empleadosRepository,
                                   TiposDeCasoRepository tiposDeCasoRepository,
                                   AbogadosJuecesRepository abogadosJuecesRepository,
                                   TiposDeEvidenciaRepository tiposDeEvidenciaRepository,
                                   EmpresasRepository empresasRepository,
                                   CasosRepository casosRepository,
                                   AcusadoPorCasoRepository acusadoPorCasoRepository,
                                   EvidenciasPorCasoRepository evidenciasPorCasoRepository,
                                   TestigosPorCasoRepository testigosPorCasoRepository,
                                   VeredictosRepository veredictosRepository,
                                   DetallesVeredictosRepository detallesVeredictosRepository)
        {
            _tiposDeEvidenciaRepository = tiposDeEvidenciaRepository;
            _civilesRepository = civilesRepository;
            _empresasRepository = empresasRepository;
            _empleadosRepository = empleadosRepository;
            _tiposDeCasoRepository = tiposDeCasoRepository;
            _abogadosJuecesRepository = abogadosJuecesRepository;
            _casosRepository = casosRepository;
            _acusadoPorCasoRepository = acusadoPorCasoRepository;
            _evidenciasPorCasoRepository = evidenciasPorCasoRepository;
            _testigosPorCasoRepository = testigosPorCasoRepository;
            _veredictosRepository = veredictosRepository;
            _detallesVeredictosRepository = detallesVeredictosRepository;
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
            catch (Exception e)
            {
                return result.Error(e.Message);
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

        #region Empleados

        public ServiceResult ListadoEmpleados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _empleadosRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Insert(item);
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
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EditarEmpleados(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _empleadosRepository.Update(item);
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

        public ServiceResult EliminarEmpleados(tbEmpleados item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _empleadosRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }

        public VW_tbEmpleados BuscarEmpleados(int? id)
        {
            try
            {
                var list = _empleadosRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Tipos de Caso

        public ServiceResult ListadoTipoDeCaso()
        {
            var result = new ServiceResult();
            try
            {
                var list = _tiposDeCasoRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarTipoDeCaso(tbTiposdeCaso item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _tiposDeCasoRepository.Insert(item);
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
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EditarTipoDeCaso(tbTiposdeCaso item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _tiposDeCasoRepository.Update(item);
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
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarTipoDeCaso(tbTiposdeCaso item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _tiposDeCasoRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }

        public VW_tbTiposdeCaso BuscarTipoDeCaso(int? id)
        {
            try
            {
                var list = _tiposDeCasoRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Jueces Abogados
        public ServiceResult ListadoJuecesAbogados()
        {
            var result = new ServiceResult();
            try
            {
                var list = _abogadosJuecesRepository.List();
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult InsertarJuecesAbogados(tbAbogadosJueces item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _abogadosJuecesRepository.Insert(item);
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
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EditarJuecesAbogados(tbAbogadosJueces item)
        {
            var result = new ServiceResult();
            try
            {
                var map = _abogadosJuecesRepository.Update(item);
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
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EliminarJuecesAbogados(tbAbogadosJueces item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _abogadosJuecesRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }

        public VW_tbAbogadosJueces BuscarJuecesAbogados(int? id)
        {
            try
            {
                var list = _abogadosJuecesRepository.Find(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public ServiceResult DdlAbogados()
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _abogadosJuecesRepository.DdlAbogados();

                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult DdlJueces()
        {
            var resultado = new ServiceResult();

            try
            {
                var list = _abogadosJuecesRepository.DdlJueces();

                return resultado.Ok(list);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }
        #endregion

        #region Casos
        public ServiceResult InsertarCaso(tbCasos item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _casosRepository.Insert(item);
                return result.Ok(response);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        } 
        public VW_tbCasos DatosReporte(int? id)
        {
            try
            {
                var list = _casosRepository.DatosReporte(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        #region Acusados por caso 
        public ServiceResult InsertarAcusadoPorCaso(tbAcusadoPorCaso item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _acusadoPorCasoRepository.Insert(item);
                return result.Ok(response);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult AcusadoPorCasoReporte(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _acusadoPorCasoRepository.AcusadoPorCasoReporte(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Testigos por caso

        public ServiceResult InsertarTestigoPorCaso(tbTestigosPorCaso item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _testigosPorCasoRepository.Insert(item);
                return result.Ok(response);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult TestigosPorCasoReporte(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _testigosPorCasoRepository.TestogosPorCasoReporte(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Evidencias por caso

        public ServiceResult InsertarEvidenciaPorCaso(tbEvidenciasPorCaso item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _evidenciasPorCasoRepository.Insert(item);
                return result.Ok(response);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public ServiceResult EvidenciaPorCasoReporte(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _evidenciasPorCasoRepository.EvidenciaPorCasoReporte(id);
                return result.Ok(list);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion

        #region Veredictos

        public ServiceResult InsertarVeredicto(tbVeredictos item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _veredictosRepository.Insert(item);
                return result.Ok(response);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        public tbVeredictos VeredictosReporte(int? id)
        {
            try
            {
                var list = _veredictosRepository.VeredictosReprte(id);
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region DetallesVeredictos
        public ServiceResult InsertarDetalleVeredicto(tbDetallesVeredictos item)
        {
            var result = new ServiceResult();
            try
            {
                var response = _detallesVeredictosRepository.Insert(item);
                return result.Ok(response);
            }
            catch (Exception e)
            {
                return result.Error(e.Message);
            }
        }

        #endregion
    }
}
