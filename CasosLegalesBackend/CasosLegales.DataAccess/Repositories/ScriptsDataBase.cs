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

        #region GENERAL

            #region UDPS Departamentos  
                public static string InsertarDeparatemto        = "GRAL.UDP_tbDepartamentos_Insert";
                public static string ActualizarDepartamento     = "GRAL.UDP_tbDepartamentos_Update";
                public static string EliminarDepartamento       = "GRAL.UDP_tbDepartamentos_Delete";
                public static string ListadoDepartamento        = "GRAL.UDP_tbDepartamentos_Index";
                public static string CargarDepartamento         = "GRAL.UDP_tbDepartamentos_Find";
            #endregion
       
            #region UDPS Municipios  
                public static string InsertarMunicipio          = "GRAL.UDP_tbMunicipios_Insert";
                public static string ActualizarMunicipio        = "GRAL.UDP_tbMunicipios_Update";
                public static string EliminarMunicipio          = "GRAL.UDP_tbMunicipios_Delete";
                public static string ListadoMunicipios          = "GRAL.UDP_tbMunicipios_Index";
                public static string CargarMunicipios           = "GRAL.UDP_tbMunicipios_Find";
            #endregion

            #region UDPS Cargos  
                public static string InsertarCargo              = "GRAL.UDP_tbCargos_Insert";
                public static string ActualizarCargo            = "GRAL.UDP_tbCargos_Update";
                public static string EliminarCargo              = "GRAL.UDP_tbCargos_Delete";
                public static string ListadoCargos              = "GRAL.UDP_tbCargos_Index";
                public static string CargarCargos               = "GRAL.UDP_tbCargos_Find";
            #endregion

            #region UDPS Estados Civiles  
                public static string InsertarEstadoCivil        = "GRAL.UDP_tbEstadosCiviles_Insert";
                public static string ActualizarEstadoCivil      = "GRAL.UDP_tbEstadosCiviles_Update";
                public static string EliminarEstadoCivil        = "GRAL.UDP_tbEstadosCiviles_Delete";
                public static string ListadoEstadosCiviles      = "GRAL.UDP_tbEstadosCiviles_Index";
                public static string CargarEstadoCivil          = "GRAL.UDP_tbEstadosCiviles_Find";
            #endregion

        #endregion


    }
}
