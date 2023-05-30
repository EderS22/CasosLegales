import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TiposdecasoService } from '../../../services/casolegales/tiposdecasoservice/tiposdecaso.service';
import { tiposdecaso } from '../../../models/casoslegales/tiposdecaso';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { data } from 'jquery';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  tdp: tiposdecaso = new tiposdecaso();
  content!: tiposdecaso[];
  checkedValGet: any[] = [];
  submitted = false;
  breadCrumbItems!: Array<{}>;
  tiposdecasos!: tiposdecaso[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tp!: UntypedFormGroup;
  ticaNombreInvalid = false;
  ticaDescripcionInvalid = false;
  dateNow: Date = new Date();

  constructor(private service: TiposdecasoService, private modalService: NgbModal) { }

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
    this.LoadTiposdecaso();

    this.breadCrumbItems = [
      { label: 'Tipos de Caso' },
      { label: 'Listado', active: true }
    ];
  }
  get form() {
    return this.tp.controls;
  }
  openModal(content: any) {
    this.tdp.tica_Nombre = '';
    this.tdp.tica_Descripcion = '';
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
      this.service.getTiposdecaso().subscribe((data: any) => {
        if (data.code === 200) {
          this.tiposdecasos = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  LoadTiposdecaso() {
    this.service.getTiposdecaso().subscribe((data: any) => {
      if (data.code === 200) {
        this.tiposdecasos = data.data;
        this.dtTrigger.next(null);
      }
    })
  }

  trimTicaNombre() {
    this.tdp.tica_Nombre = this.tdp.tica_Nombre.trim();
  }
  trimTicaDescripcion() {
    this.tdp.tica_Descripcion = this.tdp.tica_Descripcion.trim();
  }

  GuardarTipoDeCaso() {
    this.submitted = true;
    this.ticaNombreInvalid = this.tdp.tica_Nombre.trim().length === 0;
    this.ticaDescripcionInvalid = this.tdp.tica_Descripcion.trim().length === 0;

    if(this.ticaNombreInvalid || this.ticaDescripcionInvalid){
      
    }
    else{
    this.tdp.tica_UsuCreacion = 1;
    this.service.InsertTipoDeCaso(this.tdp)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Tipo de Caso Ingresado Correctamente');
          this.modalService.dismissAll();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un tipo de caso con este Nombre');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
    }
  }

  EditarTipoDeCaso(tc: tiposdecaso, contentEdit: any): void {
    this.tdp = { ...tc };
    this.openModalEdit(contentEdit)
  }

  GuardarDatosEditados() {
    this.submitted = true;
    this.ticaNombreInvalid = this.tdp.tica_Nombre.trim().length === 0;
    this.ticaDescripcionInvalid = this.tdp.tica_Descripcion.trim().length === 0;


    if(this.ticaNombreInvalid || this.ticaDescripcionInvalid){
      
    }
    else{
    this.tdp.tica_UsuModificacion = 1;
    this.service.EditarTipoDeCaso(this.tdp)
      .subscribe((data: any) => {
        console.log(data);
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Tipo de Caso Editado Correctamente');
          this.modalService.dismissAll();

        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un tipo de caso con este Nombre');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
    }
  }


  MandarDatosEliminar() {
    this.service.EliminarTipoDeCaso(this.tdp)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Tipo de Caso Eliminado Correctamente');
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

  optenerIdEliminar(tc: tiposdecaso, contentDelete: any) {
    this.tdp = tc;
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
