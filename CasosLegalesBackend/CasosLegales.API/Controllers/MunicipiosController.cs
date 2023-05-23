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
    public class MunicipiosController : ControllerBase
    {
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;

        public MunicipiosController(GeneralService generalService, IMapper mapper)
        {
            _generalService = generalService;
            _mapper = mapper;
        }


        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _generalService.ListadoMunicipios();
            return Ok(list);
        }

        [HttpPut("MunicipioDDL")]
        public IActionResult MunicipioDDL(int id)
        {
            var list = _generalService.MunicipioDDL(id);
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(MunicipioViewModel municipio)
        {
            var item = _mapper.Map<tbMunicipios>(municipio);
            var result = _generalService.EliminarMunicipios(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(MunicipioViewModel municipio)
        {
            var item = _mapper.Map<tbMunicipios>(municipio);
            var response = _generalService.InsertarMunicipios(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(MunicipioViewModel municipio)
        {
            var item = _mapper.Map<tbMunicipios>(municipio);
            var response = _generalService.EditarMunicipios(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _generalService.BuscarMunicipios(id);
            return Ok(list);
        }
    }
}
