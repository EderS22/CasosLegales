/*
USE MASTER
*/

USE DB_CasosLegales
GO

--***********************************************************TABLES ACCE***********************************************************--

--**********************************************************TABLE Usuarios*********************************************************--

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_Listado
AS
BEGIN
	SELECT usua_Id,
		   usua_Nombre,
		   tb1.role_Id,
		   role_Nombre,
		   tb1.empe_Id,
		   empe_Nombres,
		   empe_Apellidos,		   
		   usua_EsAdmin,
		   usua_img
	  FROM ACCE.tbUsuarios tb1
 LEFT JOIN ACCE.tbRoles tb2
		ON tb1.role_Id = tb2.role_Id
INNER JOIN CALE.tbEmpleados tb3
		ON tb1.empe_Id = tb3.empe_Id
	 WHERE usua_Estado = 1
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_CargarUsuarioPorId
	@usua_Id	INT
AS
BEGIN
	SELECT tb1.usua_Id,
		   tb1.usua_Nombre,
		   tb1.role_Id,
		   role_Nombre,
		   tb1.empe_Id,
		   empe_Nombres,
		   empe_Apellidos,
		   tb1.usua_EsAdmin,
		   tb1.usua_img,
		   tb1.usua_IdCreacion,
		   tb4.usua_Nombre usua_NombreCreacion,
		   tb1.usua_FechaCreacion,
		   tb1.usua_IdModificacion,
		   tb5.usua_Nombre usua_NombreModificacion,
		   tb1.usua_FechaModificacion
	  FROM ACCE.tbUsuarios tb1
 LEFT JOIN ACCE.tbRoles tb2
		ON tb1.role_Id = tb2.role_Id
INNER JOIN CALE.tbEmpleados tb3
		ON tb1.empe_Id = tb3.empe_Id
INNER JOIN ACCE.tbUsuarios tb4
		ON tb1.usua_IdCreacion = tb4.usua_Id
 LEFT JOIN ACCE.tbUsuarios tb5
		ON tb1.usua_IdModificacion = tb5.usua_Id
	 WHERE tb1.usua_Estado = 1
	   AND tb1.usua_Id = @usua_Id
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_ValidarExisteUsername
	@usua_Nombre NVARCHAR(255)
AS
BEGIN
	SELECT usua_Id
	  FROM ACCE.tbUsuarios
	 WHERE usua_Nombre = @Usua_Nombre 
	   AND usua_Estado = 1
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_ValidarLogin
	@usua_Nombre  NVARCHAR(255),
	@usua_Clave   NVARCHAR(255)
AS
BEGIN
	BEGIN TRY
		DECLARE @Pass AS NVARCHAR(MAX), @usua_Id INT
		SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @usua_Clave), 2)
		
		SELECT @usua_Id = usua_Id 
		  FROM ACCE.tbUsuarios 
		 WHERE usua_Nombre = @usua_Nombre 
		   AND usua_Clave = @Pass
		   AND usua_Estado = 1

		   IF @usua_Id > 0
		   BEGIN
				SELECT usua_Id,
					   usua_Nombre,
					   tb1.role_Id,
					   role_Nombre,
					   tb1.empe_Id,
					   empe_Nombres,
					   empe_Apellidos,		   
					   usua_EsAdmin,
					   usua_img
				  FROM ACCE.tbUsuarios tb1
			INNER JOIN CALE.tbEmpleados tb2
					ON tb1.empe_Id = tb2.empe_Id
			INNER JOIN ACCE.tbRoles tb3
					ON tb1.role_Id = tb3.role_Id
				 WHERE usua_Nombre = @usua_Nombre AND usua_Clave = @Pass
				   AND usua_Estado = 1
		   END
		   ELSE
		   BEGIN
				SELECT 0
		   END
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_ValidarUsernameExiste
	@usua_Nombre  NVARCHAR(255)
