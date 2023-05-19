﻿/*
USE MASTER
DROP DATABASE DB_CasosLegales
*/

CREATE DATABASE DB_CasosLegales
GO

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
	role_Id					INT,
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
depa_Id                     INT IDENTITY(1,1),
depa_Nombre 				NVARCHAR(100) NOT NULL,
depa_Codigo  				CHAR(2) NOT NULL,
depa_UsuCreacion			INT NOT NULL,
depa_FechaCreacion			DATETIME NOT NULL CONSTRAINT DF_GRAL_tbDepartamentos_depa_FechaCreacion DEFAULT(GETDATE()),
depa_UsuModificacion		INT,
depa_FechaModificacion		DATETIME,
depa_Estado					BIT NOT NULL CONSTRAINT DF_GRAL_tbDepartamentos_depa_Estado DEFAULT(1)

CONSTRAINT PK_GRAL_tbDepartamentos_depa_Id 									PRIMARY KEY(depa_Id),
CONSTRAINT FK_GRAL_tbDepartamentos_ACCE_tbUsuarios_depa_UsuCreacion_usua_Id  		FOREIGN KEY(depa_UsuCreacion) 		REFERENCES acce.tbUsuarios(usua_Id),
CONSTRAINT FK_GRAL_tbDepartamentos_ACCE_tbUsuarios_depa_UsuModificacion_usua_Id  	FOREIGN KEY(depa_UsuModificacion) 	REFERENCES acce.tbUsuarios(usua_Id)
);
GO

--******************************************************/TABLE Departamentos*******************************************************--

--********************************************************TABLE Municipios*********************************************************--
	
CREATE TABLE GRAL.tbMunicipios(
muni_Id                 INT IDENTITY(1,1),
muni_Nombre				NVARCHAR(80) NOT NULL,
muni_Codigo				CHAR(4)	NOT NULL,
depa_Id					INT	NOT NULL,
muni_UsuCreacion		INT	NOT NULL,
muni_FechaCreacion		DATETIME NOT NULL CONSTRAINT DF_GRAL_tbMunicipios_muni_FechaCreacion DEFAULT(GETDATE()),
muni_UsuModificacion	INT,
muni_FechaModificacion	DATETIME,
muni_Estado				BIT	NOT NULL CONSTRAINT DF_GRAL_tbMunicipios_muni_Estado DEFAULT(1)

CONSTRAINT PK_GRAL_tbMunicipios_muni_Id 										PRIMARY KEY(muni_Id),
CONSTRAINT FK_GRAL_tbMunicipios_GRAL_tbDepartamentos_depa_Id 					FOREIGN KEY(depa_Id) 						REFERENCES gral.tbDepartamentos(depa_Id),
CONSTRAINT FK_GRAL_tbMunicipios_ACCE_tbUsuarios_muni_UsuCreacion_usua_Id  		FOREIGN KEY(muni_UsuCreacion) 				REFERENCES acce.tbUsuarios(usua_Id),
CONSTRAINT FK_GRAL_tbMunicipios_ACCE_tbUsuarios_muni_UsuModificacion_usua_Id  	FOREIGN KEY(muni_UsuModificacion) 			REFERENCES acce.tbUsuarios(usua_Id)
);
GO

--********************************************************/TABLE Municipios********************************************************--

--*******************************************************TABLE EstadosCiviles******************************************************--

CREATE TABLE GRAL.tbEstadosCiviles(
	eciv_Id						INT IDENTITY(1,1) NOT NULL,
	eciv_Descripcion			NVARCHAR(250) NOT NULL,
	
	eciv_Estado					BIT DEFAULT 1,
	eciv_UsuCreacion			INT	NOT NULL,
	eciv_FechaCreacion			DATETIME DEFAULT GETDATE(),
	eciv_UsuModificacion		INT DEFAULT NULL,
	eciv_FechaModificacion		DATETIME DEFAULT NULL
	CONSTRAINT PK_GRAL_tbEstadosCiviles_eciv_Id	PRIMARY KEY (eciv_Id)
);
GO

--*****************************************************/TABLE Estados Civiles*****************************************************--

--***********************************************************TABLE Cargos**********************************************************--

CREATE TABLE GRAL.tbCargos(
carg_Id INT IDENTITY(1,1),
carg_Descripcion			NVARCHAR(100) NOT NULL,
carg_UsuCreacion			INT NOT NULL,
carg_FechaCreacion			DATETIME CONSTRAINT DF_GRAL_tbCargos_carg_FechaCreacion DEFAULT(GETDATE()),
carg_UsuModificacion		INT ,
carg_FechaModificacion		DATETIME,
carg_Estado					BIT CONSTRAINT DF_GRAL_tbCargos_carg_Estado DEFAULT(1)

CONSTRAINT PK_GRAL_tbcargos_carg_Id                                  PRIMARY KEY(carg_Id),
CONSTRAINT FK_GRAL_tbCargos_acce_tbUsuarios_carg_UsuCreacion         FOREIGN KEY(carg_UsuCreacion) REFERENCES acce.tbUsuarios(usua_Id),
CONSTRAINT FK_GRAL_tbCargos_acce_tbUsuarios_carg_UsuModificacion     FOREIGN KEY(carg_UsuModificacion) REFERENCES acce.tbUsuarios(usua_Id)
);
GO

--**********************************************************/TABLE Cargos**********************************************************--

--**********************************************************/TABLES GRAL***********************************************************--

--***********************************************************TABLES CALE***********************************************************--

