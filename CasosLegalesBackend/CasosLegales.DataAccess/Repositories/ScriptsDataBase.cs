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
    }
}
