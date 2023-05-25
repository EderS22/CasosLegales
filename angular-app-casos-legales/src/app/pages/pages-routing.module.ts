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
      path: "casoslegales/tiposdeevidencia/listado",
      component: ListadoTiposdeEvidencia
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
