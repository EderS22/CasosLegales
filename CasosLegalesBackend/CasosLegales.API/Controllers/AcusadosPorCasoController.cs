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
    public class AcusadosPorCasoController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public AcusadosPorCasoController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(AcusadoPorCasoViewModel item)
        {
            var response = _casosLegalesService.InsertarAcusadoPorCaso(_mapper.Map<tbAcusadoPorCaso>(item));
            return Ok(response);
        }

        [HttpGet("AcusadoPorCasoReporte")]
        public IActionResult AcusadoPorCasoReporte(int? id)
        {
            var list = _casosLegalesService.AcusadoPorCasoReporte(id);
            return Ok(list);
        }
    }
}
