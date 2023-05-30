import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { EstadocivilService } from 'src/app/pages/services/general/estadocivilservice/estadocivil.service';
import { estadosciviles } from 'src/app/pages/models/general/estadocivil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  estado: estadosciviles = new estadosciviles();

  breadCrumbItems!: Array<{}>;
  esta!: estadosciviles[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  submitted = false;
  ec!: UntypedFormGroup;
  ecivDescripcionInValid = false;

  dateNow: Date = new Date();
  
  constructor(private service: EstadocivilService, private modalService: NgbModal, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {

    this.ec = this.formBuilder.group({
      eciv_Descripcion: ['', [Validators.required]]
    });

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
    this.loadEsCiv();

    this.breadCrumbItems = [
      { label: 'EstadosCiviles' },
      { label: 'Listado', active: true }
    ];
  }
  loadEsCiv() {
    this.service.getEstadosCiviles().subscribe((data: any) => {
      if (data.code === 200) {
        this.esta = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  get form() {
    return this.ec.controls;
  }

  openModal(content: any) {
    this.estado.eciv_Id = 0;
    this.estado.eciv_Descripcion = '';
    this.estado.eciv_UsuModificacion = 0;
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static' });
  }
  openModalEdit(contentEdit: any) {
    this.submitted = false;
    this.modalService.open(contentEdit, { size: 'md', centered: true, backdrop: 'static' });
  }
  openModalDelet(contentDelete : any){
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getEstadosCiviles().subscribe((data: any) => {
        if (data.code === 200) {
          this.esta = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }


  trimTicaDescripcion() {
    this.estado.eciv_Descripcion = this.estado.eciv_Descripcion.trim();
  }
  GuardarEstadoCivil() {
    this.submitted = true;
    this.ecivDescripcionInValid = this.estado.eciv_Descripcion.trim().length === 0;

    if(this.ecivDescripcionInValid){
      
    }
    else{
    this.estado.eciv_UsuCreacion = 1;
    this.service.InsertEstadoCivil(this.estado)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Estado Civil Ingresado Correctamente');
          this.modalService.dismissAll();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un estado civil con este Nombre');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
    }
  }

  EditarEstadoCivil(e: estadosciviles, contentEdit: any): void {
    this.estado = { ...e };
    this.openModalEdit(contentEdit)
  }

  GaurdarDatosEditados(){
    this.submitted = true;
    this.ecivDescripcionInValid = this.estado.eciv_Descripcion.trim().length === 0;

    if(this.ecivDescripcionInValid){
      
    }
    else{
    this.estado.eciv_UsuModificacion = 1;
    this.service.EditarEstadoCivil(this.estado)
    .subscribe((data : any)=>{
      if (data.data.codeStatus == 1) {
        this.rerender()
        this.mensajeSuccess('Estado Civil Editado Correctamente');
        this.modalService.dismissAll();
      }
      else if (data.data.codeStatus == 2) {
        this.mensajeWarning('Ya existe un estado civil con este Nombre');
      }
      else{
        this.mensajeError('Ups, Algo Salio Mal!!');
      }
    })
  }
  }

  optenerIdEliminar(e: estadosciviles, contentDelete: any){
    this.estado = e;
    this.openModalDelet(contentDelete)
  }


  MandarDatosEliminar(){
    this.submitted = true;
    this.ecivDescripcionInValid = this.estado.eciv_Descripcion.trim().length === 0;

    if(this.ecivDescripcionInValid){
      
    }
    else{
    this.service.EliminarEstadoCivil(this.estado)
    .subscribe((data: any)=> {
      if (data.data.codeStatus == 1) {
        this.rerender()
        this.mensajeSuccess('Estado Civil Eliminado Correctamente');
        this.modalService.dismissAll();
      }
      else if (data.data.codeStatus == 2) {
        this.mensajeWarning('No es posible eliminar el registro, ya que el mismo está siendo utilizado por otra tabla');
      }
      else{
        this.mensajeError('Ups, Algo Salio Mal!!');
      }
    })
  }
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
