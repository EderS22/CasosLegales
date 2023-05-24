using AutoMapper;
using CasosLegales.API.Models;
using CasosLegales.BusinessLogic.Services;
using CasosLegales.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposDeEvidenciaController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public TiposDeEvidenciaController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _casosLegalesService.ListadoTipodeEvidencia();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(TipoDeEvidenciaViewModel tipoDeEvidencia)
        {
            var item = _mapper.Map<tbTiposdeEvidencia>(tipoDeEvidencia);
            var result = _casosLegalesService.EliminarTipodeEvidencia(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(TipoDeEvidenciaViewModel tipoDeEvidencia)
        {
            var item = _mapper.Map<tbTiposdeEvidencia>(tipoDeEvidencia);
            var response = _casosLegalesService.InsertarTipodeEvidencia(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(TipoDeEvidenciaViewModel tipoDeEvidencia)
        {
            var item = _mapper.Map<tbTiposdeEvidencia>(tipoDeEvidencia);
            var response = _casosLegalesService.EditarTipodeEvidencia(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _casosLegalesService.BuscarTipodeEvidencia(id);
            return Ok(list);
        }
    }
}
