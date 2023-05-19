using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CasosLegales.API.Models;
using CasosLegales.BusinessLogic.Services;
using CasosLegales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesPorPantallaController : ControllerBase
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public RolesPorPantallaController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }


        [HttpPost("ValidarRolTienePantalla")]
        public IActionResult ValidarRolTienePantalla(RolesPorPantallaViewModel item)
        {
            var resultMapeado = _mapper.Map<tbRolesPorPantalla>(item);

            var respuesta = _accesoService.ValidarRolTienePantalla(resultMapeado);

            return Ok(respuesta);
        }


        [HttpPost("Insert")]
        public IActionResult Insert(RolesPorPantallaViewModel item)
        {
            var resultMapeado = _mapper.Map<tbRolesPorPantalla>(item);

            var respuesta = _accesoService.InsertarNuevoRopa(resultMapeado);

            return Ok(respuesta);
        }


        [HttpPost("EliminarPantallasdeRol")]
        public IActionResult EliminarPantallasdeRol(RolesPorPantallaViewModel item)
        {
            var resultMapeado = _mapper.Map<tbRolesPorPantalla>(item);

            var respuesta = _accesoService.EliminarPantallasDeRol(resultMapeado);

            return Ok(respuesta);
        }

    }
}
