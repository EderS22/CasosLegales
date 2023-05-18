CREATE DATABASE DB_CasosLegales
GO

/*
USE MASTER
DROP DATABASE DB_CasosLegales
*/

USE DB_CasosLegales
GO

CREATE SCHEMA GRAL
GO

CREATE SCHEMA ACCE
GO

CREATE SCHEMA CALE
GO

--**********************************************************CREATE TABLES**********************************************************--

--***********************************************************TABLES ACCE***********************************************************--

--**********************************************************TABLE Usuarios*********************************************************--

CREATE TABLE ACCE.tbUsuarios(
	usua_Id					INT IDENTITY(1,1),
	usua_Nombre				NVARCHAR(255) NOT NULL,
	usua_Clave				NVARCHAR(MAX) NOT NULL,
	role_Id					INT NOT NULL,
	empe_Id					INT NOT NULL,
	usua_EsAdmin			BIT DEFAULT 0,

	usua_Estado				BIT DEFAULT 1,
	usua_IdCreacion			INT NOT NULL,
	usua_FechaCreacion		DATETIME DEFAULT GETDATE(),
	usua_IdModificacion		INT DEFAULT NULL,
	usua_FechaModificacion	DATETIME DEFAULT NULL
	CONSTRAINT PK_ACCE_tbUsuarios_usua_Id PRIMARY KEY(usua_Id)
);
GO

--*********************************************************/TABLE Usuarios*********************************************************--

--**********************************************************TABLE Roles************************************************************--

CREATE TABLE ACCE.tbRoles(
	role_Id					INT IDENTITY(1,1),
	role_Nombre				NVARCHAR(150) NOT NULL,
	role_Descripcion		NVARCHAR(255) NOT NULL,
	
	role_Estado				BIT DEFAULT 1,
	usua_IdCreacion			INT NOT NULL,
	role_FechaCreacion		DATETIME DEFAULT GETDATE(),
	usua_IdModificacion		INT DEFAULT NULL,
	role_FechaModificacion	DATETIME DEFAULT NULL
	CONSTRAINT PK_ACCE_tbRoles_role_Id PRIMARY KEY(role_Id)
);
GO

--*********************************************************/TABLE Roles************************************************************--

--********************************************************TABLE Pantallas**********************************************************--

CREATE TABLE ACCE.tbPantallas(
	pant_Id					INT IDENTITY(1,1),
	pant_Pantalla			NVARCHAR(150) NOT NULL,
	pant_Href				NVARCHAR(150) NOT NULL,
	pant_Esquema			NVARCHAR(150) NOT NULL,
	
	pant_Estado				BIT DEFAULT 1,
	usua_IdCreacion			INT NOT NULL,
	pant_FechaCreacion		DATETIME DEFAULT GETDATE(),
	usua_IdModificacion		INT DEFAULT NULL,
	pant_FechaModificacion	DATETIME DEFAULT NULL,
	CONSTRAINT PK_ACCE_tbPantallas_pant_Id	PRIMARY KEY (pant_Id)
);
GO

--*******************************************************/TABLE Pantallas**********************************************************--

--***************************************************TABLE Roles por Pantallas*****************************************************--

CREATE TABLE ACCE.tbRolesPorPantalla(
	ropa_Id					INT IDENTITY(1,1),
	role_Id					INT NOT NULL,
	pant_Id					INT NOT NULL,
	
	ropa_Estado				BIT DEFAULT 1,
	usua_IdCreacion			INT NOT NULL,
	ropa_FechaCreacion		DATETIME DEFAULT GETDATE(),
	usua_IdModificacion		INT DEFAULT NULL,
	ropa_FechaModificacion	DATETIME DEFAULT NULL,
	CONSTRAINT PK_ACCE_tbRolesPorPantalla_ropa_Id PRIMARY KEY (ropa_Id)
);
GO

--**************************************************/TABLE Roles por Pantallas*****************************************************--

--**********************************************************/TABLES ACCE***********************************************************--

--***********************************************************TABLES GRAL***********************************************************--

--*******************************************************TABLE Departamentos*******************************************************--

