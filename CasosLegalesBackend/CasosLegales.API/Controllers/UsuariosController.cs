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
    public class UsuariosController : ControllerBase
    {
        private readonly AccesoService _accesoService;
        private readonly IMapper _mapper;

        public UsuariosController(AccesoService accesoService, IMapper mapper)
        {
            _accesoService = accesoService;
            _mapper = mapper;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var respuesta = _accesoService.ListadoUsuarios();

            respuesta.Data = _mapper.Map<IEnumerable<UsuariosViewModel>>(respuesta.Data);

            return Ok(respuesta);
        }

        [HttpGet("Find/{id}")]
        public IActionResult Find(int id)
        {
            var respuesta = _accesoService.CargarUsuarioPorId(id);

            respuesta.Data = _mapper.Map<UsuariosViewModel>(respuesta.Data);

            return Ok(respuesta);
        }

        [HttpGet("ValidarUsuariosPoseenRol/{role_Id}")]
        public IActionResult ValidarUsuariosPoseenRol(int role_Id)
        {
            var respuesta = _accesoService.ValidarUsuariosPoseenRol(role_Id);

            return Ok(respuesta);
        }

        [HttpGet("ListarEmpleadosNoTienenUsuario")]
        public IActionResult ListarEmpleados()
        {
            var list = _accesoService.EmpleadosNoTienenUsuario();
            list.Data = _mapper.Map<IEnumerable<EmpleadoViewModel>>(list.Data);
            return Ok(list);
        }

        [HttpPost("Insert")]

        public IActionResult Insert(UsuariosViewModel usuariosViewModel)
        {
            var item = _mapper.Map<tbUsuarios>(usuariosViewModel);
            var respuesta = _accesoService.InsertarUsuario(item);
            return Ok(respuesta);
        }

        [HttpPost("Update")]

        public IActionResult UpdateUsuario(UsuariosViewModel usuariosViewModel)
        {
            var item = _mapper.Map<tbUsuarios>(usuariosViewModel);
            var respuesta = _accesoService.UpdateUsuario(item);
            return Ok(respuesta);
        }

        [HttpPost("Delete")]
        public IActionResult EliminarUsuario(UsuariosViewModel usuariosViewModel)
        {
            var item = _mapper.Map<tbUsuarios>(usuariosViewModel);
            var respuesta = _accesoService.EliminarUsuario(item);
            return Ok(respuesta);
        }

        [HttpGet("ValidarUsernameExiste/{username}")]
        public IActionResult ValidarUserNameExiste(string username)
        {
            var resultado = _accesoService.ValidarUsernameExiste(username);

            return Ok(resultado);
        }

    }
}
