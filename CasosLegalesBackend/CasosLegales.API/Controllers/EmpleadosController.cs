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
    public class EmpleadosController : ControllerBase
    {

        private readonly CasosLegalesService _casosLegalesService;
        private readonly IMapper _mapper;

        public EmpleadosController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpGet("Listado")]
        public IActionResult List()
        {
            var list = _casosLegalesService.ListadoEmpleados();
            return Ok(list);
        }

        [HttpPost("Eliminar")]
        public IActionResult Delete(EmpleadoViewModel empleado)
        {
            var item = _mapper.Map<tbEmpleados>(empleado);
            var result = _casosLegalesService.EliminarEmpleados(item);
            return Ok(result);
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(EmpleadoViewModel empleado)
        {
            var item = _mapper.Map<tbEmpleados>(empleado);
            var response = _casosLegalesService.InsertarEmpleados(item);
            return Ok(response);
        }

        [HttpPost("Editar")]
        public IActionResult Update(EmpleadoViewModel empleado)
        {
            var item = _mapper.Map<tbEmpleados>(empleado);
            var response = _casosLegalesService.EditarEmpleados(item);
            return Ok(response);
        }

        [HttpGet("Buscar")]
        public IActionResult Find(int? id)
        {
            var list = _casosLegalesService.BuscarEmpleados(id);
            return Ok(list);
        }
    }
}
