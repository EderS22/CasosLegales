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
    public class EmpresasController : ControllerBase
    {

        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public EmpresasController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _casosLegalesService.ListadoEmpresas();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(EmpresaViewModel empresa)
        {
            var item = _mapper.Map<tbEmpresas>(empresa);
            var result = _casosLegalesService.EliminarEmpresas(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EmpresaViewModel empresa)
        {
            var item = _mapper.Map<tbEmpresas>(empresa);
            var response = _casosLegalesService.InsertarEmpresa(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(EmpresaViewModel empresa)
        {
            var item = _mapper.Map<tbEmpresas>(empresa);
            var response = _casosLegalesService.EditarEmpresas(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _casosLegalesService.BuscarEmpresas(id);
            return Ok(list);
        }
    }
}

