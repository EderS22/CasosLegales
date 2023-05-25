import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgbToastModule, NgbProgressbarModule
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgxMaskModule } from 'ngx-mask';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from "./dashboards/dashboards.module";
import { AppsModule } from "./apps/apps.module";
import { EcommerceModule } from "./ecommerce/ecommerce.module";
import { ListadoComponent as ListadoUsuarios } from './acceso/usuarios/listado/listado.component';
import { ListadoComponent as ListadoTiposDeCaso } from './casoslegales/tiposdecaso/listado/listado.component'; 
import { ListadoComponent as ListadoTiposDeEvidencia } from './casoslegales/tipodeevidencia/listado/listado.component';
import { ListadoComponent as ListadoDepartamento } from './general/departamento/listado/listado.component';
import { ListadoComponent as ListadoCargo } from './general/cargo/listado/listado.component';
import { ListadoComponent as ListadoEstadoCivil } from './general/estadocivil/listado/listado.component';
import { DataTablesModule } from 'angular-datatables';
import { DetallesComponent as DetallesUsuarios } from './acceso/usuarios/detalles/detalles.component';
import { ListadoComponent as ListadoRoles } from './acceso/roles/listado/listado.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { DetallesComponent } from './acceso/roles/detalles/detalles.component';
import { TablesModule } from './tables/tables.module';
import { ListadoComponent } from './casoslegales/tipodeevidencia/listado/listado.component';
import { ListadoComponent as ListadoMunicipio } from './general/municipio/listado/listado.component';

import { ListadoComponent as ListadoEmpleados} from './casoslegales/empleado/listado/listado.component';
import { CrearComponent as InsertarEmpleados} from './casoslegales/empleado/crear/crear.component';


import { ListadoComponent as ListadoCivil } from './casoslegales/civil/listado/listado.component';
import { CrearComponent as InsertarCivil } from './casoslegales/civil/crear/crear.component';
import { EditarComponent as EditarCivil } from './casoslegales/civil/editar/editar.component';


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
    DetallesComponent,
    ListadoTiposDeEvidencia,
    ListadoMunicipio,
    ListadoComponent,
    ListadoEmpleados,
    InsertarEmpleados,
    ListadoTiposDeEvidencia,
    ListadoCivil,
    InsertarCivil,
    EditarCivil,
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
    CdkDropListGroup, 
    CdkDropList, 
    CdkDrag,
    TablesModule,
    NgxMaskModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