--********** TABLE  ABOGADOSJUECES ************--
CREATE TABLE CALE.tbAbogadosJueces(
abju_Id						INT IDENTITY(1,1),
abju_DNI					NVARCHAR(15)	NOT NULL,
abju_Nombres				NVARCHAR(200)	NOT NULL,
abju_Apellidos				NVARCHAR(200)	NOT NULL,
abju_Sexo					CHAR(1)			NOT NULL,
abju_Telefono				NVARCHAR(20)	NOT NULL,
abju_CorreoElectronico		NVARCHAR(150)	NOT NULL,
abju_FechaNacimiento		DATE			NOT NULL,
eciv_Id					    INT				NOT NULL,
carg_Id						INT				NOT NULL,
muni_Id						INT				NOT NULL,
abju_Direccion				NVARCHAR(250)	NOT NULL,
abju_UsuCreacion			INT				NOT NULL,
abju_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbAbogadosJueces_abog_FechaCreacion DEFAULT(GETDATE()),
abju_UsuModificacion		INT,
abju_FechaModificacion		DATETIME,
abju_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbAbogadosJueces_abog_Estado DEFAULT(1)
	
CONSTRAINT PK_CALE_tbAbogadosJueces_abog_Id										PRIMARY KEY(abju_Id),
CONSTRAINT CK_CALE_tbAbogadosJueces_abog_Sexo									CHECK(abju_Sexo IN ('F', 'M')),
CONSTRAINT FK_CALE_tbAbogadosJueces_GRAL_tbEstadosCiviles_eciv_Id        		FOREIGN KEY(eciv_Id)					    REFERENCES GRAL.tbEstadosCiviles(eciv_Id),	
CONSTRAINT FK_CALE_tbAbogadosJueces_GRAL_tbCargos_carg_Id       				FOREIGN KEY(carg_Id)					    REFERENCES GRAL.tbCargos(carg_Id),			
CONSTRAINT FK_CALE_tbAbogadosJueces_GRAL_tbMunicipios_muni_Id					FOREIGN KEY(muni_Id)						REFERENCES GRAL.tbMunicipios(muni_Id),
CONSTRAINT FK_CALE_tbAbogadosJueces_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(abju_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbAbogadosJueces_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(abju_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id)
);	
GO

--********** TABLE CIVILES ************--
CREATE TABLE CALE.tbCiviles(
civi_Id						INT IDENTITY(1,1),
civi_DNI					NVARCHAR(15)	NOT NULL,
civi_Nombres				NVARCHAR(200)	NOT NULL,
civi_Apellidos				NVARCHAR(200)	NOT NULL,
civi_Sexo					CHAR(1)			NOT NULL,
civi_Telefono				NVARCHAR(20)	NOT NULL,
civi_CorreoElectronico		NVARCHAR(150)	NOT NULL,
civi_FechaNacimiento		DATE			NOT NULL,
eciv_Id					    INT				NOT NULL,
muni_Id						INT				NOT NULL,
civi_Direccion				NVARCHAR(250)	NOT NULL,
civi_EsDemandante			BIT				NOT NULL CONSTRAINT DF_CALE_tbCiviles_civi_EsDemandante DEFAULT(0),
civi_EsAcusado				BIT				NOT NULL CONSTRAINT DF_CALE_tbCiviles_civi_EsAcusado DEFAULT(0),
civi_EsTestigo				BIT				NOT NULL CONSTRAINT DF_CALE_tbCiviles_civi_EsTestigo DEFAULT(0),
civi_UsuCreacion			INT				NOT NULL,
civi_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbCiviles_civi_FechaCreacion DEFAULT(GETDATE()),
civi_UsuModificacion		INT,
civi_FechaModificacion		DATETIME,
civi_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbCiviles_civi_Estado DEFAULT(1)
	
CONSTRAINT PK_CALE_tbCiviles_civi_Id									PRIMARY KEY	(civi_Id),
CONSTRAINT CK_CALE_tbCiviles_civi_Sexo									CHECK		(civi_Sexo IN ('F', 'M')),
CONSTRAINT FK_CALE_tbCiviles_GRAL_tbEstadosCiviles_eciv_Id        		FOREIGN KEY(eciv_Id)					    REFERENCES GRAL.tbEstadosCiviles(eciv_Id),			
CONSTRAINT FK_CALE_tbCiviles_GRAL_tbMunicipios_muni_Id					FOREIGN KEY(muni_Id)						REFERENCES GRAL.tbMunicipios(muni_Id),
CONSTRAINT FK_CALE_tbCiviles_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(civi_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbCiviles_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(civi_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id)
);	
GO


--********** TABLE EMPLEADOS ************--
CREATE TABLE CALE.tbEmpleados(
empe_Id						INT IDENTITY(1,1),
empe_DNI					NVARCHAR(15)	NOT NULL,
empe_Nombres				NVARCHAR(200)	NOT NULL,
empe_Apellidos				NVARCHAR(200)	NOT NULL,
empe_Sexo					CHAR(1)			NOT NULL,
empe_Telefono				NVARCHAR(20)	NOT NULL,
empe_CorreoElectronico		NVARCHAR(150)	NOT NULL,
empe_FechaNacimiento		DATE			NOT NULL,
eciv_Id					    INT				NOT NULL,
muni_Id						INT				NOT NULL,
empe_Direccion				NVARCHAR(250)	NOT NULL,
empe_UsuCreacion			INT				NOT NULL,
empe_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbEmpleados_empe_FechaCreacion DEFAULT(GETDATE()),
empe_UsuModificacion		INT,
empe_FechaModificacion		DATETIME,
empe_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbEmpleados_empe_Estado DEFAULT(1)
	
CONSTRAINT PK_CALE_tbEmpleados_empe_Id										PRIMARY KEY	(empe_Id),
CONSTRAINT CK_CALE_tbEmpleados_empe_Sexo									CHECK		(empe_Sexo IN ('F', 'M')),
CONSTRAINT FK_CALE_tbEmpleados_GRAL_tbEstadosCiviles_eciv_Id        		FOREIGN KEY(eciv_Id)					    REFERENCES GRAL.tbEstadosCiviles(eciv_Id),			
CONSTRAINT FK_CALE_tbEmpleados_GRAL_tbMunicipios_muni_Id					FOREIGN KEY(muni_Id)						REFERENCES GRAL.tbMunicipios(muni_Id),
CONSTRAINT FK_CALE_tbEmpleados_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(empe_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbEmpleados_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(empe_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id)
);
GO

--********** TABLE EMPRESASA ************--
CREATE TABLE CALE.tbEmpresas(
emsa_Id							INT IDENTITY(1,1),
emsa_Nombre						NVARCHAR(200),
emsa_RNT						NVARCHAR(20),
muni_Id							INT,
emsa_Direccion					NVARCHAR(250),
emsa_RepresentanteNombre		NVARCHAR(200),
emsa_RepresentanteDNI			NVARCHAR(20),
emsa_RepresentanteTelefono		NVARCHAR(20),
emsa_RepresentanteSexo			CHAR(1),
eciv_Id							INT,
emsa_EsDemandante				BIT				NOT NULL CONSTRAINT DF_CALE_tbEmpresas_emsa_EsDemandante DEFAULT(0),
emsa_EsAcusado					BIT				NOT NULL CONSTRAINT DF_CALE_tbEmpresas_emsa_EsAcusado DEFAULT(0),

emsa_UsuCreacion				INT				NOT NULL,
emsa_FechaCreacion				DATETIME		NOT NULL CONSTRAINT DF_CALE_tbEmpleados_emsa_FechaCreacion DEFAULT(GETDATE()),
emsa_UsuModificacion			INT,
emsa_FechaModificacion			DATETIME,
emsa_Estado						BIT				NOT NULL CONSTRAINT DF_CALE_tbEmpleados_emsa_Estado DEFAULT(1)

CONSTRAINT PK_CALE_tbEmpresas_emsa_Id										PRIMARY KEY(emsa_Id),
CONSTRAINT CK_CALE_tbEmpresas_emsa_Sexo										CHECK	   (emsa_RepresentanteSexo IN ('F', 'M')),
CONSTRAINT FK_CALE_tbEmpresas_GRAL_tbEstadosCiviles_eciv_Id        			FOREIGN KEY(eciv_Id)					    REFERENCES GRAL.tbEstadosCiviles(eciv_Id),			
CONSTRAINT FK_CALE_tbEmpresas_GRAL_tbMunicipios_muni_Id						FOREIGN KEY(muni_Id)						REFERENCES GRAL.tbMunicipios(muni_Id),
CONSTRAINT FK_CALE_tbEmpresas_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(emsa_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbEmpresas_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(emsa_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id)
);
GO


--********** TABLE TiposdeCaso ************--
CREATE TABLE CALE.tbTiposdeCaso(
tica_Id INT IDENTITY(1,1),
tica_Nombre NVARCHAR(100),
tica_Descripcion NVARCHAR(200),
tica_UsuCreacion			INT				NOT NULL,
tica_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbTiposdeCaso_tica_FechaCreacion DEFAULT(GETDATE()),
tica_UsuModificacion		INT,
tica_FechaModificacion		DATETIME,
tica_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbTiposdeCaso_tica_Estado DEFAULT(1),

CONSTRAINT PK_CALE_tbTiposdeCaso_tica_Id	PRIMARY KEY(tica_Id),
CONSTRAINT FK_CALE_tbTiposdeCaso_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(tica_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbTiposdeCaso_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(tica_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO


--********** TABLE TIPOSDEEVIDENCIA ************--
CREATE TABLE CALE.tbTiposdeEvidencia(
tiev_Id INT IDENTITY(1,1),
tiev_Nombre NVARCHAR(100),
tiev_Descripcion NVARCHAR(200),

tiev_UsuCreacion			INT				NOT NULL,
tiev_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbTiposdeEvidencia_tiev_FechaCreacion DEFAULT(GETDATE()),
tiev_UsuModificacion		INT,
tiev_FechaModificacion		DATETIME,
tiev_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbTiposdeEvidencia_tiev_Estado DEFAULT(1),

CONSTRAINT PK_CALE_tbTiposdeEvidencia_tiev_Id	PRIMARY KEY(tiev_Id),
CONSTRAINT FK_CALE_tbTiposdeEvidencia_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(tiev_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbTiposdeEvidencia_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(tiev_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO


--********** TABLE CASOS ************--
CREATE TABLE CALE.tbCasos(
caso_Id						INT IDENTITY(1,1),
caso_descripcion			NVARCHAR(200),
tica_Id						INT,
caso_Juez					INT,
caso_TipoDemandante			CHAR(1),
caso_Demandante				INT,
caso_AbogadoDemandante		INT,
caso_AbogadoDemandado		INT,
caso_Abierto				BIT				NOT NULL CONSTRAINT DF_CALE_tbCasos_caso_Abierto DEFAULT(0),

caso_UsuCreacion			INT				NOT NULL,
caso_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbCasos_caso_FechaCreacion DEFAULT(GETDATE()),
caso_UsuModificacion		INT,
caso_FechaModificacion		DATETIME,
caso_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbCasos_caso_Estado DEFAULT(1),

CONSTRAINT PK_CALE_tbCasos_caso_Id	PRIMARY KEY(caso_Id),
CONSTRAINT FK_CALE_tbCasos_caso_TipoDemandante CHECK(caso_TipoDemandante IN ('C','E')),
CONSTRAINT FK_CALE_tbCasos_CALE_tbTiposdeCaso_tica_Id					FOREIGN KEY(tica_Id)				REFERENCES CALE.tbTiposdeCaso(tica_Id),
CONSTRAINT FK_CALE_tbCasos_CALE_tbAbogadosJueces_caso_Juez				FOREIGN KEY(caso_Juez)				REFERENCES CALE.tbAbogadosJueces(abju_Id),	
CONSTRAINT FK_CALE_tbCasos_CALE_tbAbogadosJueces_caso_AbogadoDemandante	FOREIGN KEY(caso_AbogadoDemandante)	REFERENCES CALE.tbAbogadosJueces(abju_Id),			
CONSTRAINT FK_CALE_tbCasos_CALE_tbAbogadosJueces_caso_AbogadoDemandado	FOREIGN KEY(caso_AbogadoDemandado)	REFERENCES CALE.tbAbogadosJueces(abju_Id),			

CONSTRAINT FK_CALE_tbCasos_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(caso_UsuCreacion)		REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbCasos_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(caso_UsuModificacion)	REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO


--********** TABLE ACUSADOSPORCASO ************--
CREATE TABLE CALE.tbAcusadoPorCaso(
acus_Id						INT IDENTITY(1,1),
caso_Id						INT,
acus_TipoAcusado			INT,
acus_Acusado				INT, 

acus_UsuCreacion			INT				NOT NULL,
acus_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbSospechososPorCaso_soca_FechaCreacion DEFAULT(GETDATE()),
acus_UsuModificacion		INT,
acus_FechaModificacion		DATETIME,
acus_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbSospechososPorCaso_soca_Estado DEFAULT(1),

CONSTRAINT PK_CALE_tbAcusadoPorCaso_soca_Id	PRIMARY KEY(acus_Id),
CONSTRAINT FK_CALE_tbAcusadoPorCaso_CALE_tbCasos_caso_Id						FOREIGN KEY(caso_Id)						REFERENCES CALE.tbCasos(caso_Id),
CONSTRAINT CK_CALE_tbAcusadoPorCaso_CALE_acus_TipoAcusado						CHECK(acus_Acusado IN('E', 'C')),
CONSTRAINT FK_CALE_tbAcusadoPorCaso_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(acus_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbAcusadoPorCaso_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(acus_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO


--********** TABLE EVIDENCIASPORCASO ************--
CREATE TABLE CALE.tbEvidenciasPorCaso(
evca_Id INT IDENTITY(1,1),
tiev_Id INT,
caso_Id INT,
evca_Descripcion NVARCHAR(300),

evca_UsuCreacion			INT				NOT NULL,
evca_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbEvidenciasPorCaso_evca_FechaCreacion DEFAULT(GETDATE()),
evca_UsuModificacion		INT,
evca_FechaModificacion		DATETIME,
evca_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbEvidenciasPorCaso_evca_Estado DEFAULT(1),

CONSTRAINT PK_CALE_tbEvidenciasPorCaso_evca_Id	PRIMARY KEY(evca_Id),
CONSTRAINT FK_CALE_tbEvidenciasPorCaso_CALE_tbTiposdeEvidencia_tiev_Id				FOREIGN KEY(tiev_Id)						REFERENCES CALE.tbTiposdeEvidencia(tiev_Id),
CONSTRAINT FK_CALE_tbEvidenciasPorCaso_CALE_tbCasos_caso_Id							FOREIGN KEY(caso_Id)						REFERENCES CALE.tbCasos(caso_Id),
CONSTRAINT FK_CALE_tbEvidenciasPorCaso_ACCE_tbUsuarios_UserCreate					FOREIGN KEY(evca_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbEvidenciasPorCaso_ACCE_tbUsuarios_UserUpdate					FOREIGN KEY(evca_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO

--********** TABLE TESTIGOSPORCASO ************--
CREATE TABLE CALE.tbTestigosPorCaso(
teca_Id INT IDENTITY(1,1),
caso_Id INT,
teca_Testigo INT,

teca_UsuCreacion			INT				NOT NULL,
teca_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbTestigosPorCaso_teca_FechaCreacion DEFAULT(GETDATE()),
teca_UsuModificacion		INT,
teca_FechaModificacion		DATETIME,
teca_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbTestigosPorCaso_teca_Estado DEFAULT(1),


CONSTRAINT PK_CALE_tbTestigosPorCaso_teca_Id	PRIMARY KEY(teca_Id),
CONSTRAINT FK_CALE_tbTestigosPorCaso_CALE_tbCasos_caso_Id					FOREIGN KEY(caso_Id)						REFERENCES CALE.tbCasos(caso_Id),
CONSTRAINT FK_CALE_tbTestigosPorCaso_CALE_tbCiviles_civi_Id					FOREIGN KEY(teca_Testigo)					REFERENCES CALE.tbCiviles(civi_Id),
CONSTRAINT FK_CALE_tbTestigosPorCaso_ACCE_tbUsuarios_UserCreate				FOREIGN KEY(teca_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbTestigosPorCaso_ACCE_tbUsuarios_UserUpdate				FOREIGN KEY(teca_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO

--********** TABLE VEREDICTO ************--
CREATE TABLE CALE.tbVeredictos (
vere_Id INT IDENTITY(1,1),
caso_Id INT,
vere_Descripcion NVARCHAR(300),
vere_UsuCreacion			INT				NOT NULL,
vere_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbVeredictos_vere_FechaCreacion DEFAULT(GETDATE()),
vere_UsuModificacion		INT,
vere_FechaModificacion		DATETIME,
vere_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbVeredictos_vere_Estado DEFAULT(1),

CONSTRAINT PK_CALE_tbVeredictos_teca_Id	PRIMARY KEY(vere_Id),
CONSTRAINT FK_CALE_tbVeredictos_CALE_tbCasos_caso_Id					FOREIGN KEY(caso_Id)						REFERENCES CALE.tbCasos(caso_Id),
CONSTRAINT FK_CALE_tbVeredictos_ACCE_tbUsuarios_UserCreate				FOREIGN KEY(vere_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbVeredictos_ACCE_tbUsuarios_UserUpdate				FOREIGN KEY(vere_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO

--********** TABLE DTALLESVEREDICTO ************--
CREATE TABLE CALE.tbDetallesVeredictos (
deve_Id						INT IDENTITY(1,1),
vere_Id						INT,
deve_EsInocente				BIT,
deve_ESCulpable				BIT,
deve_TipoEmpresaCivil		CHAR(1),
deve_EmpresaCivil			INT,
deve_UsuCreacion			INT				NOT NULL,
deve_FechaCreacion			DATETIME		NOT NULL CONSTRAINT DF_CALE_tbDetallesVeredictos_deve_FechaCreacion DEFAULT(GETDATE()),
deve_UsuModificacion		INT,
deve_FechaModificacion		DATETIME,
deve_Estado					BIT				NOT NULL CONSTRAINT DF_CALE_tbDetallesVeredictos_deve_Estado DEFAULT(1),


CONSTRAINT PK_CALE_tbDetallesVeredictos_deve_Id	PRIMARY KEY(deve_Id),
CONSTRAINT CK_CALE_tbDetallesVeredictos_CALE_acus_deve_TipoEmpresaCivil			CHECK(deve_TipoEmpresaCivil IN('E', 'C')),
CONSTRAINT FK_CALE_tbDetallesVeredictos_CALE_TBvEREDICTOS_vere_Id				FOREIGN KEY(vere_Id)						REFERENCES CALE.tbVeredictos(vere_Id),
CONSTRAINT FK_CALE_tbDetallesVeredictos_ACCE_tbUsuarios_UserCreate				FOREIGN KEY(deve_UsuCreacion)				REFERENCES ACCE.tbUsuarios(usua_Id),
CONSTRAINT FK_CALE_tbDetallesVeredictos_ACCE_tbUsuarios_UserUpdate				FOREIGN KEY(deve_UsuModificacion)			REFERENCES ACCE.tbUsuarios(usua_Id),
);
GO

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
INSERT INTO gral.tbDepartamentos(depa_Codigo, depa_Nombre, depa_Estado, depa_UsuCreacion, depa_FechaCreacion, depa_UsuModificacion, depa_FechaModificacion)
VALUES	('01','Atlántida', '1', 1, GETDATE(), NULL, NULL),
		('02','Colón', '1', 1, GETDATE(), NULL, NULL),
		('03','Comayagua', '1', 1, GETDATE(), NULL,NULL),
		('04','Copán', '1', 1, GETDATE(), NULL, NULL),
		('05','Cortés', '1', 1, GETDATE(), NULL, NULL),
		('06','Choluteca', '1', 1, GETDATE(), NULL, NULL),
		('07','El Paraíso', '1', 1, GETDATE(), NULL, NULL),
		('08','Francisco Morazán', '1', 1, GETDATE(), NULL, NULL),
		('09','Gracias a Dios', '1', 1, GETDATE(), NULL, NULL),
		('10','Intibucá', '1', 1, GETDATE(), NULL, NULL),
		('11','Islas de la Bahía', '1', 1, GETDATE(), NULL, NULL),
		('12','La Paz', '1', 1, GETDATE(), NULL, NULL),
		('13','Lempira', '1', 1, GETDATE(), NULL,NULL ),
		('14','Ocotepeque', '1', 1, GETDATE(), NULL, NULL),
		('15','Olancho', '1', 1, GETDATE(), NULL, NULL),
		('16','Santa Bárbara', '1', 1, GETDATE(), NULL, NULL),
		('17','Valle', '1', 1, GETDATE(), NULL, NULL),
		('18','Yoro', '1', 1, GETDATE(), NULL, NULL);
GO



--******************************************************/TABLE Departamentos*******************************************************--

--********************************************************TABLE Municipios*********************************************************--

INSERT INTO gral.tbMunicipios(depa_Id, muni_Codigo, muni_Nombre, muni_Estado, muni_UsuCreacion, muni_FechaCreacion, muni_UsuModificacion, muni_FechaModificacion)
VALUES	('1','0101','La Ceiba', '1', 1, GETDATE(), NULL, GETDATE()),
		('1','0102','El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
		('1','0103','Tela', '1', 1, GETDATE(), NULL, GETDATE()),
		('1','0104','Jutiapa', '1', 1, GETDATE(), NULL, GETDATE()),
		('1','0105','La Masica', '1', 1, GETDATE(), NULL, GETDATE()),
		('1','0106','San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
		('1','0107','Arizona', '1', 1, GETDATE(), NULL, GETDATE()),
		('1','0108','Esparta', '1', 1, GETDATE(), NULL, GETDATE()),
	

		('2','0201','Trujillo', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0202','Balfate', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0203','Iriona', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0204','Lim�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0205','Sab�', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0206','Santa Fe', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0207','Santa Rosa de Agu�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0208','Sonaguera', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0209','Tocoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('2','0210','Bonito Oriental', '1', 1, GETDATE(), NULL, GETDATE()),


		('3','0301','Comayagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0302','Ajuterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0303','El Rosario', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0304','Esqu�as', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0305','Humuya', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0306','La Libertad', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0307','Laman�', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0308','La Trinidad', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0309','Lejaman�', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0310','Me�mbar', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0311','Minas de Oro', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0312','Ojos de Agua', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0313','San Jer�nimo', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0314','San Jos� de Comayagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0315','San Jos� del Potrero', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0316','San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0317','San Sebasti�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0318','Siguatepeque', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0319','Villa de San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0320','Las Lajas', '1', 1, GETDATE(), NULL, GETDATE()),
		('3','0321','Taulab�', '1', 1, GETDATE(), NULL, GETDATE()),


		('4','0401','Santa Rosa de Cop�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0402','Caba�as', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0403','Concepci�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0404','Cop�n Ruinas', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0405','Corqu�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0406','Cucuyagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0407','Dolores', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0408','Dulce Nombre', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0409','El Para�so', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0410','Florida', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0411','La Jigua', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0412','La Uni�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0413','Nueva Arcadia', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0414','San Agust�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0415','San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0416','San Jer�nimo', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0417','San Jos�', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0418','San Juan de Opoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0419','San Nicol�s', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0420','San Pedro', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0421','Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0422','Trinidad de Cop�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('4','0423','Veracruz', '1', 1, GETDATE(), NULL, GETDATE()),


		('5','0501','San Pedro Sula', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0502','Choloma', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0503','Omoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0504','Pimienta', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0505','Potrerillos', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0506','Puerto Cort�s', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0507','San Antonio de Cort�s', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0508','San Francisco de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0509','San Manuel', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0510','Santa Cruz de Yojoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0511','Villanueva', '1', 1, GETDATE(), NULL, GETDATE()),
		('5','0512','La Lima', '1', 1, GETDATE(), NULL, GETDATE()),


		('6','0601','Choluteca', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0602','Apacilagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0603','Concepci�n de Mar�a', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0604','Duyure', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0605','El Corpus', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0606','El Triunfo', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0607','Marcovia', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0608','Morolica', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0609','Namasig�e', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0610','Orocuina', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0611','Pespire', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0612','San Antonio de Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0613','San Isidro', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0614','San Jos�', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0615','San Marcos de Col�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('6','0616','Santa Ana de Yusguare', '1', 1, GETDATE(), NULL, GETDATE()),


		('7', '0701', 'Yuscar�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0702', 'Alauca', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0703', 'Danl�', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0704', 'El Para�so', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0705', 'G�inope', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0706', 'Jacaleapa', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0707', 'Liure', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0708', 'Morocel�', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0709', 'Oropol�', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0710', 'Potrerillos', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0711', 'San Antonio de Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0712', 'San Lucas', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0713', 'San Mat�as', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0714', 'Soledad', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0715', 'Teupasenti', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0716', 'Texiguat', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0717', 'Vado Ancho', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0718', 'Yauyupe', '1', 1, GETDATE(), NULL, GETDATE()),
		('7', '0719', 'Trojes', '1', 1, GETDATE(), NULL, GETDATE()),


		('8', '0801', 'Distrito Central', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0802', 'Alubar�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0803', 'Cedros', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0804', 'Curar�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0805', 'El Porvenir', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0806', 'Guaimaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0807', 'La Libertad', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0808', 'La Venta', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0809', 'Lepaterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0810', 'Maraita', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0811', 'Marale', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0812', 'Nueva Armenia', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0813', 'Ojojona', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0814', 'Orica', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0815', 'Reitoca', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0816', 'Sabanagrande', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0817', 'San Antonio de Oriente', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0818', 'San Buenaventura', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0819', 'San Ignacio', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0820', 'San Juan de Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0821', 'San Miguelito', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0822', 'Santa Ana', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0823', 'Santa Luc�a', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0824', 'Talanga', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0825', 'Tatumbla', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0826', 'Valle de �ngeles', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0827', 'Villa de San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
		('8', '0828', 'Vallecillo', '1', 1, GETDATE(), NULL, GETDATE()),
		
		('9', '0901', 'Puerto Lempira', '1', 1, GETDATE(), NULL, GETDATE()),
		('9', '0902', 'Brus Laguna', '1', 1, GETDATE(), NULL, GETDATE()),
		('9', '0903', 'Ahuas', '1', 1, GETDATE(), NULL, GETDATE()),
		('9', '0904', 'Juan Francisco Bulnes', '1', 1, GETDATE(), NULL, GETDATE()),
		('9', '0905', 'Ram�n Villeda Morales', '1', 1, GETDATE(), NULL, GETDATE()),
		('9', '0906', 'Wampusirpe', '1', 1, GETDATE(), NULL, GETDATE()),
		
		('10', '1001', 'La Esperanza', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1002', 'Camasca', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1003', 'Colomoncagua', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1004', 'Concepci�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1005', 'Dolores', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1006', 'Intibuc�', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1007', 'Jes�s de Otoro', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1008', 'Magdalena', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1009', 'Masaguara', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1010', 'San Antonio', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1011', 'San Isidro', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1012', 'San Juan', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1013', 'San Marcos de la Sierra', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1014', 'San Miguel Guancapla', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1015', 'Santa Luc�a', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1016', 'Yamaranguila', '1', 1, GETDATE(), NULL, GETDATE()),
		('10', '1017', 'San Francisco de Opalaca', '1', 1, GETDATE(), NULL, GETDATE()),


		('11', '1101', 'Roat�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('11', '1102', 'Guanaja', '1', 1, GETDATE(), NULL, GETDATE()),
		('11', '1103', 'Jos� Santos Guardiola', '1', 1, GETDATE(), NULL, GETDATE()),
		('11', '1104', 'Utila', '1', 1, GETDATE(), NULL, GETDATE()),


		('12', '1201', 'La Paz', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1202', 'Aguanqueterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1203', 'Caba�as', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1204', 'Cane', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1205', 'Chinacla', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1206', 'Guajiquiro', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1207', 'Lauterique', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1208', 'Marcala', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1209', 'Mercedes de Oriente', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1210', 'Opatoro', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1211', 'San Antonio del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1212', 'San Jos�', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1213', 'San Juan', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1214', 'San Pedro de Tutule', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1215', 'Santa Ana', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1216', 'Santa Elena', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1217', 'Santa Mar�a', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1218', 'Santiago de Puringla', '1', 1, GETDATE(), NULL, GETDATE()),
		('12', '1219', 'Yarula', '1', 1, GETDATE(), NULL, GETDATE()),


		('13', '1301', 'Gracias', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1302', 'Bel�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1303', 'Candelaria', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1304', 'Cololaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1305', 'Erandique', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1306', 'Gualcince', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1307', 'Guarita', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1308', 'La Campa', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1309', 'La Iguala', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1310', 'Las Flores', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1311', 'La Uni�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1312', 'La Virtud', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1313', 'Lepaera', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1314', 'Mapulaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1315', 'Piraera', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1316', 'San Andr�s', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1317', 'San Francisco', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1318', 'San Juan Guarita', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1319', 'San Manuel Colohete', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1320', 'San Rafael', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1321', 'San Sebasti�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1322', 'Santa Cruz', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1323', 'Talgua', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1324', 'Tambla', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1325', 'Tomal�', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1326', 'Valladolid', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1327', 'Virginia', '1', 1, GETDATE(), NULL, GETDATE()),
		('13', '1328', 'San Marcos de Caiqu�n', '1', 1, GETDATE(), NULL, GETDATE()),


		('14', '1401', 'Ocotepeque', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1402', 'Bel�n Gualcho', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1403', 'Concepci�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1404', 'Dolores Merend�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1405', 'Fraternidad', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1406', 'La Encarnaci�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1407', 'La Labor', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1408', 'Lucerna', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1409', 'Mercedes', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1410', 'San Fernando', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1411', 'San Francisco del Valle', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1412', 'San Jorge', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1413', 'San Marcos', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1414', 'Santa Fe', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1415', 'Sensenti', '1', 1, GETDATE(), NULL, GETDATE()),
		('14', '1416', 'Sinuapa', '1', 1, GETDATE(), NULL, GETDATE()),


		('15', '1501', 'Juticalpa', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1502', 'Campamento', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1503', 'Catacamas', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1504', 'Concordia', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1505', 'Dulce Nombre de Culm�', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1506', 'El Rosario', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1507', 'Esquipulas del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1508', 'Gualaco', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1509', 'Guarizama', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1510', 'Guata', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1511', 'Guayape', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1512', 'Jano', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1513', 'La Uni�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1514', 'Mangulile', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1515', 'Manto', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1516', 'Salam�', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1517', 'San Esteban', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1518', 'San Francisco de Becerra', '1',1, GETDATE(), NULL, GETDATE()),
		('15', '1519', 'San Francisco de la Paz', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1520', 'Santa Mar�a del Real', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1521', 'Silca', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1522', 'Yoc�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('15', '1523', 'Patuca', '1', 1, GETDATE(), NULL, GETDATE()),


		('16', '1601' , 'Santa B�rbara', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1602' , 'Arada', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1603' , 'Atima', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1604' , 'Azacualpa', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1605' , 'Ceguaca', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1606' , 'Concepci�n del Norte', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1607' , 'Concepci�n del Sur', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1608' , 'Chinda', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1609' , 'El N�spero', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1610' , 'Gualala', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1611' , 'Ilama', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1612' , 'Las Vegas', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1613' , 'Macuelizo', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1614' , 'Naranjito', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1615' , 'Nuevo Celilac', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1616' , 'Nueva Frontera', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1617' , 'Petoa', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1618' , 'Protecci�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1619' , 'Quimist�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1620' , 'San Francisco de Ojuera', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1621' , 'San Jos� de las Colinas', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1622' , 'San Luis', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1623' , 'San Marcos', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1624' , 'San Nicol�s', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1625' , 'San Pedro Zacapa', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1626' , 'San Vicente Centenario', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1627' , 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
		('16', '1628' , 'Trinidad', '1', 1, GETDATE(), NULL, GETDATE()),


		('17', '1701', 'Nacaome', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1702', 'Alianza', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1703', 'Amapala', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1704', 'Aramecina', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1705', 'Caridad', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1706', 'Goascor�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1707', 'Langue', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1708', 'San Francisco de Coray', '1', 1, GETDATE(), NULL, GETDATE()),
		('17', '1709', 'San Lorenzo', '1', 1, GETDATE(), NULL, GETDATE()),


		('18', '1801', 'Yoro', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1802', 'Arenal', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1803', 'El Negrito', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1804', 'El Progreso', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1805', 'Joc�n', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1806', 'Morazán', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1807', 'Olanchito', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1808', 'Santa Rita', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1809', 'Sulaco', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1810', 'Victoria', '1', 1, GETDATE(), NULL, GETDATE()),
		('18', '1811', 'Yorito', '1', 1, GETDATE(), NULL, GETDATE());
GO

--********************************************************/TABLE Municipios********************************************************--

--*******************************************************TABLE EstadosCiviles******************************************************--

INSERT INTO GRAL.tbEstadosCiviles (eciv_Descripcion, eciv_UsuCreacion)
VALUES ('Soltero(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (eciv_Descripcion, eciv_UsuCreacion)
VALUES ('Casado(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (eciv_Descripcion, eciv_UsuCreacion)
VALUES ('Viudo(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (eciv_Descripcion, eciv_UsuCreacion)
VALUES ('Divorciado(a)', 1);
GO

INSERT INTO GRAL.tbEstadosCiviles (eciv_Descripcion, eciv_UsuCreacion)
VALUES ('Union Libre', 1);
GO

--*****************************************************/TABLE Estados Civiles*****************************************************--

--**********************************************************TABLE Cargos**********************************************************--

INSERT INTO GRAL.tbCargos (carg_Descripcion, carg_UsuCreacion)
VALUES ('Gerente', 1),
		('Supervisor', 1),
		('Analista', 1),
		('Ejecutivo de Ventas', 1),
		('Analista Financiero', 1),
		('Coordinador de Proyectos', 1);
GO	

--*********************************************************/TABLE Cargos**********************************************************--

--**********************************************************/TABLES GRAL***********************************************************--

--***********************************************************TABLES CALE***********************************************************--

INSERT INTO CALE.tbAbogadosJueces (abju_DNI, abju_Nombres, abju_Apellidos, abju_Sexo, abju_Telefono, abju_CorreoElectronico, abju_FechaNacimiento, eciv_Id, carg_Id, muni_Id, abju_Direccion, abju_UsuCreacion)
VALUES ('123456789', 'Juan',	'Pérez',	'M', '123456789', 'juan.perez@gmail.com',		'1990-01-01', 1, 1, 1, 'Calle Principal 123',	1),
		('987654321', 'María',	'López',	'F', '987654321', 'maria.lopez@gmail.com',		'1995-05-10', 2, 2, 2, 'Avenida Secundaria 456',1),
		('555555555', 'Pedro',	'González', 'M', '555555555', 'pedro.gonzalez@gmail.com',	'1985-12-15', 3, 1, 3, 'Plaza Central 789',		1),
		('111111111', 'Ana',	'García',	'F', '111111111', 'ana.garcia@gmail.com',		'1988-06-20', 2, 2, 1, 'Calle Secundaria 234',	1),
		('222222222', 'Luis',	'Martínez', 'M', '222222222', 'luis.martinez@gmail.com',	'1992-09-08', 1, 3, 2, 'Avenida Principal 567', 1),
		('333333333', 'Laura', 'Rodríguez', 'F', '333333333', 'laura.rodriguez@gmail.com',	'1997-03-12', 3, 1, 3, 'Plaza Secundaria 890',	1);
GO

INSERT INTO CALE.tbCiviles (civi_DNI, civi_Nombres, civi_Apellidos, civi_Sexo, civi_Telefono, civi_CorreoElectronico, civi_FechaNacimiento, eciv_Id, muni_Id, civi_Direccion, civi_EsDemandante, civi_EsAcusado, civi_EsTestigo, civi_UsuCreacion)
VALUES ('123456789', 'Juan',	'Pérez',		'M', '123456789', 'juan.perez@example.com',		'1990-01-01', 1, 1, 'Calle Principal 123',		1, 0, 0, 1),
		('987654321', 'María',	'López',		'F', '987654321', 'maria.lopez@example.com',	'1995-05-10', 2, 2, 'Avenida Secundaria 456',	0, 1, 0, 1),
		('555555555', 'Pedro',	'González',		'M', '555555555', 'pedro.gonzalez@example.com', '1985-12-15', 3, 1, 'Plaza Central 789',		1, 0, 0, 1),
		('111111111', 'Ana',	'García',		'F', '111111111', 'ana.garcia@example.com',		'1988-06-20', 2, 2, 'Calle Secundaria 234',		1, 0, 1, 1),
		('222222222', 'Luis',	'Martínez',		'M', '222222222', 'luis.martinez@example.com',	'1992-09-08', 1, 3, 'Avenida Principal 567',	0, 1, 0, 1),
		('333333333', 'Laura',	'Rodríguez',	'F', '333333333', 'laura.rodriguez@example.com','1997-03-12', 3, 1, 'Plaza Secundaria 890',		0, 0, 1, 1);
GO


INSERT INTO CALE.tbEmpleados (empe_DNI, empe_Nombres, empe_Apellidos, empe_Sexo, empe_Telefono, empe_CorreoElectronico, empe_FechaNacimiento, eciv_Id, muni_Id, empe_Direccion, empe_UsuCreacion)
VALUES ('111111111', 'Juan',	'Pérez',	'M', '111111111', 'juan.perez@example.com',			'1990-01-01', 1, 1, 'Calle Principal 123',		1),
		('222222222', 'María',	'López',	'F', '222222222', 'maria.lopez@example.com',		'1995-05-10', 2, 2, 'Avenida Secundaria 456',	1),
		('333333333', 'Pedro',	'González', 'M', '333333333', 'pedro.gonzalez@example.com',		'1985-12-15', 3, 1, 'Plaza Central 789',		1),
		('444444444', 'Ana',	'García',	'F', '444444444', 'ana.garcia@example.com',			'1992-06-20', 2, 2, 'Calle Secundaria 234',		1),
		('555555555', 'Luis',	'Martínez', 'M', '555555555', 'luis.martinez@example.com',		'1997-09-08', 1, 3, 'Avenida Principal 567',	1),
		('666666666', 'Laura',	'Rodríguez','F', '666666666', 'laura.rodriguez@example.com',	'1994-03-12', 3, 1, 'Plaza Secundaria 890',		1),
		('777777777', 'Carlos', 'Gómez',	'M', '777777777', 'carlos.gomez@example.com',		'1989-11-25', 2, 2, 'Calle Principal 789',		1),
		('888888888', 'María',	'Torres',	'F', '888888888', 'maria.torres@example.com',		'1993-07-18', 3, 1, 'Avenida Secundaria 456',	1),
		('999999999', 'Manuel', 'Sánchez',	'M', '999999999', 'manuel.sanchez@example.com',		'1991-04-30', 1, 3, 'Plaza Central 789',		1),
		('101010101', 'Susana', 'López',	'F', '101010101', 'susana.lopez@example.com',		'1996-08-05', 2, 2, 'Calle Secundaria 234',		1);
GO


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


--*********************************************************/ALTERS TABLES**********************************************************--


INSERT INTO CALE.tbAbogadosJueces (abju_DNI, abju_Nombres, abju_Apellidos, abju_Sexo, abju_Telefono, abju_CorreoElectronico, abju_FechaNacimiento, eciv_Id, carg_Id, muni_Id, abju_Direccion, abju_UsuCreacion)
VALUES ('123456789', 'Juan', 'P�rez', 'M', '123456789', 'juan.perez@gmail.com', '1990-01-01', 1, 1, 1, 'Calle Principal 123', 1),
		('987654321', 'Mar�a', 'L�pez', 'F', '987654321', 'maria.lopez@gmail.com', '1995-05-10', 2, 2, 2, 'Avenida Secundaria 456', 1),
		('555555555', 'Pedro', 'Gonz�lez', 'M', '555555555', 'pedro.gonzalez@gmail.com', '1985-12-15', 3, 1, 3, 'Plaza Central 789', 1),
		('111111111', 'Ana', 'Garc�a', 'F', '111111111', 'ana.garcia@gmail.com', '1988-06-20', 2, 2, 1, 'Calle Secundaria 234', 1),
		('222222222', 'Luis', 'Mart�nez', 'M', '222222222', 'luis.martinez@gmail.com', '1992-09-08', 1, 3, 2, 'Avenida Principal 567', 1),
		('333333333', 'Laura', 'Rodr�guez', 'F', '333333333', 'laura.rodriguez@gmail.com', '1997-03-12', 3, 1, 3, 'Plaza Secundaria 890', 1);


INSERT INTO GRAL.tbCargos (carg_Descripcion, carg_UsuCreacion)
VALUES ('Gerente', 1),
		('Supervisor', 1),
		('Analista', 1),
		('Ejecutivo de Ventas', 1),
		('Analista Financiero', 1),
		('Coordinador de Proyectos', 1);


INSERT INTO CALE.tbCiviles (civi_DNI, civi_Nombres, civi_Apellidos, civi_Sexo, civi_Telefono, civi_CorreoElectronico, civi_FechaNacimiento, eciv_Id, muni_Id, civi_Direccion, civi_EsDemandante, civi_EsAcusado, civi_EsTestigo, civi_UsuCreacion)
VALUES ('123456789', 'Juan', 'P�rez', 'M', '123456789', 'juan.perez@example.com', '1990-01-01', 1, 1, 'Calle Principal 123', 1, 0, 0, 1),
		('987654321', 'Mar�a', 'L�pez', 'F', '987654321', 'maria.lopez@example.com', '1995-05-10', 2, 2, 'Avenida Secundaria 456', 0, 1, 0, 1),
		('555555555', 'Pedro', 'Gonz�lez', 'M', '555555555', 'pedro.gonzalez@example.com', '1985-12-15', 3, 1, 'Plaza Central 789', 1, 0, 0, 1),
		('111111111', 'Ana', 'Garc�a', 'F', '111111111', 'ana.garcia@example.com', '1988-06-20', 2, 2, 'Calle Secundaria 234', 1, 0, 1, 1),
		('222222222', 'Luis', 'Mart�nez', 'M', '222222222', 'luis.martinez@example.com', '1992-09-08', 1, 3, 'Avenida Principal 567', 0, 1, 0, 1),
		('333333333', 'Laura', 'Rodr�guez', 'F', '333333333', 'laura.rodriguez@example.com', '1997-03-12', 3, 1, 'Plaza Secundaria 890', 0, 0, 1, 1);

-- Insert 1
INSERT INTO CALE.tbEmpleados (empe_DNI, empe_Nombres, empe_Apellidos, empe_Sexo, empe_Telefono, empe_CorreoElectronico, empe_FechaNacimiento, eciv_Id, muni_Id, empe_Direccion, empe_UsuCreacion)
VALUES ('111111111', 'Juan', 'P�rez', 'M', '111111111', 'juan.perez@example.com', '1990-01-01', 1, 1, 'Calle Principal 123', 1),
		('222222222', 'Mar�a', 'L�pez', 'F', '222222222', 'maria.lopez@example.com', '1995-05-10', 2, 2, 'Avenida Secundaria 456', 1),
		('333333333', 'Pedro', 'Gonz�lez', 'M', '333333333', 'pedro.gonzalez@example.com', '1985-12-15', 3, 1, 'Plaza Central 789', 1),
		('444444444', 'Ana', 'Garc�a', 'F', '444444444', 'ana.garcia@example.com', '1992-06-20', 2, 2, 'Calle Secundaria 234', 1),
		('555555555', 'Luis', 'Mart�nez', 'M', '555555555', 'luis.martinez@example.com', '1997-09-08', 1, 3, 'Avenida Principal 567', 1),
		('666666666', 'Laura', 'Rodr�guez', 'F', '666666666', 'laura.rodriguez@example.com', '1994-03-12', 3, 1, 'Plaza Secundaria 890', 1),
		('777777777', 'Carlos', 'G�mez', 'M', '777777777', 'carlos.gomez@example.com', '1989-11-25', 2, 2, 'Calle Principal 789', 1),
		('888888888', 'Mar�a', 'Torres', 'F', '888888888', 'maria.torres@example.com', '1993-07-18', 3, 1, 'Avenida Secundaria 456', 1),
		('999999999', 'Manuel', 'S�nchez', 'M', '999999999', 'manuel.sanchez@example.com', '1991-04-30', 1, 3, 'Plaza Central 789', 1),
		('101010101', 'Susana', 'L�pez', 'F', '101010101', 'susana.lopez@example.com', '1996-08-05', 2, 2, 'Calle Secundaria 234', 1);


