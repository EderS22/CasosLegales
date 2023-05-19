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
    public class TiposDeCasoController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public TiposDeCasoController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _casosLegalesService.ListadoTipoDeCaso();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(TipoDeCasoViewModel tipoDeCaso)
        {
            var item = _mapper.Map<tbTiposdeCaso>(tipoDeCaso);
            var result = _casosLegalesService.EliminarTipoDeCaso(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(TipoDeCasoViewModel tipoDeCaso)
        {
            var item = _mapper.Map<tbTiposdeCaso>(tipoDeCaso);
            var response = _casosLegalesService.InsertarTipoDeCaso(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(TipoDeCasoViewModel tipoDeCaso)
        {
            var item = _mapper.Map<tbTiposdeCaso>(tipoDeCaso);
            var response = _casosLegalesService.EditarTipoDeCaso(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _casosLegalesService.BuscarTipoDeCaso(id);
            return Ok(list);
        }
    }
}
