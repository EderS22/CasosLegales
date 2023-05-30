--********************************************************--
--********************** TABLA CVILES *********************--
USE DB_CasosLegales
GO
--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW CALE.VW_tbCiviles
AS
SELECT	civi_Id, 
		civi_DNI,
		[civi_Nombres],
		[civi_Apellidos],
		T1.civi_Nombres + ' ' + T1.civi_Apellidos AS civi_NombreCompleto,
		[civi_Sexo],
		[civi_Telefono],
		[civi_CorreoElectronico],
		[civi_FechaNacimiento],
		T1.eciv_Id,
		T1.muni_Id,
		T4.muni_Nombre,
		T5.depa_Id,
		T5.depa_Nombre,
		[civi_Direccion],
		civi_UsuCreacion, 
		T2.usua_Nombre AS user_Creacion,
		civi_FechaCreacion, 
		civi_UsuModificacion, 
		T3.usua_Nombre AS user_Modificacion,
		civi_FechaModificacion, 
		civi_Estado
FROM cale.tbCiviles AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.civi_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios AS T3
ON T1.civi_UsuModificacion = T3.usua_Id INNER JOIN GRAL.tbMunicipios AS T4
ON T1.muni_Id = T4.muni_Id INNER JOIN GRAL.tbDepartamentos AS T5
ON T4.depa_Id = T5.depa_Id;

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbCiviles_Insert
(@civi_DNI NVARCHAR(15),
 @civi_Nombres NVARCHAR(200),
 @civi_Apellidos NVARCHAR(200),
 @civi_Sexo CHAR(1),
 @civi_Telefono NVARCHAR(20),
 @civi_Correoelectronico NVARCHAR(150),
 @civi_FechaNacimiento DATE,
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @civi_Direccion NVARCHAR(250),
 @civi_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 

		IF EXISTS (SELECT * FROM CALE.tbCiviles WHERE civi_DNI = @civi_DNI AND civi_Estado = 1)
		 BEGIN 
		 	SELECT 2 AS codeStatus
		 END
		ELSE IF NOT EXISTS (SELECT * FROM CALE.tbCiviles WHERE civi_DNI = @civi_DNI)
		 BEGIN
			INSERT INTO [cale].[tbCiviles] ([civi_DNI],
											[civi_Nombres],
											[civi_Apellidos],
											[civi_Sexo],
											[civi_Telefono],
											[civi_CorreoElectronico],
											[civi_FechaNacimiento],
											[eciv_Id], 
											[muni_Id],
											[civi_Direccion],
											[civi_UsuCreacion],
											[civi_UsuModificacion],
											[civi_FechaModificacion])
									VALUES (@civi_DNI,
											@civi_Nombres,
											@civi_Apellidos,
											@civi_Sexo, 
											@civi_Telefono,
											@civi_Correoelectronico,
											@civi_FechaNacimiento, 
											@eciv_Id, 
											@muni_Id, 
											@civi_Direccion,
											@civi_UsuCreacion,
											NULL, 
											NULL);

			SELECT 1 AS codeStatus
		 END
        ELSE
		 BEGIN
			UPDATE CALE.tbCiviles
			SET civi_Estado = 1,
				civi_UsuCreacion = @civi_UsuCreacion,
				civi_FechaCreacion = GETDATE(),
				civi_UsuModificacion = NULL,
				civi_FechaModificacion = NULL
			WHERE civi_DNI = @civi_DNI;

			SELECT 1 AS codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbCiviles_Update
(@civi_Id INT,
 @civi_DNI NVARCHAR(15),
 @civi_Nombres NVARCHAR(200),
 @civi_Apellidos NVARCHAR(200),
 @civi_Sexo CHAR(1),
 @civi_Telefono NVARCHAR(20),
 @civi_Correoelectronico NVARCHAR(150),
 @civi_FechaNacimiento DATE,
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @civi_Direccion NVARCHAR(250),
 @civi_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM CALE.tbCiviles WHERE (civi_DNI = @civi_DNI AND civi_Id != @civi_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
						UPDATE	cale.tbCiviles
				SET		civi_DNI = @civi_DNI,
						civi_Nombres = @civi_Nombres,
						civi_Apellidos = @civi_Apellidos,
						civi_Sexo = @civi_Sexo,
						civi_Telefono = @civi_Telefono,
						civi_Correoelectronico = @civi_Correoelectronico,
						civi_FechaNacimiento = @civi_FechaNacimiento,
						eciv_Id = @eciv_Id,
						@muni_Id = @muni_Id,
						civi_Direccion = @civi_Direccion,
						civi_UsuModificacion = @civi_UsuModificacion, 
						civi_FechaModificacion = GETDATE()
				WHERE	civi_Id = @civi_Id

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbCiviles_Delete
(@civi_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS(SELECT * FROM CALE.tbAcusadoPorCaso WHERE acus_TipoAcusado = 'C' AND acus_Acusado = @civi_Id)
		 BEGIN
			SELECT 2 codeStatus
		 END
		ELSE IF EXISTS(SELECT * FROM CALE.tbCasos WHERE caso_TipoDemandante = 'C' AND caso_Demandante = @civi_Id)
		 BEGIN
			SELECT 2 codeStatus
		 END
		 ELSE
		 BEGIN 
			UPDATE	cale.tbCiviles
			SET		civi_Estado = 0
			WHERE	civi_Id = @civi_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbCiviles_Index
AS
BEGIN
	SELECT * FROM CALE.VW_tbCiviles
	WHERE civi_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbCiviles_Find 
(@civi_Id INT)
AS
BEGIN
	SELECT * FROM cale.VW_tbCiviles
	WHERE civi_Id = @civi_Id;
END
GO
--********************************************************--
--********************** TABLA EMPRESAS *********************--

--**************  VISTA ******************--

CREATE OR ALTER VIEW CALE.VW_tbEmpresas
AS
SELECT	T1.[emsa_Id],
		T1.[emsa_Nombre], 
		T1.[emsa_RNT], 
		T1.[muni_Id],
		T4.muni_Nombre,
		T1.[emsa_Direccion],
		T1.[emsa_RepresentanteNombre],
		T1.[emsa_RepresentanteDNI],
		T1.[emsa_RepresentanteTelefono], 
		T1.[emsa_RepresentanteSexo], 
		T1.[eciv_Id], 
		T1.[emsa_EsDemandante], 
		T1.[emsa_EsAcusado], 
		T1.[emsa_UsuCreacion], 
		T1.[emsa_FechaCreacion], 
		T1.[emsa_UsuModificacion], 
		T1.[emsa_FechaModificacion], 
		T1.[emsa_Estado]
		FROM cale.tbEmpresas AS T1 
  INNER JOIN acce.tbUsuarios AS T2
		  ON T1.emsa_UsuCreacion = T2.usua_Id 
   LEFT JOIN acce.tbUsuarios AS T3
		  ON T1.emsa_UsuModificacion = T3.usua_Id 
  INNER JOIN GRAL.tbMunicipios AS T4
		  ON T1.muni_Id = T4.muni_Id
GO

--**************  CREATE ******************--
CREATE OR ALTER PROCEDURE CALE.UDP_tbEmpresas_Insert
(@emsa_Nombre NVARCHAR(200),
 @emsa_RTN NVARCHAR(20),
 @muni_Id CHAR(4),
 @emsa_Direccion NVARCHAR(250),
 @emsa_RepresentanteNombre NVARCHAR(200),
 @emsa_RepresentanteDNI NVARCHAR(20),
 @emsa_RepresentanteTelefono NVARCHAR(20),
 @emsa_RepresentanteSexo CHAR(1),
 @eciv_Id INT,
 @emsa_Demanadante BIT,
 @emsa_EsAcusado BIT,
 @emsa_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 

		IF EXISTS (SELECT * FROM CALE.tbEmpresas WHERE emsa_Nombre = @emsa_Nombre AND emsa_Estado = 1)
		 BEGIN 
		 	SELECT 2 AS codeStatus
		 END
		ELSE IF NOT EXISTS (SELECT * FROM CALE.tbEmpresas WHERE emsa_Nombre = @emsa_Nombre)
		 BEGIN
		INSERT INTO [cale].[tbEmpresas] (	[emsa_Nombre],
											[emsa_RNT],
											[muni_Id], 
											[emsa_Direccion],
											[emsa_RepresentanteNombre],
											[emsa_RepresentanteDNI],
											[emsa_RepresentanteTelefono], 
											[emsa_RepresentanteSexo],
											[eciv_Id], 
											[emsa_EsDemandante], 
											[emsa_EsAcusado],
											[emsa_UsuCreacion],  
											[emsa_UsuModificacion],
											[emsa_FechaModificacion])
									VALUES (@emsa_Nombre,
											@emsa_RTN,
											@muni_Id,
											@emsa_Direccion, 
											@emsa_RepresentanteNombre,
											@emsa_RepresentanteDNI,
											@emsa_RepresentanteTelefono, 
											@emsa_RepresentanteSexo, 
											@eciv_Id, 
											@emsa_Demanadante, 
											@emsa_EsAcusado,
											@emsa_UsuCreacion,
											NULL, 
											NULL);

			SELECT 1 AS codeStatus
		 END
        ELSE
		 BEGIN
			UPDATE CALE.tbEmpresas
			SET emsa_Estado = 1,
				emsa_UsuCreacion = @emsa_UsuCreacion,
				emsa_FechaCreacion = GETDATE(),
				emsa_UsuModificacion = NULL,
				emsa_FechaModificacion = NULL
			WHERE emsa_Nombre= @emsa_Nombre;

			SELECT 1 AS codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbEmpresas_Update
(@emsa_Id INT,
 @emsa_Nombre NVARCHAR(200),
 @emsa_RTN NVARCHAR(20),
 @muni_Id CHAR(4),
 @emsa_Direccion NVARCHAR(250),
 @emsa_RepresentanteNombre NVARCHAR(200),
 @emsa_RepresentanteDNI NVARCHAR(20),
 @emsa_RepresentanteTelefono NVARCHAR(20),
 @emsa_RepresentanteSexo CHAR(1),
 @eciv_Id INT,
 @emsa_EsDemanadante BIT,
 @emsa_EsAcusado BIT,
 @emsa_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM CALE.tbEmpresas WHERE (emsa_Nombre = @emsa_Nombre AND emsa_Id != @emsa_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
						UPDATE	cale.tbEmpresas
				SET		emsa_Nombre = @emsa_Nombre,
						emsa_RNT = @emsa_RTN,
						@muni_Id = @muni_Id,
						emsa_Direccion = @emsa_Direccion,
						emsa_RepresentanteNombre = @emsa_RepresentanteNombre,
						emsa_RepresentanteDNI = @emsa_RepresentanteDNI,
						emsa_RepresentanteTelefono = @emsa_RepresentanteTelefono,
						emsa_RepresentanteSexo = @emsa_RepresentanteSexo,
						eciv_Id = @eciv_Id,
						emsa_EsDemandante = @emsa_EsDemanadante,
						emsa_EsAcusado = @emsa_EsAcusado,
						emsa_UsuModificacion = @emsa_UsuModificacion, 
						emsa_FechaModificacion = GETDATE()
				WHERE	emsa_Id = @emsa_Id

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbEmpresas_Delete
(@emsa_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS(SELECT * FROM CALE.tbEmpresas WHERE emsa_Id = @emsa_Id)
		 BEGIN
			SELECT 2 codeStatu
		 END
		ELSE
		 BEGIN 
			UPDATE	cale.tbEmpresas
			SET		emsa_Estado = 0
			WHERE	emsa_Id = @emsa_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbEmpresas_Index
AS
BEGIN
	SELECT * FROM CALE.VW_tbEmpresas
	WHERE emsa_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbEmpresas_Find 
(@emsa_Id INT)
AS
BEGIN
	SELECT * FROM cale.VW_tbEmpresas
	WHERE emsa_Id = @emsa_Id;
END

--********************************************************--
--********************** TABLA EMPLEADOS *********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW CALE.VW_tbEmpleados
AS
SELECT	T1.[empe_Id], 
		T1.[empe_DNI],
		T1.[empe_Nombres],
		T1.[empe_Apellidos],
		T1.[empe_Nombres] + ' ' + T1.empe_Apellidos AS empe_NombreCompleto,
		T1.[empe_Sexo], 
		T1.[empe_Telefono], 
		T1.[empe_CorreoElectronico], 
		T1.[empe_FechaNacimiento],
		T1.[eciv_Id],
		T5.eciv_Descripcion,
		T1.[muni_Id],
		T4.muni_Nombre,
		T4.depa_Id,
		T6.depa_Nombre,
		T1.[empe_Direccion], 
		T1.[empe_UsuCreacion], 
		T2.usua_Nombre AS user_Creacion,
		T1.[empe_FechaCreacion], 
		T1.[empe_UsuModificacion], 
		T1.[empe_FechaModificacion],
		T3.usua_Nombre AS user_Modificacion,
		T1.[empe_Estado]
FROM cale.tbEmpleados AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.empe_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios AS T3
ON T1.empe_UsuModificacion = T3.usua_Id INNER JOIN GRAL.tbMunicipios AS T4
ON T1.muni_Id = T4.muni_Id INNER JOIN GRAL.tbEstadosCiviles AS T5
ON T1.eciv_Id = T5.eciv_Id INNER JOIN GRAL.tbDepartamentos AS T6
ON T4.depa_Id = T6.depa_Id

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbEmpleados_Insert --'1','1','1','M','1','1','2020-12-12',1,'0311','1',1
(@empe_DNI NVARCHAR(15),
 @empe_Nombres NVARCHAR(200),
 @empe_Apellidos NVARCHAR(200),
 @empe_Sexo CHAR(1),
 @empe_Telefono NVARCHAR(20),
 @empe_CorreoElectronico NVARCHAR(150),
 @empe_FechaNacimiento DATE,
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @empe_Direccion NVARCHAR(250),
 @empe_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 

		IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE (empe_DNI = @empe_DNI  OR empe_CorreoElectronico = @empe_CorreoElectronico OR empe_Telefono = @empe_Telefono) AND empe_Estado = 1) 
		 BEGIN 
				IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE empe_DNI = @empe_DNI AND empe_Estado = 1)
					 BEGIN
						SELECT 11 AS codeStatus
					 END
				ELSE IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE empe_CorreoElectronico = @empe_CorreoElectronico AND empe_Estado = 1)
					 BEGIN
						SELECT 12 AS codeStatus
					 END
				ELSE IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE empe_Telefono = @empe_Telefono AND empe_Estado = 1)
					 BEGIN
						SELECT 13 AS codeStatus
					 END
				
		 END
		ELSE IF NOT EXISTS (SELECT * FROM CALE.tbEmpleados WHERE (empe_DNI = @empe_DNI OR empe_Telefono = @empe_Telefono OR empe_CorreoElectronico = @empe_CorreoElectronico)AND empe_Estado = 1)		
				BEGIN
								INSERT INTO [cale].[tbEmpleados]   
											([empe_DNI],
											[empe_Nombres],
											[empe_Apellidos],
											[empe_Sexo],
											[empe_Telefono], 
											[empe_CorreoElectronico], 
											[empe_FechaNacimiento],
											[eciv_Id],
											[muni_Id],
											[empe_Direccion],
											[empe_UsuCreacion], 
											[empe_UsuModificacion],
											[empe_FechaModificacion])
									VALUES (@empe_DNI,
											@empe_Nombres,
											@empe_Apellidos,
											@empe_Sexo, 
											@empe_Telefono,
											@empe_CorreoElectronico,
											@empe_FechaNacimiento,
											@eciv_Id,
											@muni_Id, 
											@empe_Direccion,
											@empe_UsuCreacion,
											NULL, 
											NULL);

									SELECT 1 AS codeStatus
			END
        ELSE
		 BEGIN
			UPDATE CALE.tbEmpleados
			SET empe_Estado = 1,
				empe_UsuCreacion = @empe_UsuCreacion,
				empe_FechaCreacion = GETDATE(),
				empe_UsuModificacion = NULL,
				empe_FechaModificacion = NULL,
				empe_Nombres = @empe_Nombres,
				empe_Apellidos = @empe_Apellidos,
				empe_DNI = @empe_DNI,
				empe_Telefono = @empe_Telefono,
				empe_Sexo = @empe_Sexo,
				eciv_Id = @eciv_Id,
				muni_Id = @muni_Id,
				empe_CorreoElectronico = @empe_CorreoElectronico,
				empe_Direccion = @empe_Direccion
			WHERE empe_DNI = @empe_DNI OR empe_Telefono = @empe_Telefono OR empe_CorreoElectronico = @empe_CorreoElectronico

			SELECT 1 AS codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbEmpleados_Update
(@empe_Id INT,
 @empe_DNI NVARCHAR(15),
 @empe_Nombres NVARCHAR(200),
 @empe_Apellidos NVARCHAR(200),
 @empe_Sexo CHAR(1),
 @empe_Telefono NVARCHAR(20),
 @empe_CorreoElectronico NVARCHAR(150),
 @empe_FechaNacimiento DATE,
 @eciv_Id INT,
 @muni_Id CHAR(4),
 @empe_Direccion NVARCHAR(250),
 @empe_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY

		IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE (empe_DNI = @empe_DNI  OR empe_CorreoElectronico = @empe_CorreoElectronico OR empe_Telefono = @empe_Telefono)  AND empe_Id != @empe_Id AND empe_Estado = 1)
			BEGIN
				IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE empe_DNI = @empe_DNI AND empe_Id != @empe_Id AND empe_Estado = 1)
					 BEGIN
						SELECT 11 AS codeStatus
					 END
				ELSE IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE empe_CorreoElectronico = @empe_CorreoElectronico AND  empe_Id != @empe_Id AND empe_Estado = 1)
					 BEGIN
						SELECT 12 AS codeStatus
					 END
				ELSE IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE empe_Telefono = @empe_Telefono AND empe_Id != @empe_Id AND empe_Estado = 1)
					 BEGIN
						SELECT 13 AS codeStatus
					 END
			END
		ELSE
			BEGIN
						UPDATE	cale.tbEmpleados
				SET		empe_DNI = @empe_DNI,
						empe_Nombres = @empe_Nombres,
						empe_Apellidos = @empe_Apellidos,
						empe_Sexo = @empe_Sexo,
						empe_Telefono = @empe_Telefono,
						empe_CorreoElectronico = @empe_CorreoElectronico,
						empe_FechaNacimiento = @empe_FechaNacimiento,
						eciv_Id = @eciv_Id,
						muni_Id = @muni_Id,
						empe_Direccion = @empe_Direccion,
						empe_UsuModificacion = @empe_UsuModificacion, 
						empe_FechaModificacion = GETDATE()
				WHERE	empe_Id = @empe_Id

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbEmpleados_Delete
(@empe_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS(SELECT * FROM ACCE.tbUsuarios WHERE empe_Id = @empe_Id)
		 BEGIN
			SELECT 2 codeStatus
		 END
		ELSE
		 BEGIN 
			UPDATE	cale.tbEmpleados
			SET		empe_Estado = 0
			WHERE	empe_Id = @empe_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbEmpleados_Index
AS
BEGIN
	SELECT * FROM CALE.VW_tbEmpleados
	WHERE empe_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbEmpleados_Find 
(@empe_Id INT)
AS
BEGIN
	SELECT * FROM cale.VW_tbEmpleados
	WHERE empe_Id = @empe_Id;
END


--********************************************************--
--********************** TABLA TIPOS DE CASO *********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW CALE.VW_tbTiposdeCaso
AS
SELECT	[tica_Id], 
		[tica_Nombre],
		[tica_Descripcion], 
		[tica_UsuCreacion], 
		[tica_FechaCreacion], 
		[tica_UsuModificacion],
		[tica_FechaModificacion],
		[tica_Estado]
FROM cale.tbTiposdeCaso AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.tica_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios AS T3
ON T1.tica_UsuModificacion = T3.usua_Id;

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbTiposdeCaso_Insert
(@tica_Nombre NVARCHAR(100),
 @tica_Descripcion NVARCHAR(200),
 @tica_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 

		IF EXISTS (SELECT * FROM CALE.tbTiposdeCaso WHERE tica_Nombre = @tica_Nombre AND tica_Estado = 1)
		 BEGIN 
		 	SELECT 2 AS codeStatus
		 END
		ELSE IF NOT EXISTS (SELECT * FROM CALE.tbTiposdeCaso WHERE tica_Nombre = @tica_Nombre)
		 BEGIN
			INSERT INTO [cale].[tbTiposdeCaso] (tica_Nombre, tica_Descripcion, tica_UsuCreacion, tica_UsuModificacion, tica_FechaModificacion)
			VALUES (@tica_Nombre ,@tica_Descripcion, @tica_UsuCreacion, NULL, NULL);

			SELECT 1 AS codeStatus
		 END
        ELSE
		 BEGIN
			UPDATE CALE.tbTiposdeCaso
			SET tica_Estado = 1,
				tica_UsuCreacion = @tica_UsuCreacion,
				tica_FechaCreacion = GETDATE(),
				tica_UsuModificacion = NULL,
				tica_FechaModificacion = NULL
			WHERE tica_Nombre = @tica_Nombre;

			SELECT 1 AS codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeCaso_Update
(@tica_Id INT,
 @tica_Nombre NVARCHAR(100),
 @tica_Descripcion NVARCHAR(200),
 @tica_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM CALE.tbTiposdeCaso WHERE (tica_Nombre = @tica_Nombre AND tica_Id != @tica_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
						UPDATE	cale.tbTiposdeCaso
				SET		tica_Nombre = @tica_Nombre,
						tica_Descripcion = @tica_Descripcion, 
						tica_UsuModificacion = @tica_UsuModificacion, 
						tica_FechaModificacion = GETDATE()
				WHERE	tica_Id = @tica_Id

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeCaso_Delete 
(@tica_Id INT)
AS
BEGIN
	BEGIN TRY
	IF EXISTS (SELECT * FROM CALE.tbCasos WHERE tica_Id = @tica_Id) 
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
		 BEGIN 
			UPDATE	CALE.tbTiposdeCaso
			SET		tica_Estado = 0
			WHERE	tica_Id = @tica_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeCaso_Index
AS
BEGIN
	SELECT * FROM cale.VW_tbTiposdeCAso
	WHERE tica_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeCaso_Find 
(@tica_Id INT)
AS
BEGIN
	SELECT * FROM cale.VW_tbTiposdeCaso
	WHERE tica_Id = @tica_Id;
END

--********************************************************--
--********************** TABLA TIPOS DE EVIDENCIA *********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW CALE.VW_tbTiposdeEvidencia
AS
SELECT	[tiev_Id], 
		[tiev_Nombre],
		[tiev_Descripcion], 
		[tiev_UsuCreacion], 
		[tiev_FechaCreacion], 
		[tiev_UsuModificacion],
		[tiev_FechaModificacion],
		[tiev_Estado]
FROM cale.tbTiposdeEvidencia AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.tiev_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios AS T3
ON T1.tiev_UsuModificacion = T3.usua_Id;

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE CALE.UDP_tbTiposdeEvidencia_Insert
(@tiev_Nombre NVARCHAR(100),
 @tiev_Descripcion NVARCHAR(200),
 @tiev_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 

		IF EXISTS (SELECT * FROM CALE.tbTiposdeEvidencia WHERE tiev_Nombre = @tiev_Nombre AND tiev_Estado = 1)
		 BEGIN 
		 	SELECT 2 AS codeStatus
		 END
		ELSE IF NOT EXISTS (SELECT * FROM CALE.tbTiposdeEvidencia WHERE tiev_Nombre = @tiev_Nombre)
		 BEGIN
			INSERT INTO [cale].[tbTiposdeEvidencia] (tiev_Nombre, tiev_Descripcion, tiev_UsuCreacion, tiev_UsuModificacion, tiev_FechaModificacion)
			VALUES (@tiev_Nombre ,@tiev_Descripcion, @tiev_UsuCreacion, NULL, NULL);

			SELECT 1 AS codeStatus
		 END
        ELSE
		 BEGIN
			UPDATE CALE.tbTiposdeEvidencia
			SET tiev_Estado = 1,
				tiev_UsuCreacion = @tiev_UsuCreacion,
				tiev_FechaCreacion = GETDATE(),
				tiev_UsuModificacion = NULL,
				tiev_FechaModificacion = NULL
			WHERE tiev_Nombre = @tiev_Nombre;

			SELECT 1 AS codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeEvidencia_Update
(@tiev_Id INT,
 @tiev_Nombre NVARCHAR(100),
 @tiev_Descripcion NVARCHAR(200),
 @tiev_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM CALE.tbTiposdeEvidencia WHERE (tiev_Nombre = @tiev_Nombre AND tiev_Id != @tiev_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
						UPDATE	cale.tbTiposdeEvidencia
				SET		tiev_Nombre = @tiev_Nombre,
						tiev_Descripcion = @tiev_Descripcion, 
						tiev_UsuModificacion = @tiev_UsuModificacion, 
						tiev_FechaModificacion = GETDATE()
				WHERE	tiev_Id = @tiev_Id

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeEvidencia_Delete
(@tiev_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS(SELECT * FROM CALE.tbEvidenciasPorCaso WHERE tiev_Id = @tiev_Id)
		 BEGIN
			SELECT 2 codeStatu
		 END
		ELSE
		 BEGIN 
			UPDATE	CALE.tbTiposdeEvidencia
			SET		tiev_Estado = 0
			WHERE	tiev_Id = @tiev_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeEvidencia_Index
AS
BEGIN
	SELECT * FROM cale.VW_tbTiposdeEvidencia
	WHERE tiev_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE cale.UDP_tbTiposdeEvidencia_Find 
(@tiev_Id INT)
AS
BEGIN
	SELECT * FROM cale.VW_tbTiposdeEvidencia
	WHERE tiev_Id = @tiev_Id;
END