AS
BEGIN
	DECLARE @usua_Id INT

	SELECT @usua_Id = usua_Id 
	  FROM ACCE.tbUsuarios 
	 WHERE usua_Nombre = @usua_Nombre
	   AND usua_Estado = 1

	   IF @usua_Id > 0
	   BEGIN
			SELECT @usua_Id
	   END
	   ELSE
	   BEGIN
			SELECT 0
	   END
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_ActualizarContrasenia
	@usua_Nombre		NVARCHAR(255),
	@usua_Clave			NVARCHAR(255)
AS
BEGIN
	BEGIN TRY

		BEGIN TRAN
			DECLARE @Pass AS NVARCHAR(MAX);
			SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @usua_Clave), 2);

			UPDATE ACCE.tbUsuarios 
			   SET usua_Clave = @Pass
			 WHERE usua_Nombre = @usua_Nombre
			   AND usua_Estado = 1

		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_ValidarUsuariosPoseenRol
	@role_Id	INT
AS
BEGIN
	DECLARE @usua_Id INT

	SELECT TOP 1 @usua_Id = usua_Id 
		  FROM ACCE.tbUsuarios 
		 WHERE role_Id = @role_Id

	IF @usua_Id > 0
	BEGIN	
		SELECT 1
	END
	ELSE
	BEGIN
		SELECT 0
	END
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_InsertarNuevoUsuario
	 @usua_Nombre		NVARCHAR(255),
	 @usua_Clave        NVARCHAR(255),
	 @role_Id			INT,
	 @empe_Id			INT,
	 @usua_EsAdmin      INT,
	 @usua_img			NVARCHAR(MAX),
	 @usua_IdCreacion   INT
AS
BEGIN
	BEGIN TRY

		 BEGIN TRAN 
			 DECLARE @Pass AS NVARCHAR(MAX);
			 SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Usua_Clave), 2);

			
			 IF @role_Id = 0
			 BEGIN 
				 INSERT INTO ACCE.tbUsuarios(usua_Nombre,usua_Clave,empe_Id,usua_EsAdmin,usua_img,usua_Estado,usua_IdCreacion)
				 VALUES (@usua_Nombre, @Pass, @empe_Id, @usua_EsAdmin,@usua_img, 1, @usua_IdCreacion)
			 END
			 ELSE
			 BEGIN
				 INSERT INTO ACCE.tbUsuarios(usua_Nombre,usua_Clave,role_Id,empe_Id,usua_EsAdmin,usua_img,usua_Estado,usua_IdCreacion)
				 VALUES (@usua_Nombre, @Pass, @role_Id, @empe_Id, @usua_EsAdmin,@usua_img, 1, @usua_IdCreacion)
			 END
			 
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH 
		ROLLBACK
	    SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_EmpleadosNoTienenUsuario
AS
BEGIN
	SELECT empe_Id,
		   empe_Nombres,
		   empe_Apellidos
	  FROM CALE.tbEmpleados
	 WHERE empe_Estado = 1
	   AND empe_Id NOT IN (SELECT empe_Id 
							  FROM ACCE.tbUsuarios 
							 WHERE usua_Estado = 1)
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_EditarUsuarios
	@usua_Id				INT,
	@usua_Nombre			NVARCHAR(250),
	@usua_Clave				NVARCHAR(300),
	@usua_EsAdmin			BIT,
	@usua_img				NVARCHAR(MAX),
	@role_Id				INT,
	@empe_Id				INT,
	@usua_IdModificacion	INT
