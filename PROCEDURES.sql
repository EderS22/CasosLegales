USE DB_CasosLegales;
GO

--********** VISTAS Y PROCEDIMIENTOS  **********---


--***************************************--
--********* TABLA CATEGORIAS ************--


--**************  VISTA ******************--



--****************/////************************************--
--*****/********** TABLA DEPARTAMENTOS ********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW GRAL.VW_tbDepartamentos
AS
SELECT	depa_Id, 
		depa_Nombre, 
		depa_Codigo, 
		depa_UsuCreacion, 
		T2.usua_Nombre AS user_Creacion,
		depa_FechaCreacion, 
		depa_UsuModificacion, 
		T3.usua_Nombre AS user_Modificacion,
		depa_FechaModificacion, 
		depa_Estado
FROM [gral].[tbDepartamentos] AS T1 INNER JOIN [acce].[tbUsuarios] AS T2
ON T1.depa_UsuCreacion = T2.usua_Nombre LEFT JOIN acce.tbUsuarios AS T3 
ON T1.depa_UsuModificacion = T3.usua_Nombre;


--**************  INSERT ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbDepartamentos_Insert
(@depa_Nombre NVARCHAR(100),
 @depa_UsuCreacion	INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM gral.tbDepartamentos WHERE depa_Nombre = @depa_Nombre AND depa_Estado = 1)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF NOT EXISTS (SELECT * FROM gral.tbDepartamentos WHERE depa_Nombre = @depa_Nombre)
			BEGIN
				INSERT INTO [gral].[tbDepartamentos] (depa_Nombre, depa_Codigo, depa_UsuCreacion, depa_UsuModificacion, depa_FechaModificacion)
				VALUES (@depa_Nombre, (SELECT COUNT(depa_codigo) + 1 FROM gral.tbDepartamentos WHERE depa_Estado = 1), @depa_UsuCreacion, NULL, NULL);

				SELECT 1 codeStatus
			END
		ELSE 
			BEGIN
				UPDATE gral.tbDepartamentos
				SET depa_Nombre = @depa_Nombre, 
					depa_UsuCreacion = @depa_UsuCreacion, 
					depa_FechaCreacion = GETDATE(), 
					depa_UsuModificacion = NULL, 
					depa_FechaModificacion = NULL, 
					depa_Estado = 1
				WHERE depa_Nombre = @depa_Nombre

				SELECT 1 codeStatus
			END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbDepartamentos_Update
(@depa_Id INT,
 @depa_Nombre NVARCHAR(100),
 @depa_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM gral.tbDepartamentos WHERE (depa_Nombre = @depa_Nombre AND depa_Id != @depa_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
				UPDATE gral.tbDepartamentos
				SET   depa_Nombre = @depa_Nombre,  
					  depa_UsuModificacion = @depa_UsuModificacion, 
					  depa_FechaModificacion = GETDATE()
				WHERE depa_Id = @depa_Id		

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbDepartamentos_Delete 
(@depa_Id INT)
AS
BEGIN
 BEGIN TRY

	IF EXISTS (SELECT * FROM GRAL.tbMunicipios WHERE @depa_Id = depa_Id)
	 BEGIN
		SELECT 2 codeStatus
	 END
	ELSE
	 BEGIN
		UPDATE	gral.tbDepartamentos
		SET		depa_Estado = 0
		WHERE	depa_Id = @depa_Id

		SELECT 1 codeStatus
	 END
 END TRY
 BEGIN CATCH
	SELECT 0 codeStatus
 END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbDepartamentos_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbDepartamentos 
	WHERE depa_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbDepartamentos_Find 
(@depa_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbDepartamentos
	WHERE depa_Id = @depa_Id
END



--********************************************************--
--**************** TABLA MUNICIPIOS **********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW GRAL.VW_tbMunicipios
AS
SELECT	muni_Id, 
		muni_Nombre, 
		muni_Codigo, 
		T1.depa_Id, 
		T2.depa_Nombre
		muni_UsuCreacion, 
		T3.usua_Nombre AS user_Creacion,
		muni_FechaCreacion, 
		muni_UsuModificacion, 
		t4.usua_Nombre AS user_Modificacion,
		muni_FechaModificacion, 
		muni_Estado
FROM gral.tbMunicipios AS T1 INNER JOIN gral.tbDepartamentos AS T2
ON T1.depa_Id = T2.depa_Id INNER JOIN acce.tbUsuarios AS T3
ON T1.muni_UsuCreacion = t3.usua_Id LEFT JOIN acce.tbUsuarios AS T4
ON T1.muni_UsuModificacion = t4.usua_Id



--********************  CREATE *************************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbMunicipios_Insert
(@muni_Nombre NVARCHAR(100),
 @muni_Codigo char(4),
 @depa_Id INT,
 @muni_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM gral.tbMunicipios WHERE muni_Codigo = @muni_Codigo AND muni_Estado = 1)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF NOT EXISTS (SELECT * FROM gral.tbMunicipios WHERE muni_Codigo = @muni_Codigo)
			BEGIN

				INSERT INTO [gral].[tbMunicipios] (muni_Nombre, muni_Codigo, depa_Id, muni_UsuCreacion, muni_UsuModificacion, muni_FechaModificacion)
				VALUES (@muni_Nombre, @muni_Codigo, @depa_Id, @muni_UsuCreacion, NULL, NULL);

				SELECT 1 codeStatus
			END
		ELSE 
			BEGIN
				UPDATE gral.tbMunicipios
				SET muni_Nombre = @muni_Nombre, 
					depa_Id = @depa_Id, 
					muni_UsuCreacion = @muni_UsuCreacion, 
					muni_FechaCreacion = GETDATE(), 
					muni_UsuModificacion = NULL, 
					muni_FechaModificacion = NULL, 
					muni_Estado = 1
				WHERE muni_Codigo = @muni_Codigo
				

				SELECT 1 codeStatus
			END
	END TRY
	BEGIN CATCH
				SELECT 0 codeStatus
	END CATCH
END


--**************  UPDATE  ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbMunicipios_Update
(@muni_Id INT,
 @muni_Nombre NVARCHAR(100),
 @depa_Id INT,
 @muni_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		UPDATE gral.tbMunicipios
		SET muni_Nombre = @muni_Nombre, 
			depa_Id = @depa_Id, 
			muni_UsuModificacion = @muni_UsuModificacion, 
			muni_FechaModificacion = GETDATE()
		WHERE muni_Id = @muni_Id
		
		SELECT 1 codeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE  ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbMunicipios_Delete
(@muni_Id INT)
AS
BEGIN
	BEGIN TRY

		IF EXISTS(SELECT * FROM CALE.tbAbogadosJueces WHERE muni_Id= @muni_Id)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF EXISTS(SELECT * FROM CALE.tbCiviles WHERE muni_Id= @muni_Id)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF EXISTS(SELECT * FROM CALE.tbEmpleados WHERE muni_Id= @muni_Id)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE IF EXISTS(SELECT * FROM CALE.tbEmpresas WHERE muni_Id= @muni_Id)
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
				UPDATE gral.tbMunicipios
				SET muni_Estado = 0
				WHERE muni_Id = @muni_Id

				SELECT 1 codeStatus
			END
	END TRY
	BEGIN CATCH
		SELECT  0 codeStatus
	END CATCH
END

--**************  INDEX  ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbMunicipios_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbMunicipios
	WHERE muni_Estado = 1;
END

--**************  FIND  ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbMunicipios_Find 
(@muni_Id INT)
AS
BEGIN
	SELECT * FROM GRAL.VW_tbMunicipios
	WHERE muni_Id = @muni_Id;
END


--********************************************************--
--********************** TABLA CARGOS *********************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW GRAL.VW_tbCargos
AS
SELECT	carg_Id, 
		carg_Descripcion, 
		carg_UsuCreacion, 
		T2.usua_Nombre AS user_Creacion,
		carg_FechaCreacion, 
		carg_UsuModificacion, 
		T3.usua_Nombre AS user_Modificacion,
		carg_FechaModificacion, 
		carg_Estado
FROM gral.tbCargos AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.carg_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios AS T3
ON T1.carg_UsuModificacion = T3.usua_Id;

--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE GRAL.UDP_tbCargos_Insert
(@carg_Descripcion NVARCHAR(100),
 @carg_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 

		IF EXISTS (SELECT * FROM GRAL.tbCargos WHERE carg_Descripcion = @carg_Descripcion AND carg_Estado = 1)
		 BEGIN 
		 	SELECT 2 AS codeStatus
		 END
		ELSE IF NOT EXISTS (SELECT * FROM GRAL.tbCargos WHERE carg_Descripcion = @carg_Descripcion)
		 BEGIN
			INSERT INTO [gral].[tbCargos] (carg_Descripcion, carg_UsuCreacion, carg_UsuModificacion, carg_FechaModificacion)
			VALUES (@carg_Descripcion, @carg_UsuCreacion, NULL, NULL);

			SELECT 1 AS codeStatus
		 END
        ELSE
		 BEGIN
			UPDATE GRAL.tbCargos
			SET carg_Estado = 1,
				carg_UsuCreacion = @carg_UsuCreacion,
				carg_FechaCreacion = GETDATE(),
				carg_UsuModificacion = NULL,
				carg_FechaModificacion = NULL
			WHERE carg_Descripcion = @carg_Descripcion;

			SELECT 1 AS codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END


--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Update
(@carg_Id INT,
 @carg_Descripcion NVARCHAR(100),
 @carg_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY
		IF EXISTS (SELECT * FROM GRAL.tbCargos WHERE (carg_Descripcion = @carg_Descripcion AND carg_Id != @carg_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE
			BEGIN
						UPDATE	gral.tbCargos
				SET		carg_Descripcion = @carg_Descripcion, 
						carg_UsuModificacion = @carg_UsuModificacion, 
						carg_FechaModificacion = GETDATE()
				WHERE	carg_Id = @carg_Id

				SELECT 1 codeStatus
			END 
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Delete
(@carg_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS(SELECT * FROM CALE.tbAbogadosJueces WHERE carg_Id = @carg_Id)
		 BEGIN
			SELECT 2 codeStatu
		 END
		ELSE
		 BEGIN 
			UPDATE	gral.tbCargos
			SET		carg_Estado = 0
			WHERE	carg_Id = @carg_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbCargos
	WHERE carg_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Find 
(@carg_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbCargos
	WHERE carg_Id = @carg_Id;
END




--************************************************************--
--******************* TABLA ESTADOS CIVILES ******************--

--**************  VISTA ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbEstadosCiviles
AS
SELECT	eciv_Id, 
		eciv_Descripcion,
		eciv_UsuCreacion, 
		T2.usua_Nombre AS user_Creacion,
		eciv_FechaCreacion, 
		eciv_UsuModificacion, 
		T3.usua_Nombre AS user_Modificacion,
		eciv_FechaModificacion, 
		eciv_Estado
FROM	[gral].[tbEstadosCiviles] AS T1 INNER JOIN acce.tbUsuarios AS T2
ON T1.eciv_UsuCreacion = T2.usua_Id LEFT JOIN acce.tbUsuarios AS T3
ON T1.eciv_UsuModificacion = T3.usua_Id



--**************  CREATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Insert
(@eciv_Descripcion NVARCHAR(100),
 @eciv_UsuCreacion INT)
AS
BEGIN
	BEGIN TRY 
		
		IF EXISTS (SELECT * FROM GRAL.tbEstadosCiviles WHERE eciv_Descripcion = @eciv_Descripcion AND eciv_Estado = 1)
		 BEGIN 
		 	SELECT 2 AS codeStatus
		 END
		ELSE IF NOT EXISTS (SELECT * FROM GRAL.tbEstadosCiviles WHERE eciv_Descripcion = @eciv_Descripcion)
		 BEGIN
			INSERT INTO [gral].[tbEstadosCiviles] (eciv_Descripcion, eciv_UsuCreacion, eciv_UsuModificacion, eciv_FechaModificacion)
			VALUES (@eciv_Descripcion, @eciv_UsuCreacion, NULL, NULL);

			SELECT 1 AS codeStatus
		 END
        ELSE
		 BEGIN
			UPDATE GRAL.tbEstadosCiviles
			SET eciv_Estado = 1,
				eciv_UsuCreacion = @eciv_UsuCreacion,
				eciv_FechaCreacion = GETDATE(),
				eciv_UsuModificacion = NULL,
				eciv_FechaCreacion = NULL
			WHERE eciv_Descripcion = @eciv_Descripcion;

			SELECT 1 AS codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 AS codeStatus
	END CATCH
END

--**************  UPDATE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Update
(@eciv_Id INT,
 @eciv_Descripcion NVARCHAR(100),
 @eciv_UsuModificacion INT)
AS
BEGIN
	BEGIN TRY

		IF EXISTS (SELECT * FROM GRAL.tbEstadosCiviles WHERE (eciv_Descripcion = @eciv_Descripcion AND @eciv_Id != @eciv_Id))
			BEGIN
				SELECT 2 codeStatus
			END
		ELSE 
		 BEGIN
			UPDATE	gral.tbEstadosCiviles
			SET		eciv_Descripcion = @eciv_Descripcion, 
					eciv_UsuModificacion = @eciv_UsuModificacion, 
					eciv_FechaModificacion = GETDATE()
			WHERE	eciv_Id = @eciv_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  DELETE ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Delete
(@eciv_Id INT)
AS
BEGIN
	BEGIN TRY
		
		IF EXISTS (SELECT * FROM CALE.tbCiviles WHERE eciv_Id = @eciv_Id)
		 BEGIN
			SELECT 2 codeStatus
		 END

		ELSE IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE eciv_Id = @eciv_Id)
		 BEGIN
			SELECT 2 codeStatus
		 END

		ELSE IF EXISTS (SELECT * FROM CALE.tbAbogadosJueces WHERE eciv_Id = @eciv_Id)
		  BEGIN
			SELECT 2 codeStatus
		  END

		ELSE IF EXISTS (SELECT * FROM CALE.tbEmpleados WHERE eciv_Id = @eciv_Id)
		  BEGIN
			SELECT 2 codeStatus
		  END

		ELSE IF EXISTS (SELECT * FROM CALE.tbEmpresas WHERE eciv_Id = @eciv_Id)
		 BEGIN
			SELECT 2 codeStatus
		 END

		ELSE 
		 BEGIN 
			UPDATE	gral.tbEstadosCiviles
			SET		eciv_Estado = 0
			WHERE	eciv_Id = @eciv_Id

			SELECT 1 codeStatus
		 END
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END

--**************  INDEX ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Index
AS
BEGIN
	SELECT * FROM gral.VW_tbEstadosCiviles
	WHERE eciv_Estado = 1;
END

--**************  FIND ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadosCiviles_Find 
(@eciv_Id INT)
AS
BEGIN
	SELECT * FROM gral.VW_tbEstadosCiviles
	WHERE eciv_Id = @eciv_Id;
END
