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
    public class CasosController : ControllerBase
    {

        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public CasosController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(CasoViewModel item)
        {
            var response = _casosLegalesService.InsertarCaso(_mapper.Map<tbCasos>(item));
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(CasoViewModel item)
        {
            var response = _casosLegalesService.EditarCaso(_mapper.Map<tbCasos>(item));
            return Ok(response);
        }

        [HttpGet("List")]
        public IActionResult Listado()
        {
            var response = _casosLegalesService.ListadoCasos();

            response.Data = _mapper.Map<IEnumerable<CasoViewModel>>(response.Data);

            return Ok(response);
        }

        [HttpGet("ObtenerCasoPorId")]
        public IActionResult Find(int id)
        {
            var response = _casosLegalesService.ObtenerCasoPorId(id);
            
            response.Data = _mapper.Map<CasoViewModel>(response.Data);

            return Ok(response);
        }
        
        [HttpGet("BuscarDatosReporte")]
        public IActionResult Find(int? id)
        {
            var list = _casosLegalesService.DatosReporte(id);
            return Ok(list);
        }
    }
}