AS
BEGIN
	BEGIN TRY

		BEGIN TRAN 
			
			IF @role_Id = 0
			BEGIN 
				IF(@usua_Clave != ' ')
					BEGIN
							DECLARE @Pass AS NVARCHAR(MAX);
							SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Usua_Clave), 2);
						
						UPDATE ACCE.tbUsuarios
						   SET usua_Nombre = @usua_Nombre,
							   usua_Clave = @Pass,
							   usua_EsAdmin = @usua_EsAdmin,
							   usua_img = @usua_img,
							   empe_Id = @empe_Id,
							   usua_IdModificacion = @usua_IdModificacion,
							   usua_FechaModificacion = GETDATE()
						 WHERE usua_Id = @usua_Id
					END
				ELSE
					BEGIN
						UPDATE ACCE.tbUsuarios
						   SET usua_Nombre = @usua_Nombre,
							   usua_EsAdmin = @usua_EsAdmin,
							   usua_img = @usua_img,
							   empe_Id = @empe_Id,
							   usua_IdModificacion = @usua_IdModificacion,
							   usua_FechaModificacion = GETDATE()
						 WHERE usua_Id = @usua_Id
					END
			END
			ELSE
			BEGIN
				DECLARE @Pass2 AS NVARCHAR(MAX);
				SET @Pass2 = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Usua_Clave), 2);

				IF(@usua_Clave != ' ')
				 BEGIN
						UPDATE ACCE.tbUsuarios
						   SET usua_Nombre = @usua_Nombre,
							   usua_Clave = @Pass2,
							   usua_EsAdmin = @usua_EsAdmin,
							   usua_img = @usua_img,
							   role_Id = @role_Id,
							   empe_Id = @empe_Id,
							   usua_IdModificacion = @usua_IdModificacion,
							   usua_FechaModificacion = GETDATE()
						 WHERE usua_Id = @usua_Id
				 END
				ELSE
				 BEGIN 
					UPDATE ACCE.tbUsuarios
						   SET usua_Nombre = @usua_Nombre,
							   usua_EsAdmin = @usua_EsAdmin,
							   usua_img = @usua_img,
							   role_Id = @role_Id,
							   empe_Id = @empe_Id,
							   usua_IdModificacion = @usua_IdModificacion,
							   usua_FechaModificacion = GETDATE()
						 WHERE usua_Id = @usua_Id
				 END
				
			END
		
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH 
	END
GO


CREATE OR ALTER PROCEDURE ACCE.UDP_tbUsuarios_EliminarUsuario
	@usua_Id			INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			DELETE FROM	ACCE.tbUsuarios
				  WHERE usua_Id = @usua_Id
		
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

--*********************************************************/TABLE Usuarios*********************************************************--

--**********************************************************TABLE Roles************************************************************--

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRoles_Listado
AS
BEGIN
	SELECT role_Id,
		   role_Nombre,
		   role_Descripcion
	  FROM ACCE.tbRoles
	 WHERE role_Estado = 1
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRoles_CargarRolPorId
	@role_Id	INT
AS
BEGIN
	SELECT tb1.role_Id,
		   role_Nombre,
		   role_Descripcion,
		   tb1.usua_IdCreacion,
		   tb2.usua_Nombre usua_NombreCreacion,
		   role_FechaCreacion,
		   tb1.usua_IdModificacion,
		   tb3.usua_Nombre usua_NombreModificacion,
		   role_FechaModificacion
	  FROM ACCE.tbRoles tb1
INNER JOIN ACCE.tbUsuarios tb2
		ON tb1.usua_IdCreacion = tb2.usua_Id
 LEFT JOIN ACCE.tbUsuarios tb3
		ON tb1.usua_IdModificacion = tb3.usua_Id
	 WHERE role_Estado = 1
	   AND tb1.role_Id = @role_Id
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRoles_ValidarRolExiste
	@role_Nombre	NVARCHAR(150)
AS
BEGIN
	DECLARE @role_Id INT

	SELECT @role_Id = role_Id
	  FROM ACCE.tbRoles
	 WHERE role_Nombre = @role_Nombre
	   AND role_Estado = 1

	IF @role_Id > 0
	BEGIN
		SELECT @role_Id
	END
	ELSE
	BEGIN
		SELECT 0
	END
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRoles_GuardarNuevoRol
	@role_Nombre		NVARCHAR(150),
	@role_Descripcion	NVARCHAR(255),
	@usua_IdCreacion	INT
