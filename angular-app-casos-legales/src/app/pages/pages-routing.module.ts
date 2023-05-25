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
import { ListadoComponent as ListadoCivil } from './casoslegales/civil/listado/listado.component';
import { CrearComponent as CrearCivil } from './casoslegales/civil/crear/crear.component';
import { EditarComponent as EditarEmpleado } from './casoslegales/empleado/editar/editar.component';

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
      path: "general/departamento/listado",
      component: ListadoDepartamento
    },
    { 
      path: "general/cargo/listado",
      component: ListadoCargo
    },
    { 
      path: "general/estadocivil/listado",
      component: ListadoEstadoCivil
    },
    { 
      path: "general/municipio/listado",
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
      path: "casoslegales/empleado/listado",
      component: ListadoEmpleado
    },
    {
      path: "casoslegales/empleado/crear",
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
      path: "casoslegales/civil/listado",
      component: ListadoCivil
    },
    {
      path: "casoslegales/civil/crear",
      component: CrearCivil
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