CREATE TABLE GRAL.tbDepartamentos(
	depa_Id						CHAR(2) NOT NULL,
	depa_Departamento			NVARCHAR(250) NOT NULL,
	
	usua_IdCreacion				INT	NOT NULL,
	depa_FechaCreacion			DATETIME DEFAULT GETDATE(),
	usua_IdModificacion			INT DEFAULT NULL,
	depa_FechaModificacion		DATETIME DEFAULT NULL
	CONSTRAINT PK_GRAL_tbDepartamentos_depa_Id PRIMARY KEY (depa_Id)
);
GO

--******************************************************/TABLE Departamentos*******************************************************--

--********************************************************TABLE Municipios*********************************************************--
	
CREATE TABLE GRAL.tbMunicipios(
	muni_Id						CHAR(4) NOT NULL,
	muni_Municipio				NVARCHAR(250) NOT NULL,
	depa_Id						CHAR(2) NOT NULL,
	
	usua_IdCreacion				INT NOT NULL,
	muni_FechaCreacion			DATETIME DEFAULT GETDATE(),
	usua_IdModificacion			INT DEFAULT NULL,
	muni_FechaModificacion		DATETIME DEFAULT NULL
	CONSTRAINT PK_GRAL_tbMunicipios_muni_Id PRIMARY KEY (muni_Id),
	CONSTRAINT FK_GRAL_tbMunicipios_dept_Id_GRAL_tbDepartamentos_dep_Id FOREIGN KEY (depa_Id) REFERENCES GRAL.tbDepartamentos (depa_Id)
);
GO

--********************************************************/TABLE Municipios********************************************************--

--********************************************************TABLE Direcciones********************************************************--

CREATE TABLE GRAL.tbDirecciones
(
	dire_Id						INT IDENTITY(1,1),   
	muni_Id						CHAR(4) NOT NULL,
	dire_DireccionExacta		NVARCHAR(MAX) NOT NULL,

	dire_Estado					BIT DEFAULT 1,
	usua_IdCreacion				INT NOT NULL,
	dire_FechaCreacion			DATETIME DEFAULT GETDATE(),
	usua_IdModificacion			INT DEFAULT NULL,
	dire_FechaModificacion		DATETIME DEFAULT NULL
	CONSTRAINT PK_GRAL_tbDirecciones_dire_Id PRIMARY KEY (dire_Id)
);
GO

--*******************************************************/TABLE Direcciones********************************************************--

--*******************************************************TABLE EstadosCiviles******************************************************--

CREATE TABLE GRAL.tbEstadosCiviles(
	esci_Id						CHAR(1) NOT NULL,
	esci_Descripcion			NVARCHAR(250) NOT NULL,
	
	usua_IdCreacion				INT	NOT NULL,
	esci_FechaCreacion			DATETIME DEFAULT GETDATE(),
	usua_IdModificacion			INT DEFAULT NULL,
	esci_FechaModificacion		DATETIME DEFAULT NULL
	CONSTRAINT PK_GRAL_tbEstadosCiviles_esci_Id	PRIMARY KEY (esci_Id)
);
GO

--*****************************************************/TABLE Estados Civiles*****************************************************--

--**********************************************************/TABLES GRAL***********************************************************--

--***********************************************************TABLES CALE***********************************************************--




--**********************************************************/TABLES CALE***********************************************************--

--*********************************************************/CREATE TABLES**********************************************************--
-------------------------------------------------------------------------------------------------------------------------------------

--*********************************************************INSERTS TABLES**********************************************************--

--***********************************************************TABLES ACCE***********************************************************--

--**********************************************************TABLE Usuarios*********************************************************--

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = '2023';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave),2)

INSERT INTO ACCE.tbUsuarios (role_Id, empe_Id, usua_Nombre, usua_Clave, usua_EsAdmin, usua_IdCreacion)
VALUES (1, 1, 'Eder', @Pass, 1, 1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'algo';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave),2)

INSERT INTO ACCE.tbUsuarios (role_Id, empe_Id, usua_Nombre, usua_Clave, usua_EsAdmin, usua_IdCreacion)
VALUES (2, 2, 'Francisco', @Pass, 1, 1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'nose';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave),2)

