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
import { DataTablesModule } from 'angular-datatables';
import { DetallesComponent as DetallesUsuarios } from './acceso/usuarios/detalles/detalles.component';
import { ListadoComponent } from './casoslegales/tipodeevidencia/listado/listado.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,
    ListadoUsuarios,
    ListadoTiposDeCaso,
    ListadoDepartamento,
    ListadoCargo,
    DetallesUsuarios,
    ListadoTiposDeEvidencia,
    ListadoComponent,
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
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