AS
BEGIN
	BEGIN TRY

		BEGIN TRAN
			DECLARE @role_Id INT

			SELECT @role_Id = role_Id FROM ACCE.tbRoles WHERE role_Nombre = @role_Nombre AND role_Estado = 0

			IF @role_Id > 0
			BEGIN
				
				UPDATE ACCE.tbRoles
				   SET role_Estado = 1,
				       role_Descripcion = @role_Descripcion,
				       usua_IdModificacion = @usua_IdCreacion,
					   role_FechaModificacion = GETDATE()
				 WHERE role_Id = @role_Id
			END
			ELSE
			BEGIN
				INSERT INTO ACCE.tbRoles (role_Nombre, role_Descripcion, usua_IdCreacion)
				VALUES (@role_Nombre, @role_Descripcion, @usua_IdCreacion)
				
				SELECT TOP 1 @role_Id = role_Id FROM ACCE.tbRoles WHERE role_Estado = 1 ORDER BY role_Id DESC
			END

		COMMIT
		SELECT @role_Id
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRoles_EditarRol
	@role_Id				INT,
	@role_Nombre			NVARCHAR(150),
	@role_Descripcion		NVARCHAR(255),
	@usua_IdModificacion	INT
AS
BEGIN
	BEGIN TRY
	
		BEGIN TRAN
			UPDATE ACCE.tbRoles
			   SET role_Nombre = @role_Nombre,
				   role_Descripcion = @role_Descripcion,
				   usua_IdModificacion = @usua_IdModificacion,
				   role_FechaModificacion = GETDATE()
			 WHERE role_Id = @role_Id
		
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRolesPorPantalla_EliminarPantallasdeRol
	@role_Id				INT,
	@usua_IdModificacion	INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			UPDATE ACCE.tbRolesPorPantalla
			   SET ropa_Estado = 0,
				   usua_IdModificacion = @usua_IdModificacion,
				   ropa_FechaModificacion = GETDATE()
			 WHERE role_Id = @role_Id
		
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRoles_EliminarRol
	@role_Id				INT,
	@usua_IdModificacion	INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			 UPDATE ACCE.tbRoles
				SET role_Estado = 0,
					usua_IdModificacion = @usua_IdModificacion,
					role_FechaModificacion = GETDATE()
			  WHERE role_Id = @role_Id
			  EXEC ACCE.UDP_tbRolesPorPantalla_EliminarPantallasdeRol @role_Id, @usua_IdModificacion
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

--*********************************************************/TABLE Roles************************************************************--

--********************************************************TABLE Pantallas**********************************************************--

CREATE OR ALTER PROCEDURE ACCE.UDP_tbPantallas_PantallasPorIdRolyAdmin
	@role_Id		INT,
	@usua_EsAdmin	BIT
AS
BEGIN
	IF @usua_EsAdmin = 1
	BEGIN
		SELECT pant_Id,
			   pant_Pantalla,
			   pant_Href,
			   pant_Icono,
			   pant_Esquema
		  FROM ACCE.tbPantallas 
		 WHERE pant_Estado = 1
	END
	ELSE
	BEGIN
		SELECT tb1.pant_Id,
			   pant_Pantalla,
			   pant_Href,
			   pant_Icono,
			   pant_Esquema
		  FROM ACCE.tbRolesPorPantalla tb1
	INNER JOIN ACCE.tbPantallas tb2
			ON tb1.pant_Id = tb2.pant_Id
		 WHERE ropa_Estado = 1
		   AND role_Id = @role_Id
		   AND pant_Estado = 1
	END
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbPantallas_PantallasQueNoTieneRol
	@role_Id	INT