INSERT INTO ACCE.tbUsuarios (role_Id, empe_Id, usua_Nombre, usua_Clave, usua_EsAdmin, usua_IdCreacion)
VALUES (2, 3, 'Cristian', @Pass, 1, 1);

GO
DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = 'ESDRINHA';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave),2)

INSERT INTO ACCE.tbUsuarios (role_Id, empe_Id, usua_Nombre, usua_Clave, usua_EsAdmin, usua_IdCreacion)
VALUES (1, 4, 'ESDRINHA', @Pass, 1, 1);
GO

DECLARE @Pass AS NVARCHAR(MAX), @Clave AS NVARCHAR(250);
SET @Clave = '2022';
SET @Pass = CONVERT(NVARCHAR(MAX), HASHBYTES('sha2_512', @Clave),2)

INSERT INTO ACCE.tbUsuarios (role_Id, empe_Id, usua_Nombre, usua_Clave, usua_EsAdmin, usua_IdCreacion)
VALUES (1, 5, 'Sofia', @Pass, 0, 1);
GO

--*********************************************************/TABLE Usuarios*********************************************************--

--**********************************************************TABLE Roles************************************************************--

INSERT INTO ACCE.tbRoles (role_Nombre, role_Descripcion, usua_IdCreacion)
VALUES ('Digitador', 'Tiene acceso a ingresar datos', 1)
GO

INSERT INTO ACCE.tbRoles (role_Nombre, role_Descripcion, usua_IdCreacion)
VALUES ('Visualizador', 'Tiene acceso a visualizar datos', 1)
GO

--*********************************************************/TABLE Roles************************************************************--

--********************************************************TABLE Pantallas**********************************************************--



--*******************************************************/TABLE Pantallas**********************************************************--

--***************************************************TABLE Roles por Pantallas*****************************************************--


--**************************************************/TABLE Roles por Pantallas*****************************************************--

--**********************************************************/TABLES ACCE***********************************************************--

--***********************************************************TABLES GRAL***********************************************************--

