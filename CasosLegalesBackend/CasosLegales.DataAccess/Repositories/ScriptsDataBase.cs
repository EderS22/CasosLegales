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
                public static string InsertarUsuario = "ACCE.UDP_tbUsuarios_InsertarNuevoUsuario";
                public static string UpdateUsuario = "ACCE.UDP_tbUsuarios_EditarUsuarios";
                public static string EliminarUsuario = "ACCE.UDP_tbUsuarios_EliminarUsuario";
            #endregion

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
