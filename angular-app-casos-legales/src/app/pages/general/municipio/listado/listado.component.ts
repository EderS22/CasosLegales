import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MunicipioService } from 'src/app/pages/services/general/municipioservice/municipio.service';
import { municipio } from 'src/app/pages/models/general/municipios';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import { Router } from '@angular/router';
import { DepartamentoService } from 'src/app/pages/services/general/departamentoservice/departamento.service';
import { departamento } from 'src/app/pages/models/general/departeamento';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {

  @ViewChild(DataTableDirective, { static: false })
  munic!: municipio[];
  dtElement!: DataTableDirective;

  DepartamentoDLL!: departamento[];
  submit!: boolean;

  breadCrumbItems!: Array<{}>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  MunicipioForm!: UntypedFormGroup;

  dateNow: Date = new Date();

  depa_idddddd!: string;

  constructor(
    private service: MunicipioService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private DepartamentoService: DepartamentoService,
    private rolService: RolService,
    private router: Router
  ) {
    this.MunicipioForm = this.formBuilder.group({
      muni_Id: ['0000', [Validators.required]],
      muni_IdCodigo: ['', [Validators.required]],
      muni_Nombre: ['', [Validators.required, Validators.pattern('^(?!\\s)[a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ ]+(?<!\\s)$')]],
      depa_Id: ['', [Validators.required]],
      muni_UsuCreacion: [1],
      muni_UsuModificacion: [1]
    });
  }

  ngOnInit(): void {

    if (!JSON.parse(localStorage.getItem("currentUser") || '').usua_EsAdmin) {
      const ropaAcceso = new ropa();
      ropaAcceso.role_Id = JSON.parse(localStorage.getItem("currentUser") || '').role_Id;
      ropaAcceso.pant_Pantalla = "Municipios";
      this.rolService.validarRolTienePantalla(ropaAcceso)
        .subscribe((data: any) => {
          if (data.code === 200) {
            if (data.data.codeStatus === 0) {
              this.router.navigate([""]);
            }
          }
        })
    }


    this.dtOptions = {
      pagingType: 'simple_numbers',
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
      },
      columnDefs: [
        {
          targets: 3,
          orderable: false,
        },
      ]
    };

    this.loadMunicipios();

    this.DepartamentoService.getDepartamentos() //cargar departamentos
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.DepartamentoDLL = data.data;
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
    return this.MunicipioForm.controls;
  }

  openModal(content: any) {
    this.submit = false;
    this.MunicipioForm.get('muni_Id')?.setValue('0000');
    this.MunicipioForm.get('depa_Id')?.setValue('');
    this.MunicipioForm.get('muni_IdCodigo')?.setValue('');
    this.MunicipioForm.get('muni_Nombre')?.setValue('');
    this.depa_idddddd = '';
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

  AsignarIdDepartamento(id: any) {
    this.depa_idddddd = id;
  }

  GuardarMunicipio() {

    if (!this.MunicipioForm.valid) {
      this.submit = true;

    }
    else {
      const depaId = this.MunicipioForm.get('depa_Id')?.value;
      const muniIdCodigo = this.MunicipioForm.get('muni_IdCodigo')?.value;
      const concatenation = depaId.toString() + muniIdCodigo.toString();
      this.MunicipioForm.get('muni_Id')?.setValue(concatenation);

      this.service.InsertMunicipio(this.MunicipioForm.value)
      .subscribe((data: any)=>{
        if (data.data.codeStatus == 1) {
          this.mensajeSuccess('Municipio Ingresado Correctamente');
          this.modalService.dismissAll();
          this.rerender();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('Ya existe un Municipio con ese codigo');
        }
        else if (data.data.codeStatus == 3) {
          this.mensajeWarning('Ya existe un Municipio con ese nombre en ese Departamento');
        }
        
      })

    }

  }



  EditarMunicipio(m: municipio, contentEdit: any): void {
    this.openModalEdit(contentEdit)
    this.MunicipioForm.get('muni_Id')?.setValue(m.muni_Id);
    this.MunicipioForm.get('depa_Id')?.setValue(m.depa_Id);
    this.MunicipioForm.get('muni_Nombre')?.setValue(m.muni_Nombre);
  }

  openModalEdit(contentEdit: any) {
    this.modalService.open(contentEdit, { size: 'md', centered: true, backdrop: 'static' });
  }

  GaurdarDatosEditados() {
    this.MunicipioForm.get('muni_IdCodigo')?.setValue('00');

    if (!this.MunicipioForm.valid) {
      this.submit = true;

    }
    else {

      this.service.EditarMunicipio(this.MunicipioForm.value)
      .subscribe((data: any)=>{
        if (data.data.codeStatus == 1) {
          this.mensajeSuccess('Municipio Editado Correctamente');
          this.modalService.dismissAll();
          this.rerender();
        }
        else if (data.data.codeStatus == 3) {
          this.mensajeWarning('Ya existe un Municipio con ese nombre en ese Departamento');
        }
        
      })

    }
  }

  optenerIdEliminar(m: municipio, contentDelete: any) {
    this.MunicipioForm.get('muni_Id')?.setValue(m.muni_Id);
    this.MunicipioForm.get('depa_Id')?.setValue('00');
    this.MunicipioForm.get('muni_Nombre')?.setValue('00');
    this.MunicipioForm.get('muni_IdCodigo')?.setValue('00');

    this.openModalDelet(contentDelete)
  }

  openModalDelet(contentDelete: any) {
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  MandarDatosEliminar() {
    if (!this.MunicipioForm.valid) {
      this.submit = true;

    }
    else {

      this.service.EliminarMunicipio(this.MunicipioForm.value)
      .subscribe((data: any)=>{
        if (data.data.codeStatus == 1) {
          this.mensajeSuccess('Municipio Eliminado Correctamente');
          this.modalService.dismissAll();
          this.rerender();
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