--*******************************************************TABLE Departamentos*******************************************************--

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)
VALUES ('01', 'Atlántida', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)    
VALUES ('02', 'Colón', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('03', 'Comayagua', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('04', 'Copán', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('05', 'Cortés', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('06', 'Choluteca', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('07', 'El Paraíso', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('08', 'Francisco Morazán', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('09', 'Gracias a Dios', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('10', 'Intibucá', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('11', 'Islas de la Bahía', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('12', 'La Paz', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('13', 'Lempira', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('14', 'Ocotepeque', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('15', 'Olancho', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('16', 'Santa Bárbara', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('17', 'Valle', 1);
GO

INSERT INTO GRAL.tbDepartamentos (depa_Id, depa_Departamento, usua_IdCreacion)  
VALUES ('18', 'Yoro', 1);
GO


--******************************************************/TABLE Departamentos*******************************************************--

--********************************************************TABLE Municipios*********************************************************--

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0101', 'La Ceiba', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0102', 'El Porvenir', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0103', 'Esparta', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0104', 'Jutiapa', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0105', 'La Masica', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0106', 'San Francisco', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0107', 'Tela', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0108', 'Arizona', '01', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0201', 'Trujillo', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0202', 'Balfate', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0203', 'Iriona', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0204', 'Limón', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0205', 'Sabá', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0206', 'Santa Fe', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0207', 'Santa Rosa de Aguán', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0208', 'Sonaguera', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0209', 'Tocoa', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0210', 'Bonito Oriental', '02', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0301', 'Comayagua', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0302', 'Ajuterique', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0303', 'El Rosario', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0304', 'Esquías', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0305', 'Humuya', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0306', 'La Libertad', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0307', 'Lamaní', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0308', 'La Trinidad', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0309', 'Lejamaní', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0310', 'Meámbar', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0311', 'Minas de Oro', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0312', 'Ojos de Agua', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0313', 'San Jerónimo', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0314', 'San José de Comayagua', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0315', 'San José del Potrero', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0316', 'San Luis', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0317', 'San Sebastián', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0318', 'Siguatepeque', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0319', 'Villa de San Antonio', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0320', 'Las Lajas', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0321', 'Taulabé', '03', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0401', 'Santa Rosa de Copán', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0402', 'Cabañas', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0403', 'Concepción', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0404', 'Copán Ruinas', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0405', 'Corquín', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0406', 'Cucuyagua', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0407', 'Dolores', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0408', 'Dulce Nombre', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0409', 'El Paraíso', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0410', 'Florida', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0411', 'La Jigua', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0412', 'La Unión', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0413', 'Nueva Arcadia', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0414', 'San Agustín', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0415', 'San Antonio', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0416', 'San Jerónimo', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0417', 'San José', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0418', 'San Juan de Opoa', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0419', 'San Nicolás', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0420', 'San Pedro', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0421', 'Santa Rita', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0422', 'Trinidad de Copán', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0423', 'Veracruz', '04', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0501', 'San Pedro Sula', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0502', 'Choloma', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0503', 'Omoa', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0504', 'Pimienta', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0505', 'Potrerillos', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0506', 'Puerto Cortés', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0507', 'San Antonio de Cortés', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0508', 'San Francisco de Yojoa', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0509', 'San Manuel', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0510', 'Santa Cruz de Yojoa', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0511', 'Villanueva', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0512', 'La Lima', '05', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0601', 'Choluteca', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0602', 'Apacilagua', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0603', 'Concepción de María', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0604', 'Duyure', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0605', 'El Corpus', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0606', 'El Triunfo', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0607', 'Marcovia', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0608', 'Morolica', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0609', 'Namasigüe', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0610', 'Orocuina', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0611', 'Pespire', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0612', 'San Antonio de Flores', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0613', 'San Isidro', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0614', 'San José', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0615', 'San Marcos de Colón', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0616', 'Santa Ana de Yusguare, ', '06', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0701', 'Yuscarán', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0702', 'Alauca', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0703', 'Danlí', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0704', 'El Paraíso', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0705', 'Güinope', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0706', 'Jacaleapa', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0707', 'Liure', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0708', 'Morocelí', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0709', 'Oropolí', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0710', 'Potrerillos', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0711', 'San Antonio de Flores', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0712', 'San Lucas', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0713', 'San Matías', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0714', 'Soledad', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0715', 'Teupasenti', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0716', 'Texiguat', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0717', 'Vado Ancho', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0718', 'Yauyupe', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0719', 'Trojes', '07', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0801', 'Distrito Central (Tegucigalpa y Comayaguela)', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0802', 'Alubarén', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0803', 'Cedros', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0804', 'Curarén', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0805', 'El Porvenir', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0806', 'Guaimaca', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0807', 'La Libertad', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0808', 'La Venta', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0809', 'Lepaterique', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0810', 'Maraita', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0811', 'Marale', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0812', 'Nueva Armenia', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0813', 'Ojojona', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0814', 'Orica (Francisco Morazan)', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0815', 'Reitoca', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0816', 'Sabanagrande', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0817', 'San Antonio de Oriente', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0818', 'San Buenaventura', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0819', 'San Ignacio', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0820', 'San Juan de Flores o como se le conoce Cantarranas', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0821', 'San Miguelito', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0822', 'Santa Ana', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0823', 'Santa Lucía', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0824', 'Talanga', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0825', 'Tatumbla', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0826', 'Valle de Ángeles', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0827', 'Villa de San Francisco', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0828', 'Vallecillo', '08', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0901', 'Puerto Lempira', '09', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0902', 'Brus Laguna', '09', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0903', 'Ahuas', '09', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0904', 'Juan Francisco Bulnes', '09', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0905', 'Ramón Villeda Morales', '09', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('0906', 'Wampusirpe', '09', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1001', 'La Esperanza', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1002', 'Camasca', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1003', 'Colomoncagua', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1004', 'Concepción', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1005', 'Dolores', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1006', 'Intibucá', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1007', 'Jesús de Otoro', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1008', 'Magdalena', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1009', 'Masaguara', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1010', 'San Antonio', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1011', 'San Isidro', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1012', 'San Juan', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1013', 'San Marcos de la Sierra', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1014', 'San Miguel Guancapla', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1015', 'Santa Lucía', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1016', 'Yamaranguila', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1017', 'San Francisco de Opalaca', '10', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1101', 'Roatán', '11', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1102', 'Guanaja', '11', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1103', 'José Santos Guardiola', '11', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1104', 'Utila', '11', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1201', 'La Paz', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1202', 'Aguanqueterique', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1203', 'Cabañas', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1204', 'Cane', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1205', 'Chinacla', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1206', 'Guajiquiro', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1207', 'Lauterique', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1208', 'Marcala', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1209', 'Mercedes de Oriente', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1210', 'Opatoro', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1211', 'San Antonio del Norte', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1212', 'San José', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1213', 'San Juan', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1214', 'San Pedro de Tutule', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1215', 'Santa Ana', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1216', 'Santa Elena', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1217', 'Santa María', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1218', 'Santiago de Puringla', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1219', 'Yarula', '12', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1301', 'Gracias', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1302', 'Belén', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1303', 'Candelaria', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1304', 'Cololaca', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1305', 'Erandique', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1306', 'Gualcince', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1307', 'Guarita', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1308', 'La Campa', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1309', 'La Iguala', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1310', 'LaS Flores', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1311', 'La Unión', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1312', 'La Virtud', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1313', 'Lepaera', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1314', 'Mapulaca', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1315', 'Piraera', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1316', 'San Andrés', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1317', 'San Francisco', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1318', 'San Juan Guarita', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1319', 'San Manuel Colohete', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1320', 'San Rafael', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1321', 'San Sebastián', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1322', 'Santa Cruz', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1323', 'Talgua', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1324', 'Tambla', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1325', 'Tomalá', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1326', 'Valladolid', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1327', 'Virginia', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1328', 'San Marcos de Caiquín', '13', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1401', 'Nueva Ocotepeque', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1402', 'Belén Gualcho', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1403', 'Concepción', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1404', 'Dolores Merendón', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1405', 'Fraternidad', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1406', 'La Encarnación', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1407', 'La Labor', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1408', 'Lucerna', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1409', 'Mercedes', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1410', 'San Fernando', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1411', 'San Francisco del Valle', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1412', 'San Jorge', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1413', 'San Marcos', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1414', 'Santa Fe', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1415', 'Sensenti', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1416', 'Sinuapa', '14', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1501', 'Juticalpa', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1502', 'Campamento', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1503', 'Catacamas', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1504', 'Concordia', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1505', 'Dulce Nombre de Culmí', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1506', 'El Rosario', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1507', 'Esquipulas del Norte', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1508', 'Gualaco', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1509', 'Guarizama', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1510', 'Guata', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1511', 'Guayape', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1512', 'Jano', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1513', 'La Unión', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1514', 'Mangulile', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1515', 'Manto', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1516', 'Salamá', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1517', 'San Esteban', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1518', 'San Francisco de Becerra', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1519', 'San Francisco de la Paz', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1520', 'Santa María del Real', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1521', 'Silca', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1522', 'Yocón', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1523', 'Patuca', '15', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1601', 'Santa Bárbara', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1602', 'Arada', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1603', 'Atima', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1604', 'Azacualpa', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1605', 'Ceguaca', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1606', 'San José de las Colinas', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1607', 'Concepción del Norte', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1608', 'Concepción del Sur', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1609', 'Chinda', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1610', 'El Níspero', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1611', 'Gualala', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1612', 'Ilama', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1613', 'Macuelizo', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1614', 'Naranjito', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1615', 'Nuevo Celilac', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1616', 'Petoa', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1617', 'Protección', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1618', 'Quimistán', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1619', 'San Francisco de Ojuera', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1620', 'San Luis', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1621', 'San Marcos', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1622', 'San Nicolás', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1623', 'San Pedro Zacapa', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1624', 'Santa Rita', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1625', 'San Vicente Centenario', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1626', 'Trinidad', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1627', 'LaS Vegas', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1628', 'Nueva Frontera', '16', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1701', 'Nacaome', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1702', 'Alianza', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1703', 'Amapala', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1704', 'Aramecina', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1705', 'Caridad', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1706', 'Goascorán', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1707', 'Langue', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1708', 'San Francisco de Coray', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1709', 'San Lorenzo', '17', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1801', 'Yoro', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1802', 'Arenal', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1803', 'El Negrito', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1804', 'El Progreso', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1805', 'Jocón', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1806', 'Morazán', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1807', 'Olanchito', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1808', 'Santa Rita', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1809', 'Sulaco', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1810', 'Victoria', '18', 1);
GO

INSERT INTO GRAL.tbMunicipios (muni_Id, muni_Municipio, depa_Id, usua_IdCreacion)
VALUES('1811', 'Yorito', '18', 1);
GO

--********************************************************/TABLE Municipios********************************************************--

--*******************************************************TABLE EstadosCiviles******************************************************--

INSERT INTO GRAL.tbEstadosCiviles (esci_Id, esci_Descripcion, usua_IdCreacion)
VALUES ('S', 'Soltero(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (esci_Id, esci_Descripcion, usua_IdCreacion)
VALUES ('C', 'Casado(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (esci_Id, esci_Descripcion, usua_IdCreacion)
VALUES ('V', 'Viudo(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (esci_Id, esci_Descripcion, usua_IdCreacion)
VALUES ('D', 'Divorciado(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (esci_Id, esci_Descripcion, usua_IdCreacion)
VALUES ('U', 'Union Libre', 1);
GO

--*****************************************************/TABLE Estados Civiles*****************************************************--

--********************************************************TABLE Direcciones*******************************************************--

INSERT INTO GRAL.tbDirecciones(muni_Id, dire_DireccionExacta, usua_IdCreacion)
VALUES  ('0501', 'Res. Larios Silva, Sector Felipe Zelaya, Casa #12, Bloque #14, Calle Principal', 1)
GO

INSERT INTO GRAL.tbDirecciones(muni_Id, dire_DireccionExacta, usua_IdCreacion)
VALUES ('1510', 'Col. Mónaco, Sector Las Acacias, 1ra Calle, 2da Avenida.', 1)
GO

INSERT INTO GRAL.tbDirecciones(muni_Id, dire_DireccionExacta, usua_IdCreacion)
VALUES ('0906', 'Col. La Paz, La Lima, Cortes, Honduras.', 1)
GO

INSERT INTO GRAL.tbDirecciones(muni_Id, dire_DireccionExacta, usua_IdCreacion)
VALUES ('1601', 'Res. Villas El Dorado, Calle Michelleti, Casa #23, Bloque #15.', 1)
GO

INSERT INTO GRAL.tbDirecciones(muni_Id, dire_DireccionExacta, usua_IdCreacion)
VALUES ('0608', 'Col. Jerusalén, La Lima, Cortes, Honduras.', 1)
GO

--********************************************************/TABLE Direcciones*******************************************************--

--**********************************************************/TABLES GRAL***********************************************************--

--***********************************************************TABLES CALE***********************************************************--






--***********************************************************TABLES CALE***********************************************************--

--********************************************************/INSERTS TABLES**********************************************************--

-------------------------------------------------------------------------------------------------------------------------------------

--**********************************************************ALTERS TABLES**********************************************************--

--***********************************************************TABLES ACCE***********************************************************--

--ALTERS TABLE 'tbUsuarios'
ALTER TABLE ACCE.tbUsuarios ADD CONSTRAINT FK_ACCE_tbUsuarios_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE ACCE.tbUsuarios ADD CONSTRAINT FK_ACCE_tbUsuarios_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE ACCE.tbUsuarios ADD CONSTRAINT FK_ACCE_tbUsuarios_role_Id_ACCE_tbRoles_role_Id FOREIGN KEY (role_Id) REFERENCES ACCE.tbRoles (role_Id)
GO

--ALTERS TABLE 'tbRoles'
ALTER TABLE ACCE.tbRoles ADD CONSTRAINT FK_ACCE_tbRoles_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE ACCE.tbRoles ADD CONSTRAINT FK_ACCE_tbRoles_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO

--ALTERS TABLE 'tbPantallas'
ALTER TABLE ACCE.tbPantallas ADD CONSTRAINT FK_ACCE_tbPantallas_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE ACCE.tbPantallas ADD CONSTRAINT FK_ACCE_tbPantallas_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO

--ALTERS TABLE 'tbRolesPorPantalla'
ALTER TABLE ACCE.tbRolesPorPantalla ADD CONSTRAINT FK_ACCE_tbRolesPorPantalla_role_Id_ACCE_tbRoles_role_Id FOREIGN KEY (role_Id) REFERENCES ACCE.tbRoles (role_Id)
GO
ALTER TABLE ACCE.tbRolesPorPantalla ADD CONSTRAINT FK_ACCE_tbRolesPorPantalla_pant_Id_ACCE_tbPantallas_pant_Id FOREIGN KEY (pant_Id) REFERENCES ACCE.tbPantallas (pant_Id)
GO
ALTER TABLE ACCE.tbRolesPorPantalla ADD CONSTRAINT FK_ACCE_tbRolesPorPantalla_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE ACCE.tbRolesPorPantalla ADD CONSTRAINT FK_ACCE_tbRolesPorPantalla_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO

--**********************************************************/TABLES ACCE***********************************************************--

--***********************************************************TABLES GRAL***********************************************************--

--ALTERS TABLE 'tbDepartamentos'
ALTER TABLE GRAL.tbDepartamentos ADD CONSTRAINT FK_GRAL_tbDepartamentos_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE GRAL.tbDepartamentos ADD CONSTRAINT FK_GRAL_tbDepartamentos_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO

--ALTERS TABLE 'tbMunicipios'
ALTER TABLE GRAL.tbMunicipios ADD CONSTRAINT FK_GRAL_tbMunicipios_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE GRAL.tbMunicipios ADD CONSTRAINT FK_GRAL_tbMunicipios_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO

--ALTERS TABLE 'tbEstadosCiviles'
ALTER TABLE GRAL.tbEstadosCiviles ADD CONSTRAINT FK_GRAL_tbEstadosCiviles_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE GRAL.tbEstadosCiviles ADD CONSTRAINT FK_GRAL_tbEstadosCiviles_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO

--ALTERS TABLE 'tbDirecciones'
ALTER TABLE GRAL.tbDirecciones ADD CONSTRAINT FK_GRAL_tbDirecciones_usua_IdCreacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdCreacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO
ALTER TABLE GRAL.tbDirecciones ADD CONSTRAINT FK_GRAL_tbDirecciones_usua_IdModificacion_ACCE_tbUsuarios_usua_Id FOREIGN KEY (usua_IdModificacion) REFERENCES ACCE.tbUsuarios (usua_Id)
GO

--**********************************************************/TABLES GRAL***********************************************************--

--***********************************************************TABLES CALE***********************************************************--




--**********************************************************/TABLES CALE***********************************************************--

--*********************************************************/ALTERS TABLES**********************************************************--


INSERT INTO CALE.tbAbogadosJueces (abju_DNI, abju_Nombres, abju_Apellidos, abju_Sexo, abju_Telefono, abju_CorreoElectronico, abju_FechaNacimiento, eciv_Id, carg_Id, muni_Id, abju_Direccion, abju_UsuCreacion)
VALUES ('123456789', 'Juan', 'Pérez', 'M', '123456789', 'juan.perez@gmail.com', '1990-01-01', 1, 1, 1, 'Calle Principal 123', 1),
		('987654321', 'María', 'López', 'F', '987654321', 'maria.lopez@gmail.com', '1995-05-10', 2, 2, 2, 'Avenida Secundaria 456', 1),
		('555555555', 'Pedro', 'González', 'M', '555555555', 'pedro.gonzalez@gmail.com', '1985-12-15', 3, 1, 3, 'Plaza Central 789', 1),
		('111111111', 'Ana', 'García', 'F', '111111111', 'ana.garcia@gmail.com', '1988-06-20', 2, 2, 1, 'Calle Secundaria 234', 1),
		('222222222', 'Luis', 'Martínez', 'M', '222222222', 'luis.martinez@gmail.com', '1992-09-08', 1, 3, 2, 'Avenida Principal 567', 1),
		('333333333', 'Laura', 'Rodríguez', 'F', '333333333', 'laura.rodriguez@gmail.com', '1997-03-12', 3, 1, 3, 'Plaza Secundaria 890', 1);


INSERT INTO GRAL.tbCargos (carg_Descripcion, carg_UsuCreacion)
VALUES ('Gerente', 1),
		('Supervisor', 2),
		('Analista', 3),
		('Ejecutivo de Ventas', 4),
		('Analista Financiero', 5),
		('Coordinador de Proyectos', 6);


INSERT INTO CALE.tbCiviles (civi_DNI, civi_Nombres, civi_Apellidos, civi_Sexo, civi_Telefono, civi_CorreoElectronico, civi_FechaNacimiento, eciv_Id, muni_Id, civi_Direccion, civi_EsDemandante, civi_EsAcusado, civi_EsTestigo, civi_UsuCreacion)
VALUES ('123456789', 'Juan', 'Pérez', 'M', '123456789', 'juan.perez@example.com', '1990-01-01', 1, 1, 'Calle Principal 123', 1, 0, 0, 1),
		('987654321', 'María', 'López', 'F', '987654321', 'maria.lopez@example.com', '1995-05-10', 2, 2, 'Avenida Secundaria 456', 0, 1, 0, 2),
		('555555555', 'Pedro', 'González', 'M', '555555555', 'pedro.gonzalez@example.com', '1985-12-15', 3, 1, 'Plaza Central 789', 1, 0, 0, 3),
		('111111111', 'Ana', 'García', 'F', '111111111', 'ana.garcia@example.com', '1988-06-20', 2, 2, 'Calle Secundaria 234', 1, 0, 1, 4),
		('222222222', 'Luis', 'Martínez', 'M', '222222222', 'luis.martinez@example.com', '1992-09-08', 1, 3, 'Avenida Principal 567', 0, 1, 0, 5),
		('333333333', 'Laura', 'Rodríguez', 'F', '333333333', 'laura.rodriguez@example.com', '1997-03-12', 3, 1, 'Plaza Secundaria 890', 0, 0, 1, 6);

-- Insert 1
INSERT INTO CALE.tbEmpleados (empe_DNI, empe_Nombres, empe_Apellidos, empe_Sexo, empe_Telefono, empe_CorreoElectronico, empe_FechaNacimiento, eciv_Id, muni_Id, empe_Direccion, empe_UsuCreacion)
VALUES ('111111111', 'Juan', 'Pérez', 'M', '111111111', 'juan.perez@example.com', '1990-01-01', 1, 1, 'Calle Principal 123', 1),
		('222222222', 'María', 'López', 'F', '222222222', 'maria.lopez@example.com', '1995-05-10', 2, 2, 'Avenida Secundaria 456', 2),
		('333333333', 'Pedro', 'González', 'M', '333333333', 'pedro.gonzalez@example.com', '1985-12-15', 3, 1, 'Plaza Central 789', 3),
		('444444444', 'Ana', 'García', 'F', '444444444', 'ana.garcia@example.com', '1992-06-20', 2, 2, 'Calle Secundaria 234', 4),
		('555555555', 'Luis', 'Martínez', 'M', '555555555', 'luis.martinez@example.com', '1997-09-08', 1, 3, 'Avenida Principal 567', 5),
		('666666666', 'Laura', 'Rodríguez', 'F', '666666666', 'laura.rodriguez@example.com', '1994-03-12', 3, 1, 'Plaza Secundaria 890', 6),
		('777777777', 'Carlos', 'Gómez', 'M', '777777777', 'carlos.gomez@example.com', '1989-11-25', 2, 2, 'Calle Principal 789', 7),
		('888888888', 'María', 'Torres', 'F', '888888888', 'maria.torres@example.com', '1993-07-18', 3, 1, 'Avenida Secundaria 456', 8),
		('999999999', 'Manuel', 'Sánchez', 'M', '999999999', 'manuel.sanchez@example.com', '1991-04-30', 1, 3, 'Plaza Central 789', 9),
		('101010101', 'Susana', 'López', 'F', '101010101', 'susana.lopez@example.com', '1996-08-05', 2, 2, 'Calle Secundaria 234', 10);


