import { Component, ViewChild } from '@angular/core';
import { EmpresaService } from 'src/app/pages/services/casolegales/empresaservice/empresa.service';
import { empresa } from 'src/app/pages/models/casoslegales/empresa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})



export class ListadoComponent {
  emsa: empresa = new empresa();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  breadCrumbItems!: Array<{}>;
  ListadoEmpresas!: empresa[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private service: EmpresaService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {


    if(localStorage.getItem('EmpresaInsert') == '1'){
      this.mensajeSuccess('Empresa Ingresada Correctamente');
      localStorage.setItem('EmpresaInsert','');
    }
    else if (localStorage.getItem('EmpresaInsert') == '2'){
      this.mensajeSuccess('Empresa Editada Correctamente');
      localStorage.setItem('EmpresaInsert','');
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
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
      { label: 'Empresas' },
      { label: 'Listado', active: true }
    ];
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getempresas().subscribe((data: any) => {
        if (data.code === 200) {
          this.ListadoEmpresas = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  loadEmpleados() {
    this.service.getempresas().subscribe((data: any) => {
      if (data.code === 200) {
        this.ListadoEmpresas = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  InsertarUsuario() {
    this.router.navigate(["casoslegales/empresa/crear"]);
  }

  IdEditarEmpleado(Id: any){
    localStorage.setItem('IdEmpleado', Id);
    this.router.navigate(["casoslegales/empleado/editar"]);
  }

  optenerIdEliminar(e: empresa , contentDelete: any) {
    this.emsa = e;
    this.openModalDelet(contentDelete)
  }

  openModalDelet(contentDelete: any) {
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  MandarDatosEliminar() {
    this.service.EliminarEmpreasa(this.emsa)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.mensajeSuccess('Departamento Eliminado Correctamente');
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


