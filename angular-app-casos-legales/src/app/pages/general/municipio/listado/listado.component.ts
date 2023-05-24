import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MunicipioService } from 'src/app/pages/services/general/municipioservice/municipio.service';
import { municipio } from 'src/app/pages/models/general/municipios'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

import { DepartamentoService } from 'src/app/pages/services/general/departamentoservice/departamento.service';
import { departamento } from 'src/app/pages/models/general/departeamento';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  DepartamentoDLL! : departamento[];
  muni: municipio = new municipio();

  breadCrumbItems!: Array<{}>;
  munic!: municipio[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  submitted = false;
  mc!: UntypedFormGroup;

  
  muniNombreInValid = false;
  muniCodigoInValid = false;
  depaIdInValid = false;

  constructor(private service: MunicipioService, private modalService: NgbModal, private formBuilder: UntypedFormBuilder, 
  private DepartamentoService: DepartamentoService) { }
  ngOnInit(): void {

    this.mc = this.formBuilder.group({
      muni_Nombre: ['', [Validators.required]],
      muni_Codigo: ['', [Validators.required]],
      depa_Id: [null, [Validators.required]]
    });

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
    this.loadMunicipios();
    this.DepartamentoService.getDepartamentos() //cargar departamentos
    .subscribe((data: any)=> {
      if(data.code === 200){
        this.DepartamentoDLL= data.data;
      }
    })
    this.breadCrumbItems = [
      { label: 'Municipios' },
      { label: 'Listado', active: true }
    ];
  }
  
  loadMunicipios() {
    this.service.getMunicipios().subscribe((data: any) => {
      if (data.code === 200) {
        this.munic = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  get form() {
    return this.mc.controls;
  }

  openModal(content: any) {
    this.muni.muni_Id = 0;
    this.muni.muni_Nombre = '';
    this.muni.muni_Codigo = '';
    this.muni.depa_Id = 0;
    this.muni.muni_UsuModificacion = 0;
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static' });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getMunicipios().subscribe((data: any) => {
        if (data.code === 200) {
          this.munic = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  GuardarMunicipio() {
    this.submitted = true;
    this.muniNombreInValid = this.muni.muni_Nombre.trim().length === 0;
    this.muniCodigoInValid = this.muni.muni_Codigo.trim().length === 0;
    this.depaIdInValid = this.muni.depa_Id.toString().length === 0;

    if(this.muniNombreInValid || this.muniCodigoInValid || this.depaIdInValid){

    }
    else{
    this.muni.muni_UsuCreacion = 1;
    this.service.InsertMunicipio(this.muni)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.rerender()
          this.mensajeSuccess('Municipio Ingresado Correctamente');
          this.modalService.dismissAll();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un municipio con este Nombre');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
    }  
  }

  EditarMunicipio(m: municipio, contentEdit: any): void {
    this.muni = {...m};
    this.openModalEdit(contentEdit)
  }
  openModalEdit(contentEdit: any) {
    this.submitted = false;
    this.modalService.open(contentEdit, { size: 'md', centered: true, backdrop: 'static' });
  }

  GaurdarDatosEditados(){
    this.submitted = true;
    this.muniNombreInValid = this.muni.muni_Nombre.trim().length === 0;
    this.muniCodigoInValid = this.muni.muni_Codigo.trim().length === 0;
    this.depaIdInValid = this.muni.depa_Id.toString().length === 0;

    if(this.muniNombreInValid || this.muniCodigoInValid || this.depaIdInValid){

    }
    else{
    this.muni.muni_UsuModificacion = 1;
    this.service.EditarMunicipio(this.muni)
    .subscribe((data : any)=>{
      if (data.data.codeStatus == 1) {
        this.rerender()
        this.mensajeSuccess('Municipio Editado Correctamente');
        this.modalService.dismissAll();
      }
      else if (data.data.codeStatus == 2) {
        this.mensajeWarning('Ya existe un Municipio con este Nombre');
      }
      else{
        this.mensajeError('Ups, Algo Salio Mal!!');
      }
    })
  }
  }

  optenerIdEliminar(m: municipio, contentDelete: any){
    this.muni = m;
    this.openModalDelet(contentDelete)
  }

  openModalDelet(contentDelete : any){
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  MandarDatosEliminar(){
    this.service.EliminarMunicipio(this.muni)
    .subscribe((data: any)=> {
      if (data.data.codeStatus == 1) {
        this.rerender()
        this.mensajeSuccess('Municipio Eliminado Correctamente');
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
