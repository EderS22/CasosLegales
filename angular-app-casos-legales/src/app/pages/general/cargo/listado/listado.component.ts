import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CargoService } from 'src/app/pages/services/general/cargosservice/cargo.service';
import { cargos } from 'src/app/pages/models/general/cargo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
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
  carg: cargos = new cargos();

  breadCrumbItems!: Array<{}>;
  cargo!: cargos[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  submitted = false;
  cg!: UntypedFormGroup;
  cargDescripcionInValid = false;
  
  dateNow: Date = new Date();

  constructor(private service: CargoService, private modalService: NgbModal, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {

    this.cg = this.formBuilder.group({
      depa_Nombre: ['', [Validators.required]]
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
    this.loadCargos();

    this.breadCrumbItems = [
      { label: 'Cargos' },
      { label: 'Listado', active: true }
    ];
  }
  loadCargos() {
    this.service.getCargos().subscribe((data: any) => {
      if (data.code === 200) {
        this.cargo = data.data
        this.dtTrigger.next(null);
      }
    })
  }
  get form() {
    return this.cg.controls;
  }
  
  openModal(content: any) {
    this.carg.carg_Id = 0;
    this.carg.carg_Descripcion = '';
    this.carg.carg_UsuModificacion = 0;
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
      this.service.getCargos().subscribe((data: any) => {
        if (data.code === 200) {
          this.cargo = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  trimTicaDescripcion() {
    this.carg.carg_Descripcion = this.carg.carg_Descripcion.trim();
  }
  GuardarCargo() {
    this.submitted = true;
    this.cargDescripcionInValid = this.carg.carg_Descripcion.trim().length === 0;

    if(this.cargDescripcionInValid){
      
    }
    else{
    this.carg.carg_UsuCreacion = 1;
    this.service.InsertCargo(this.carg)
      .subscribe((data: any) => {
        console.log(data)
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Cargo Ingresado Correctamente');
          this.modalService.dismissAll();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un cargo con este Nombre');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
    }
  }


  EditarCargo(c: cargos, contentEdit: any): void {
    this.carg = { ...c };
    this.openModalEdit(contentEdit)
  }
  GaurdarDatosEditados(){
    this.submitted = true;
    this.cargDescripcionInValid = this.carg.carg_Descripcion.trim().length === 0;

    if(this.cargDescripcionInValid){
      
    }
    else{
    this.carg.carg_UsuModificacion = 1;
    this.service.EditarCargo(this.carg)
    .subscribe((data : any)=>{
      console.log(data);
      if (data.data.codeStatus == 1) {
        this.rerender()
        this.mensajeSuccess('Cargo Editado Correctamente');
        this.modalService.dismissAll();
      }
      else if (data.data.codeStatus == 2) {
        this.mensajeWarning('Ya existe un Cargo con este Nombre');
      }
      else{
        this.mensajeError('Ups, Algo Salio Mal!!');
      }
    })
  }
  }


  MandarDatosEliminar(){
    this.submitted = true;
    this.cargDescripcionInValid = this.carg.carg_Descripcion.trim().length === 0;

    if(this.cargDescripcionInValid){
      
    }
    else{
    this.service.EliminarCargo(this.carg)
    .subscribe((data: any)=> {
      if (data.data.codeStatus == 1) {
        this.rerender()
        this.mensajeSuccess('Cargo Eliminado Correctamente');
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

  optenerIdEliminar(c: cargos, contentDelete: any){
    this.carg = c;
    this.openModalDelet(contentDelete)
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
