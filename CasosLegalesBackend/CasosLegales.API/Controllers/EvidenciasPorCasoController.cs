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

        [HttpGet("ReporteEvidenciaPorCaso")]
        public IActionResult EvidenciaPorCasoReporte(int? id)
        {
            var list = _casosLegalesService.EvidenciaPorCasoReporte(id);
            return Ok(list);
        }
    }
}
