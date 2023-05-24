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
    public class RolesController : ControllerBase
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public RolesController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var respuesta = _accesoService.ListadoRoles();

            respuesta.Data = _mapper.Map<IEnumerable<RolesViewModel>>(respuesta.Data);

            return Ok(respuesta);
        }

        [HttpPost("InsertarNuevoRol")]
        public IActionResult Insert(RolesViewModel item)
        {
            var respuesta = _accesoService.GuardarNuevoRol(_mapper.Map<tbRoles>(item));

            return Ok(respuesta);
        }

        [HttpPost("ActualizarRol")]
        public IActionResult Update(RolesViewModel item)
        {
            var respuesta = _accesoService.ActualizarRol(_mapper.Map<tbRoles>(item));

            return Ok(respuesta);
        }

        [HttpPost("EliminarRol")]
        public IActionResult Delete(RolesViewModel item)
        {
            var respuesta = _accesoService.EliminarRol(_mapper.Map<tbRoles>(item));

            return Ok(respuesta);
        }

        [HttpPost("ValidarRolExiste")]
        public IActionResult ValidarRolExiste(string role_Nombre)
        {
            var respuesta = _accesoService.ValidarRolExiste(role_Nombre);

            return Ok(respuesta);
        }
    }
}
