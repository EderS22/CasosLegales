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
    public class PantallasController : ControllerBase
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public PantallasController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }

        [HttpPost("ListadoPantallasPorIdRol")]
        public IActionResult ListadoPantallasPorIdRol(UsuariosViewModel item)
        {
            var resultMapeado = _mapper.Map<tbUsuarios>(item);

            var respuesta = _accesoService.ListadoPantallasPorIdRolyAdmin(resultMapeado);

            var listado = _mapper.Map<IEnumerable<PantallasViewModel>>(respuesta.Data);
            
            respuesta.Data = listado;

            return Ok(respuesta);
        }

        [HttpGet("ListadoPantallasQueNoTieneRol/{role_Id}")]
        public IActionResult ListadoPantallasQueNoTieneRol(int role_Id)
        {
            var respuesta = _accesoService.ListadoPantallasQueNoTieneRol(role_Id);

            var listado = _mapper.Map<IEnumerable<PantallasViewModel>>(respuesta.Data);

            respuesta.Data = listado;

            return Ok(respuesta);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Find(int id)
        {
            var respuesta = _accesoService.CargarPantallaPorId(id);

            respuesta.Data = _mapper.Map<PantallasViewModel>(respuesta.Data);

            return Ok(respuesta);
        }
    }
}
