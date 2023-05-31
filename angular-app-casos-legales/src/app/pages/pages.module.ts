import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgbToastModule, NgbProgressbarModule, NgbNavModule
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgxMaskModule } from 'ngx-mask';
import { DataTablesModule } from 'angular-datatables';
import {MatTabsModule} from '@angular/material/tabs';
import { DropdownModule, NavModule, TabsModule } from '@coreui/angular';
import { TablesModule } from './tables/tables.module';
import {MatStepperModule} from '@angular/material/stepper';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { LightboxModule } from 'ngx-lightbox';

import { ArchwizardModule } from 'angular-archwizard';
// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import {MatDividerModule} from '@angular/material/divider';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from "./dashboards/dashboards.module";
import { AppsModule } from "./apps/apps.module";
import { EcommerceModule } from "./ecommerce/ecommerce.module";
// Paginas Acce, Gral y Cale
import { ListadoComponent as ListadoUsuarios } from './acceso/usuarios/listado/listado.component';
import { PanelusuarioComponent } from './acceso/usuarios/panelusuario/panelusuario.component';
import { ListadoComponent as ListadoTiposDeCaso } from './casoslegales/tiposdecaso/listado/listado.component'; 
import { ListadoComponent as ListadoTiposDeEvidencia } from './casoslegales/tipodeevidencia/listado/listado.component';
import { ListadoComponent as ListadoDepartamento } from './general/departamento/listado/listado.component';
import { ListadoComponent as ListadoCargo } from './general/cargo/listado/listado.component';
import { ListadoComponent as ListadoEstadoCivil } from './general/estadocivil/listado/listado.component';
import { DetallesComponent as DetallesUsuarios } from './acceso/usuarios/detalles/detalles.component';
import { ListadoComponent as ListadoRoles } from './acceso/roles/listado/listado.component';
import { DetallesComponent as DetallesRoles} from './acceso/roles/detalles/detalles.component';
import { ListadoComponent as ListadoTiposdeevidencia} from './casoslegales/tipodeevidencia/listado/listado.component';
import { ListadoComponent as ListadoMunicipio } from './general/municipio/listado/listado.component';
import { ListadoComponent as ListadoEmpleados} from './casoslegales/empleado/listado/listado.component';
import { CrearComponent as InsertarEmpleados} from './casoslegales/empleado/crear/crear.component';
import { EditarComponent as EditarEmpleado } from './casoslegales/empleado/editar/editar.component';
import { AgregareditarComponent as AgregarEditarRol } from './acceso/roles/agregareditar/agregareditar.component';
import { ListadoComponent as ListadoCasos } from './casoslegales/casos/listado/listado.component';
import { AgregareditarComponent as AgregarEditarCasos } from './casoslegales/casos/agregareditar/agregareditar.component';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ListadoComponent as ListadoCivil } from './casoslegales/civil/listado/listado.component';
import { CrearComponent as InsertarCivil } from './casoslegales/civil/crear/crear.component';
import { EditarComponent as EditarCivil } from './casoslegales/civil/editar/editar.component';
import { ListadoComponent as ListadoAbogadosJueces } from './casoslegales/abogadosjueces/listado/listado.component';
import { CrearComponent as InsertasAbogadosJueces } from './casoslegales/abogadosjueces/crear/crear.component';
import { EditarComponent as EditarAbogadosJueces } from './casoslegales/abogadosjueces/editar/editar.component';
import { EditarComponent as EditarEmpleados} from './casoslegales/empleado/editar/editar.component';
import { ListadoComponent as ListadoEmpresas } from './casoslegales/empresa/listado/listado.component';
import { CrearComponent as CrearEmpresa} from './casoslegales/empresa/crear/crear.component';
import { EditarComponent  as EditarEmpresa} from './casoslegales/empresa/editar/editar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,    
    ListadoUsuarios,
    ListadoTiposDeCaso,
    ListadoDepartamento,
    ListadoCargo,
    ListadoEstadoCivil,
    DetallesUsuarios,
    ListadoRoles,
    DetallesRoles,
    ListadoTiposDeEvidencia,
    ListadoMunicipio,
    ListadoTiposdeevidencia,
    ListadoEmpleados,
    InsertarEmpleados,
    EditarEmpleados,
    ListadoTiposDeEvidencia,
    EditarEmpleado,
    AgregarEditarRol,
    ListadoCasos,
    AgregarEditarCasos,
    ListadoCivil,
    InsertarCivil,
    EditarCivil,
    ListadoAbogadosJueces,
    InsertasAbogadosJueces,
    EditarAbogadosJueces,
    EditarEmpleados,
    ListadoEmpresas,
    CrearEmpresa,
    EditarEmpresa,
    PanelusuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    NgxUsefulSwiperModule,
    LightboxModule,
    DashboardsModule,
    AppsModule,
    EcommerceModule,
    DataTablesModule,
    ReactiveFormsModule,
    TablesModule,
    NgxMaskModule.forRoot(),
    MatTabsModule,
    NavModule,
    TabsModule,
    NgbNavModule,
    NgSelectModule,
    DropdownModule,
    AutocompleteLibModule,
    MatStepperModule,
    ArchwizardModule,
    MatDividerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { 
  constructor(private config: NgSelectConfig ) {
    this.config.notFoundText = 'Sin resultados';
    this.config.appendTo = 'body';
    this.config.disableVirtualScroll = false;
    defineElement(lottie.loadAnimation);
  }
}
