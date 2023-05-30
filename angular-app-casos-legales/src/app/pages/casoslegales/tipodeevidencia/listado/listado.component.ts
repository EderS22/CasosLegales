import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TiposdeevidenciaService } from 'src/app/pages/services/casolegales/tiposdeevidenciaservice/tiposdeevidencia.service'; 
import { tiposdeevidencia } from 'src/app/pages/models/casoslegales/tiposdeevidencia'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup} from '@angular/forms';
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
  tde: tiposdeevidencia = new tiposdeevidencia();
  content!: tiposdeevidencia[];
  checkedValGet: any[] = [];
  submitted = false;
  breadCrumbItems!: Array<{}>;
  tiposdeevidencia!: tiposdeevidencia[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  te!: UntypedFormGroup;
  tievNombreInvalid = false;
  tievDescripcionInvalid = false;
  dateNow: Date = new Date();

  constructor(private service: TiposdeevidenciaService, private modalService: NgbModal) { }

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
        }
      ]
    };
    this.LoadTiposdeevidencia();

    this.breadCrumbItems = [
      { label: 'Tipos de Evidencia' },
      { label: 'Listado', active: true }
    ];
  }
  get form() {
    return this.te.controls;
  }
  openModal(content: any) {
    this.tde.tiev_Nombre = '';
    this.tde.tiev_Descripcion = '';
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static' });
  }
  openModalEdit(contentEdit: any) {
    this.submitted = false;
    this.modalService.open(contentEdit, { size: 'md', centered: true, backdrop: 'static' });
  }
  openModalDelete(contentDelete: any) {
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getTiposdeevidencia().subscribe((data: any) => {
        if (data.code === 200) {
          this.tiposdeevidencia = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  LoadTiposdeevidencia() {
    this.service.getTiposdeevidencia().subscribe((data: any) => {
      if (data.code === 200) {
        this.tiposdeevidencia = data.data;
        this.dtTrigger.next(null);
      }
    })
  }
  trimTievNombre() {
    this.tde.tiev_Nombre = this.tde.tiev_Nombre.trim();
  }
  trimTievDescripcion() {
    this.tde.tiev_Descripcion = this.tde.tiev_Descripcion.trim();
  }

  GuardarTipoDeEvidencia() {
    this.submitted = true;
    this.tievNombreInvalid = this.tde.tiev_Nombre.trim().length === 0;
    this.tievDescripcionInvalid = this.tde.tiev_Descripcion.trim().length === 0;

    if(this.tievNombreInvalid || this.tievDescripcionInvalid){
      
    }
    else{
    this.tde.tiev_UsuCreacion = 1;
    this.service.InsertTipoDeEvidencia(this.tde)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Tipo de Evidencia Ingresado Correctamente');
          this.modalService.dismissAll();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un tipo de evidencia con este Nombre');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
    }
  }

  EditarTipoDeEvidencia(te: tiposdeevidencia, contentEdit: any): void {
    this.tde = { ...te };
    this.openModalEdit(contentEdit)
  }

  GuardarDatosEditados() {
    this.submitted = true;
    this.tievNombreInvalid = this.tde.tiev_Nombre.trim().length === 0;
    this.tievDescripcionInvalid = this.tde.tiev_Descripcion.trim().length === 0;


    if(this.tievNombreInvalid || this.tievDescripcionInvalid){
      
    }
    else{
    this.tde.tiev_UsuModificacion = 1;
    this.service.EditarTipoDeEvidencia(this.tde)
      .subscribe((data: any) => {
        console.log(data);
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Tipo de Evidencia Editado Correctamente');
          this.modalService.dismissAll();

        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un tipo de evidencia con este Nombre');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
    }
  }


  MandarDatosEliminar() {
    this.service.EliminarTipoDeEvidencia(this.tde)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Tipo de Evidencia Eliminado Correctamente');
          this.modalService.dismissAll();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('No es posible eliminar el registro, ya que el mismo está siendo utilizado por otra tabla');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
  }

  optenerIdEliminar(te: tiposdeevidencia, contentDelete: any) {
    this.tde = te;
    this.openModalDelete(contentDelete)
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
