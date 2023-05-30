import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DepartamentoService } from 'src/app/pages/services/general/departamentoservice/departamento.service';
import { departamento } from 'src/app/pages/models/general/departeamento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  depa: departamento = new departamento();
  breadCrumbItems!: Array<{}>;
  depto!: departamento[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  submitted = false;
  depaIdInvalid = false;
  depaNombreInvalid = false;

  depaNombre!: string;
  dateNow: Date = new Date();

  constructor(private service: DepartamentoService, private modalService: NgbModal) { }
  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'simple_numbers',
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
      },
      columnDefs: [
        {
          targets: 2,
          orderable: false,
        },
      ]
    };

    this.loadDeptos();

    this.breadCrumbItems = [
      { label: 'Departamentos' },
      { label: 'Listado', active: true }
    ];
  }

  loadDeptos() {
    this.service.getDepartamentos().subscribe((data: any) => {
      if (data.code === 200) {
        this.depto = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getDepartamentos().subscribe((data: any) => {
        if (data.code === 200) {
          this.depto = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  openModal(content: any) {
    this.depa.depa_Id = '';
    this.depa.depa_Nombre = '';
    this.depa.depa_UsuModificacion = 0;
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static' });
  }



  trimDepaNombre() {
    this.depaNombre = this.depaNombre.trim();
  }


  GuardarDepartamento() {

    this.submitted = true;
    this.depaNombreInvalid = this.depa.depa_Nombre.trim().length === 0;
    this.depaIdInvalid = this.depa.depa_Id.trim().length === 0;

    if (this.depaNombreInvalid || this.depaIdInvalid) {

    }
    else {

      this.depa.depa_UsuCreacion = 1;
      this.service.InsertDepartameto(this.depa)
        .subscribe((data: any) => {
          console.log(data);
          if (data.data.codeStatus == 1) {
            this.mensajeSuccess('Departamento Ingresado Correctamente');
            this.modalService.dismissAll();
            this.rerender();
          }
          else if (data.data.codeStatus == 2) {
            this.mensajeWarning('Ya existe un departamento con este Codigo');
          }
          else if (data.data.codeStatus == 3) {
            this.mensajeWarning('Ya existe un departamento con este Nombre');
          }
          else {
            this.mensajeError('Ups, Algo Salio Mal!!');
          }
        })
    }
  }

  EditarDepartamento(d: departamento, contentEdit: any): void {
    this.depa = { ...d };
    this.openModalEdit(contentEdit)
  }
  openModalEdit(contentEdit: any) {
    this.submitted = false;
    this.modalService.open(contentEdit, { size: 'md', centered: true, backdrop: 'static' });
  }

  GaurdarDatosEditados() {

    this.submitted = true;
    this.depaNombreInvalid = this.depa.depa_Nombre.trim().length === 0;

    if (this.depaNombreInvalid) {

    }
    else {
      this.depa.depa_UsuModificacion = 1;
      this.service.EditarDepartamento(this.depa)
        .subscribe((data: any) => {
          console.log(data);
          if (data.data.codeStatus == 1) {
            this.mensajeSuccess('Departamento Editado Correctamente');
            this.modalService.dismissAll();
            this.rerender();
          }
          else if (data.data.codeStatus == 2) {
            this.mensajeWarning('Ya existe un departamento con este Nombre');
          }
          else {
            this.mensajeError('Ups, Algo Salio Mal!!');
          }
        })
    }
  }

  optenerIdEliminar(d: departamento, contentDelete: any) {
    this.depa = d;
    this.openModalDelet(contentDelete)
  }

  openModalDelet(contentDelete: any) {
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  MandarDatosEliminar() {
    this.service.EliminarDepartamento(this.depa)
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
