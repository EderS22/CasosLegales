import { Component, ViewChild } from '@angular/core';
import { EmpleadoService } from 'src/app/pages/services/casolegales/empleadoservice/empleado.service';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {
  empe: empleado = new empleado();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  breadCrumbItems!: Array<{}>;
  ListadoEmpleado!: empleado[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  dateNow: Date = new Date();
  
  constructor(
    private service: EmpleadoService,
    private modalService: NgbModal,
    private router: Router,
    private rolService: RolService,
  ) { }

  ngOnInit(): void {

    if (!JSON.parse(localStorage.getItem("currentUser") || '').usua_EsAdmin) {
      const ropaAcceso = new ropa();
      ropaAcceso.role_Id = JSON.parse(localStorage.getItem("currentUser") || '').role_Id;
      ropaAcceso.pant_Pantalla = "Empleados";
      this.rolService.validarRolTienePantalla(ropaAcceso)
        .subscribe((data: any) => {
          if (data.code === 200) {
            if (data.data.codeStatus === 0) {
              this.router.navigate([""]);
            }
          }
        })
    }

    if(localStorage.getItem('EMpleadoInsert') == '1'){
      this.mensajeSuccess('Empleado Ingresado Correctamente');
      localStorage.setItem('EMpleadoInsert','');
    }
    else if (localStorage.getItem('EMpleadoInsert') == '2'){
      this.mensajeSuccess('Empleado Editado Correctamente');
      localStorage.setItem('EMpleadoInsert','');
    }

    this.dtOptions = {
      pagingType: 'simple_numbers',
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
      },
      columnDefs: [
        {
          targets: 4,
          orderable: false,
        },
      ]
    };

    this.loadEmpleados();

    this.breadCrumbItems = [
      { label: 'Empleados' },
      { label: 'Listado', active: true }
    ];
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getempleados().subscribe((data: any) => {
        if (data.code === 200) {
          this.ListadoEmpleado = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  loadEmpleados() {
    this.service.getempleados().subscribe((data: any) => {
      if (data.code === 200) {
        this.ListadoEmpleado = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  InsertarUsuario() {
    this.router.navigate(["casoslegales/empleados/crear"]);
  }

  IdEditarEmpleado(Id: any){
    localStorage.setItem('IdEmpleado', Id);
    this.router.navigate(["casoslegales/empleado/editar"]);
  }

  optenerIdEliminar(e: empleado , contentDelete: any) {
    this.empe = e;
    this.openModalDelet(contentDelete)
  }

  openModalDelet(contentDelete: any) {
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  MandarDatosEliminar() {
    this.service.EliminarEmpleados(this.empe)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.mensajeSuccess('Empleado Eliminado Correctamente');
          this.modalService.dismissAll();
          this.rerender();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('No es posible eliminar el registro, ya que el mismo está siendo utilizado por otra tabla');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
  }
  
  mensajeSuccess(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeWarning(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeError(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