AS
BEGIN
	SELECT pant_Id,
		   pant_Pantalla,
		   pant_Href,
		   pant_Esquema
	  FROM ACCE.tbPantallas 
	 WHERE pant_Estado = 1
	   AND pant_Id NOT IN (SELECT tb1.pant_Id
							   FROM ACCE.tbRolesPorPantalla tb1
						 INNER JOIN ACCE.tbPantallas tb2
								 ON tb1.pant_Id = tb2.pant_Id
							  WHERE ropa_Estado = 1
								AND role_Id = @role_Id
								AND pant_Estado = 1)
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbPantallas_CargarPantallaPorId
	@pant_Id	INT
AS
BEGIN
		SELECT tb1.pant_Id,
			   pant_Pantalla,
			   pant_Href,
			   pant_Esquema,
			   tb1.usua_IdCreacion,
			   tb2.usua_Nombre usua_NombreCreacion,
			   pant_FechaCreacion,
			   tb1.usua_IdModificacion,
			   tb3.usua_Nombre usua_NombreModificacion,
			   tb1.pant_FechaModificacion
		  FROM ACCE.tbPantallas tb1
	INNER JOIN ACCE.tbUsuarios tb2
			ON tb1.usua_IdCreacion = tb2.usua_Id
	 LEFT JOIN ACCE.tbUsuarios tb3
			ON tb1.usua_IdModificacion = tb3.usua_Id
		 WHERE pant_Id = @pant_Id 
		   AND pant_Estado = 1
END
GO

--*******************************************************/TABLE Pantallas**********************************************************--

--***************************************************TABLE Roles por Pantallas*****************************************************--

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRolesPorPantalla_ValidarRolTienePantalla
	@role_Id		INT,
	@pant_Pantalla	NVARCHAR(150)
AS
BEGIN
	DECLARE @pant_Id INT, @ropa_Id INT

	SELECT @pant_Id = pant_Id
	  FROM ACCE.tbPantallas
	 WHERE pant_Pantalla = @pant_Pantalla
	   AND pant_Estado = 1

	SELECT @ropa_Id = ropa_Id
	  FROM ACCE.tbRolesPorPantalla
	 WHERE role_Id = @role_Id
	   AND pant_Id = @pant_Id
	   AND ropa_Estado = 1

	IF @ropa_Id > 0
	BEGIN
		SELECT @ropa_Id
	END
	ELSE
	BEGIN
		SELECT 0
	END
END
GO

CREATE OR ALTER PROCEDURE ACCE.UDP_tbRolesPorPantalla_GuardarNuevo
	@role_Id			INT,
	@pant_Id			INT,
	@usua_IdCreacion	INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			DECLARE @ropa_Id INT

			SELECT @ropa_Id = ropa_Id FROM ACCE.tbRolesPorPantalla WHERE role_Id = @role_Id AND pant_Id = @pant_Id AND ropa_Estado = 0

			IF @ropa_Id > 0
			BEGIN
				UPDATE ACCE.tbRolesPorPantalla
				   SET ropa_Estado = 1,
				       usua_IdModificacion = @usua_IdCreacion,
					   ropa_FechaModificacion = GETDATE()
				 WHERE ropa_Id = @ropa_Id AND pant_Id = @pant_Id
			END
			ELSE
			BEGIN
				INSERT INTO ACCE.tbRolesPorPantalla (role_Id, pant_Id, usua_IdCreacion)
				VALUES (@role_Id, @pant_Id, @usua_IdCreacion)
			END

		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO


--**************************************************/TABLE Roles por Pantallas*****************************************************--

--**********************************************************/TABLES ACCE***********************************************************--

--***********************************************************TABLES CALE***********************************************************--

CREATE OR ALTER PROCEDURE CALE.UDP_tbAbogadosJueces_DdlAbogados
AS
BEGIN
	SELECT abju_Id,
		   abju_DNI,
		   abju_Nombres,
		   abju_Apellidos
	  FROM CALE.tbAbogadosJueces
	  WHERE abju_Estado = 1
	    AND carg_Id = (SELECT carg_Id
						 FROM GRAL.tbCargos 
						WHERE carg_Descripcion = 'Abogado' 
						  AND carg_Estado = 1)
END
GO

