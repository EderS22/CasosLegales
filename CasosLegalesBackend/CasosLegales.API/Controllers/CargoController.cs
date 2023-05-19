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
    public class CargoController : ControllerBase
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;

        public CargoController(GeneralService generalService, IMapper mapper)
        {
            _generalService = generalService;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _generalService.ListadoCargos();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(CargoViewModel cliente)
        {
            var item = _mapper.Map<tbCargos>(cliente);
            var result = _generalService.EliminarCargos(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(CargoViewModel cliente)
        {
            var item = _mapper.Map<tbCargos>(cliente);
            var response = _generalService.InsertarCargos(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(CargoViewModel cliente)
        {
            var item = _mapper.Map<tbCargos>(cliente);
            var response = _generalService.EditarCargos(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _generalService.BuscarCargos(id);
            return Ok(list);
        }
    }
}
