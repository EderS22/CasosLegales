import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { ListadoComponent as ListadoUsuarios} from './acceso/usuarios/listado/listado.component';
import { ListadoComponent as ListadoTiposdeCaso} from './casoslegales/tiposdecaso/listado/listado.component';
import { ListadoComponent as ListadoTiposdeEvidencia} from './casoslegales/tipodeevidencia/listado/listado.component';
import { ListadoComponent as ListadoDepartamento} from './general/departamento/listado/listado.component';
import { ListadoComponent as ListadoCargo} from './general/cargo/listado/listado.component';
import { ListadoComponent as ListadoEstadoCivil } from './general/estadocivil/listado/listado.component';
import { ListadoComponent as ListadoMunicipio } from './general/municipio/listado/listado.component';
import { DetallesComponent as DetallesUsaurios } from './acceso/usuarios/detalles/detalles.component';
import { ListadoComponent as ListadoRoles } from './acceso/roles/listado/listado.component';
import { DetallesComponent as DetallesRoles } from './acceso/roles/detalles/detalles.component';
import { ListadoComponent  as ListadoEmpleado} from './casoslegales/empleado/listado/listado.component';
import { CrearComponent as CrearEmpleados } from './casoslegales/empleado/crear/crear.component';
import { AgregareditarComponent as AgregarEditarRol } from './acceso/roles/agregareditar/agregareditar.component';
import { ListadoComponent as ListadoCasos } from './casoslegales/casos/listado/listado.component';
import { AgregareditarComponent as AgregarEditarCasos } from './casoslegales/casos/agregareditar/agregareditar.component';
import { ListadoComponent as ListadoCivil } from './casoslegales/civil/listado/listado.component';
import { CrearComponent as CrearCivil } from './casoslegales/civil/crear/crear.component';
import { EditarComponent as EditarCivil } from './casoslegales/civil/editar/editar.component';
import { EditarComponent as EditarEmpleado } from './casoslegales/empleado/editar/editar.component';
import { ListadoComponent as ListadoAbogadosJueces } from './casoslegales/abogadosjueces/listado/listado.component';
import { CrearComponent as InsertarAbogadosJueces } from './casoslegales/abogadosjueces/crear/crear.component';
import { EditarComponent as EditarAbogadosJueces } from './casoslegales/abogadosjueces/editar/editar.component';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
        path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
    {
        path: "acceso/usuarios/listado",
        component: ListadoUsuarios
    },
    {
        path: "casoslegales/tiposdecaso/listado",
        component: ListadoTiposdeCaso
    }, 
    { 
        path: "general/departamentos/listado",
        component: ListadoDepartamento
    },
    { 
        path: "general/cargos/listado",
        component: ListadoCargo
    },
    { 
        path: "general/estadosciviles/listado",
        component: ListadoEstadoCivil
    },
    { 
        path: "general/municipios/listado",
        component: ListadoMunicipio
    },
    { 
        path: "acceso/usuarios/detalles",
        component: DetallesUsaurios
    },
    {
        path: "acceso/roles/listado",
        component: ListadoRoles
    },
    {
        path: "acceso/roles/detalles",
        component: DetallesRoles
    },
    { 
        path: "casoslegales/empleados/listado",
        component: ListadoEmpleado
    },
    {
        path: "casoslegales/empleados/crear",
        component: CrearEmpleados
    },
    {
      path: "casoslegales/empleado/editar",
      component: EditarEmpleado
    },
    { 
        path: "casoslegales/tiposdeevidencia/listado",
        component: ListadoTiposdeEvidencia
    },
    {
        path: "acceso/roles/agregareditar",
        component: AgregarEditarRol
    },
    {
        path: "casoslegales/casos/listado",
        component: ListadoCasos
    },
    {
        path: "casoslegales/casos/agregareditar",
        component: AgregarEditarCasos
    },
    { 
      path: "casoslegales/tiposdeevidencia/listado",
      component: ListadoTiposdeEvidencia
    },
    { 
      path: "casoslegales/civil/listado",
      component: ListadoCivil
    },
    {
      path: "casoslegales/civil/crear",
      component: CrearCivil
    },
    {
      path: "casoslegales/civil/editar",
      component: EditarCivil
    },
    {
      path: "casoslegales/abogadosjueces/listado",
      component: ListadoAbogadosJueces
    },
    {
      path: "casoslegales/abogadosjueces/crear",
      component: InsertarAbogadosJueces
    },{
      path: "casoslegales/abogadosjueces/editar",
      component: EditarAbogadosJueces
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