CREATE OR ALTER PROCEDURE CALE.UDP_tbAbogadosJueces_DdlJueces
AS
BEGIN
	SELECT abju_Id,
		   abju_DNI,
		   abju_Nombres,
		   abju_Apellidos
	  FROM CALE.tbAbogadosJueces
	  WHERE abju_Estado = 1
	    AND carg_Id = (SELECT carg_Id
						 FROM GRAL.tbCargos 
						WHERE carg_Descripcion = 'Juez' 
						  AND carg_Estado = 1)
END
GO

--*********************************************************************************************************************************--
--*********************************************************************************************************************************--
--*********************************************************************************************************************************--

--**********************************************************TABLE Casos************************************************************--

CREATE OR ALTER PROCEDURE CALE.UDP_tbCasos_Insert
	@caso_Descripcion			NVARCHAR(200),
	@tica_Id					INT,
	@abju_IdJuez				INT,
	@caso_TipoDemandante		CHAR(1),
	@caso_IdDemandante			INT,
	@abju_IdAbogadoDemandante	INT,
	@abju_IdAbogadoDemandado	INT,
	@usua_IdCreacion			INT,
	@caso_Abierto				BIT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			INSERT INTO [CALE].[tbCasos] ([caso_Descripcion], [tica_Id], [abju_IdJuez], [caso_TipoDemandante], [caso_IdDemandante], [abju_IdAbogadoDemandante], [abju_IdAbogadoDemandado], [caso_Abierto], [usua_IdCreacion])
			VALUES (@caso_Descripcion, @tica_Id, @abju_IdJuez, @caso_TipoDemandante, @caso_IdDemandante, @abju_IdAbogadoDemandante, @abju_IdAbogadoDemandado, @caso_Abierto, @usua_IdCreacion)

		COMMIT
		SELECT TOP 1 caso_Id FROM [CALE].[tbCasos] ORDER BY [caso_Id] DESC
	END TRY
	BEGIN CATCH
		ROLLBACK 
		SELECT 0
	END CATCH
END
GO

--*********************************************************/TABLE Casos************************************************************--

--*****************************************************TABLE Acusados por caso******************************************************--

CREATE OR ALTER PROCEDURE CALE.UDP_tbAcusadosPorCaso_Insert
	@caso_Id			INT,
	@acus_TipoAcusado	CHAR(1),
	@acus_Acusado		INT,
	@acus_UsuCreacion	INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN 
			INSERT INTO [CALE].[tbAcusadoPorCaso] ([caso_Id], [acus_TipoAcusado], [acus_Acusado], [acus_UsuCreacion])
			VALUES (@caso_Id, @acus_TipoAcusado, @acus_Acusado, @acus_UsuCreacion)
		COMMIT
		SELECT 1		
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO


--****************************************************/TABLE Acusados por caso******************************************************--

--*****************************************************TABLE Testigos por caso******************************************************--

CREATE OR ALTER PROCEDURE CALE.UDP_tbTestigosPorCaso_Insert
	@caso_Id			INT,
	@teca_Testigo		INT,
	@teca_Declaracion	NVARCHAR(MAX),
	@teca_Demandante	BIT,
	@teca_Demandado		BIT,
	@teca_UsuCreacion	INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			
			INSERT INTO CALE.tbTestigosPorCaso ([caso_Id], [teca_Testigo], [teca_Declaracion], [teca_Demandante], [teca_Demandado], [teca_UsuCreacion])
			VALUES (@caso_Id, @teca_Testigo, @teca_Declaracion, @teca_Demandante, @teca_Demandado, @teca_UsuCreacion)
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

--****************************************************/TABLE Testigos por caso******************************************************--

--****************************************************TABLE Evidencias por caso*****************************************************--

