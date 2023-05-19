namespace CasosLegales.DataAccess.Repositories
{
    public class ScriptsDataBase
    {
        #region ACCESO
        #region UDPS Usuarios
        public static string ValidarLogin = "ACCE.UDP_tbUsuarios_ValidarLogin";
        public static string ValidarUsernameExiste = "ACCE.UDP_tbUsuarios_ValidarUsernameExiste";
        public static string ActualizarContrasenia = "ACCE.UDP_tbUsuarios_ActualizarContrasenia";
        public static string ListadoUsuarios = "ACCE.UDP_tbUsuarios_Listado";
        public static string CargarUsuarioPorId = "ACCE.UDP_tbUsuarios_CargarUsuarioPorId";
        public static string ValidarUsuariosPoseenRol = "ACCE.UDP_tbUsuarios_ValidarUsuariosPoseenRol";

        public static string EmpleadosNoTienenUsuario = "ACCE.UDP_tbUsuarios_FacilitadorTieneUsuario";
        public static string InsertarUsuario = "ACCE.UDP_tbUsuarios_InsertarNuevoUsuario";
        public static string CargarDatosUsuario = "ACCE.UDP_tbUsuarios_CargarDatosUsuarios";
        public static string UpdateUsuario = "ACCE.UDP_tbUsuarios_EditarUsuarios";
        public static string EliminarUsuario = "ACCE.UDP_tbUsuarios_EliminarUsuario";
        #endregion

        #region UDPS Roles
        public static string ListadoRoles = "ACCE.UDP_tbRoles_Listado";
        public static string CargarRolPorId = "ACCE.UDP_tbRoles_CargarRolPorId";
        public static string ValidarRolExiste = "ACCE.UDP_tbRoles_ValidarRolExiste";
        public static string GuardarNuevoRol = "ACCE.UDP_tbRoles_GuardarNuevoRol";
        public static string EditarRol = "ACCE.UDP_tbRoles_EditarRol";
        public static string EliminarRol = "ACCE.UDP_tbRoles_EliminarRol";
        #endregion

        #region UDPS Pantallas
        public static string ListadoPantallasPorIdRolyAdmin = "ACCE.UDP_tbPantallas_PantallasPorIdRolyAdmin";
        public static string ListadoPantallasQueNoTieneRol = "ACCE.UDP_tbPantallas_PantallasQueNoTieneRol";
        public static string CargarPantallasPorId = "ACCE.UDP_tbPantallas_CargarPantallaPorId";
        #endregion

        #region UDPS Roles por pantalla
        public static string ValidarRolTienePantalla = "ACCE.UDP_tbRolesPorPantalla_ValidarRolTienePantalla";
        public static string GuardarNuevoRopa = "ACCE.UDP_tbRolesPorPantalla_GuardarNuevo";
        public static string EliminarPantallasDeRol = "ACCE.UDP_tbRolesPorPantalla_EliminarPantallasdeRol";
        #endregion

        #endregion
    }
}
