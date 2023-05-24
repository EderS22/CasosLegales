using CasosLegales.DataAccess.Repositories;
using CasosLegales.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CasosLegales.BusinessLogic.Services
{
    public class AccesoService
    {
        private readonly UsuariosRepository _usuariosRepository;
        private readonly PantallasRepository _pantallasRepository;
        private readonly RolesRepository _rolesRepository;
        private readonly RolesPorPantallaRepository _rolesPorPantallaRepository;

        public AccesoService(UsuariosRepository usuariosRepository, PantallasRepository pantallasRepository, RolesRepository rolesRepository, RolesPorPantallaRepository rolesPorPantallaRepository)
        {
            _usuariosRepository = usuariosRepository;
            _pantallasRepository = pantallasRepository;
            _rolesRepository = rolesRepository;
            _rolesPorPantallaRepository = rolesPorPantallaRepository;
        }

        #region Usuarios
        public ServiceResult CargarUsuarioPorId(int id)
        {
            var resultado = new ServiceResult();

            try
            {
                var usuario = _usuariosRepository.Find(id);
                return resultado.Ok(usuario);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ListadoUsuarios()
        {
            var resultado = new ServiceResult();

            try
            {
                var usuario = _usuariosRepository.List();
                return resultado.Ok(usuario);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ValidarLogin(tbUsuarios item)
        {
            var resultado = new ServiceResult();

            try
            {
                var usuario = _usuariosRepository.ValidarLogin(item);
                return resultado.Ok(usuario);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ValidarUsernameExiste(string username)
        {
            var resultado = new ServiceResult();

            try
            {
                var usuario = _usuariosRepository.ValidarUserNameExiste(username);
                return resultado.Ok(usuario);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarContrasenia(tbUsuarios item)
        {
            var resultado = new ServiceResult();

            try
            {
                var usuario = _usuariosRepository.ActualizarContrasenia(item);
                return resultado.Ok(usuario);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ValidarUsuariosPoseenRol(int role_Id)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _usuariosRepository.ValidarUsuariosPoseenRol(role_Id);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult EmpleadosNoTienenUsuario()
        {
            var result = new ServiceResult();

            try
            {
                var list = _usuariosRepository.EmpleadosNoTienenUsuario();
                return result.Ok(list);
            }
            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult InsertarUsuario(tbUsuarios item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _usuariosRepository.Insert(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }


        public ServiceResult UpdateUsuario(tbUsuarios item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _usuariosRepository.Update(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult EliminarUsuario(tbUsuarios item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _usuariosRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {

                return resultado.Error(ex.Message);
            }
        }
        #endregion

        #region Roles
        public ServiceResult ListadoRoles()
        {
            var resultado = new ServiceResult();

            try
            {
                var roles = _rolesRepository.List();
                return resultado.Ok(roles);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult CargarRolPorId(int id)
        {
            var resultado = new ServiceResult();

            try
            {
                var roles = _rolesRepository.Find(id);
                return resultado.Ok(roles);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult GuardarNuevoRol(tbRoles item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _rolesRepository.Insert(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ActualizarRol(tbRoles item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _rolesRepository.Update(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult EliminarRol(tbRoles item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _rolesRepository.Delete(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ValidarRolExiste(string role_Nombre)
        {
            var resultado = new ServiceResult();

            try
            {
                var roles = _rolesRepository.ValidarRolExiste(role_Nombre);
                return resultado.Ok(roles);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }
        #endregion

        #region Pantallas
        public ServiceResult ListadoPantallasPorIdRolyAdmin(int role_Id, bool usua_EsAdmin)
        {
            var resultado = new ServiceResult();

            try
            {
                var pantallas = _pantallasRepository.ListadoPantallasPorIdRolyAdmin(role_Id, usua_EsAdmin);
                return resultado.Ok(pantallas);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult ListadoPantallasQueNoTieneRol(int role_Id)
        {
            var resultado = new ServiceResult();

            try
            {
                var pantallas = _pantallasRepository.ListadoPantallasQueNoTieneRol(role_Id);
                return resultado.Ok(pantallas);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult CargarPantallaPorId(int id)
        {
            var resultado = new ServiceResult();

            try
            {
                var roles = _pantallasRepository.Find(id);
                return resultado.Ok(roles);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        #endregion

        #region Roles por pantalla
        public ServiceResult ValidarRolTienePantalla(tbRolesPorPantalla item)
        {
            var resultado = new ServiceResult();

            try
            {
                var rol = _rolesPorPantallaRepository.ValidarRolTienePantalla(item);
                return resultado.Ok(rol);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult InsertarNuevoRopa(tbRolesPorPantalla item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _rolesPorPantallaRepository.Insert(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPantallasDeRol(tbRolesPorPantalla item)
        {
            var resultado = new ServiceResult();

            try
            {
                var respuesta = _rolesPorPantallaRepository.EliminarPantallasdeRol(item);
                return resultado.Ok(respuesta);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex.Message);
            }
        }
        #endregion
    }
}
