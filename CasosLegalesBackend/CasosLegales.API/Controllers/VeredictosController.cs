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
    public class VeredictosController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper; 
       
        public VeredictosController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(VeredictoViewModel item)
        {
            var response = _casosLegalesService.InsertarVeredicto(_mapper.Map<tbVeredictos>(item));
            return Ok(response);
        }

        [HttpGet("ObtenerPorIdCaso")]
        public IActionResult ObtenerPorIdCaso (int id)
        {
            var response = _casosLegalesService.ObtenerVeredictoPorIdCaso(id);

            response.Data = _mapper.Map<VeredictoViewModel>(response.Data);

            return Ok(response);
        }
    }
}
