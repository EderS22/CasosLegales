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
    public class LoginController : ControllerBase
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public LoginController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }

        [HttpPost("ValidarLogin")]
        public IActionResult ValidarLogin(string usua_Nombre, string usua_Clave)
        {
            tbUsuarios resultMapeado = new()
            {
                usua_Nombre = usua_Nombre,
                usua_Clave = usua_Clave
            };

            var respuesta = _accesoService.ValidarLogin(resultMapeado);
            respuesta.Data = _mapper.Map<UsuariosViewModel>(respuesta.Data);
            return Ok(respuesta);
        }

        [HttpGet("ValidarUsernameExiste/{username}")]
        public IActionResult ValidarUserNameExiste(string username)
        {
            var resultado = _accesoService.ValidarUsernameExiste(username);

            return Ok(resultado);
        }


        [HttpPost("ActualizarContrasenia")]
        public IActionResult ActualizarContrasenia(UsuariosViewModel item)
        {
            var resultMapeado = _mapper.Map<tbUsuarios>(item);

            var respuesta = _accesoService.ActualizarContrasenia(resultMapeado);

            return Ok(respuesta);
        }
    }
}
