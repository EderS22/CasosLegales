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
    public class CivilesController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public CivilesController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _casosLegalesService.ListadoCiviles();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(CivilesViewModel cliente)
        {
            var item = _mapper.Map<tbCiviles>(cliente);
            var result = _casosLegalesService.EliminarCiviles(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(CivilesViewModel civil)
        {
            var item = _mapper.Map<tbCiviles>(civil);
            var response = _casosLegalesService.InsertarCiviles(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(CivilesViewModel civil)
        {
            var item = _mapper.Map<tbCiviles>(civil);
            var response = _casosLegalesService.EditarCiviles(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _casosLegalesService.BuscarCiviles(id);
            return Ok(list);
        }
    }
}

