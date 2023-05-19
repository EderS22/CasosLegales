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
    public class EstadosCivilesController : ControllerBase
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;

        public EstadosCivilesController(GeneralService generalService, IMapper mapper)
        {
            _generalService = generalService;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _generalService.ListadoEstadosCivile();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(EstadoCivilViewModel estadoCivil)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estadoCivil);
            var result = _generalService.EliminarEstadosCiviles(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EstadoCivilViewModel estadoCivil)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estadoCivil);
            var response = _generalService.InsertarEstadosCiviles(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(EstadoCivilViewModel estadoCivil)
        {
            var item = _mapper.Map<tbEstadosCiviles>(estadoCivil);
            var response = _generalService.EditarEstadosCiviles(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _generalService.BuscarEstadosCiviles(id);
            return Ok(list);
        }
    }
}
