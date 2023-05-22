import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { ListadoComponent as ListadoUsuarios} from './acceso/usuarios/listado/listado.component';
import { ListadoComponent as ListadoTiposdeCaso} from './casoslegales/tiposdecaso/listado/listado.component';
import { DetallesComponent as DetallesUsaurios } from './acceso/usuarios/detalles/detalles.component';


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
      path: "acceso/usuarios/detalles",
      component: DetallesUsaurios
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
