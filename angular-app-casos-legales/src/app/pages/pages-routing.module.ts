import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { ListadoComponent as ListadoUsuarios} from './acceso/usuarios/listado/listado.component';
import { ListadoComponent as ListadoTiposdeCaso} from './casoslegales/tiposdecaso/listado/listado.component';
import { ListadoComponent as ListadoDepartamento} from './general/departamento/listado/listado.component';
import { DetallesComponent as DetallesUsaurios } from './acceso/usuarios/detalles/detalles.component';
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
      path: "general/departamento/listado",
      component: ListadoDepartamento
    },
    { 
      path: "acceso/usuarios/detalles",
      component: DetallesUsaurios
    },
    {
      path: "casoslegales/empleado/listado",
      component: ListadoEmpleado
    },
    {
      path: "casoslegales/empleado/crear",
      component: CrearEmpleados
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
