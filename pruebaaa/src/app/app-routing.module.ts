import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './Categorias/listar/listar.component';
import { CrearComponent } from './Categorias/crear/crear.component';

const routes: Routes = [
  {path: 'index', component:ListarComponent},
  {path: 'crear', component:CrearComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