CREATE OR ALTER PROCEDURE CALE.UDP_tbEvidenciasPorCaso_Insert
	@caso_Id				INT,
	@tiev_Id				INT,
	@evca_NombreArchivo		NVARCHAR(250),
	@evca_UrlArchivo		NVARCHAR(MAX),
	@evca_Demandante		BIT,
	@evca_Demandado			BIT,
	@evca_UsuCreacion		INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
		DECLARE @evca_Id INT

		SELECT @evca_Id = evca_Id FROM [CALE].[tbEvidenciasPorCaso] WHERE evca_NombreArchivo = @evca_NombreArchivo AND caso_Id = @caso_Id AND evca_Estado = 0

		IF @evca_Id > 0
		BEGIN
			UPDATE CALE.tbEvidenciasPorCaso 
			   SET evca_Estado = 1,
				   evca_Demandante = @evca_Demandante,
				   evca_Demandado = @evca_Demandado,
				   evca_UsuModificacion = @evca_UsuCreacion,
				   evca_FechaModificacion = GETDATE()
			 WHERE evca_Id = @evca_Id
		END
		ELSE
		BEGIN
			INSERT INTO CALE.tbEvidenciasPorCaso (caso_Id, tiev_Id, evca_NombreArchivo, evca_Demandante, evca_Demandado, evca_UrlArchivo, evca_UsuCreacion)
			VALUES (@caso_Id, @tiev_Id, @evca_NombreArchivo, @evca_Demandante, @evca_Demandado, @evca_UrlArchivo, @evca_UsuCreacion)
		END

		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

CREATE OR ALTER PROCEDURE CALE.UDP_tbEvidenciasPorCaso_Delete
	@evca_Id				INT,
	@evca_UsuModificacion	INT
AS
BEGIN
	BEGIN TRY
		UPDATE CALE.tbEvidenciasPorCaso 
		   SET evca_Estado = 0,
			   evca_UsuModificacion = @evca_UsuModificacion,
			   evca_FechaModificacion = GETDATE()
		 WHERE evca_Id = @evca_Id

		SELECT 1
	END TRY
	BEGIN CATCH	
		SELECT 0
	END CATCH
END
GO

--***************************************************/TABLE Evidencias por caso*****************************************************--

--********************************************************TABLE Veredictos**********************************************************--

CREATE OR ALTER PROCEDURE CALE.UDP_tbVeredictos_Insert
	@caso_Id			INT,
	@vere_Descripcion	NVARCHAR(MAX),
	@vere_UsuCreacion	INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN
			
			INSERT INTO [CALE].[tbVeredictos] ([caso_Id], [vere_Descripcion], [vere_UsuCreacion])
			VALUES (@caso_Id, @vere_Descripcion, @vere_UsuCreacion)

		COMMIT
		SELECT TOP 1 vere_Id FROM [CALE].[tbVeredictos] ORDER BY [vere_Id] DESC
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO

--*******************************************************/TABLE Veredictos**********************************************************--

--****************************************************TABLE Detalles Veredictos**********************************************************--


CREATE OR ALTER PROCEDURE CALE.UDP_tbDetallesVeredictos_Insert
	@vere_Id				INT,
	@deve_EsInocente		BIT,
	@deve_EsCulpable		BIT,
	@deve_TipoEmpresaCivil	CHAR(1),
	@deve_EmpresaCivil		INT,
	@deve_UsuCreacion		INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRAN 
			INSERT INTO [CALE].[tbDetallesVeredictos] ([vere_Id], [deve_EsInocente], [deve_EsCulpable], [deve_TipoEmpresaCivil], [deve_EmpresaCivil], [deve_UsuCreacion])
			VALUES (@vere_Id, @deve_EsInocente, @deve_EsCulpable, @deve_TipoEmpresaCivil, @deve_EmpresaCivil, @deve_UsuCreacion)
		COMMIT
		SELECT 1
	END TRY
	BEGIN CATCH
		ROLLBACK
		SELECT 0
	END CATCH
END
GO
	
--****************************************************/TABLE Detalles Veredictos**********************************************************--

--**********************************************************/TABLES CALE************************************************************--

