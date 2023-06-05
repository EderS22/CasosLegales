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
    public class EvidenciasPorCasoController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public EvidenciasPorCasoController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }


        [HttpPost("Insertar")]
        public IActionResult Insert(EvidenciasPorCasoViewModel item)
        {
            var response = _casosLegalesService.InsertarEvidenciaPorCaso(_mapper.Map<tbEvidenciasPorCaso>(item));
            return Ok(response);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(EvidenciasPorCasoViewModel item)
        {
            var response = _casosLegalesService.EliminarEvidenciaPorCaso(_mapper.Map<tbEvidenciasPorCaso>(item));
            return Ok(response);
        }

        [HttpGet("ObtenerEvidenciasPorIdCaso")]
        public IActionResult ObtenerEvidenciasPorIdCaso(int id)
        {
            var response = _casosLegalesService.ObtenerEvidenciaPorIdCaso(id);

            response.Data = _mapper.Map<IEnumerable<EvidenciasPorCasoViewModel>>(response.Data);

            return Ok(response);
        }
    }
}
