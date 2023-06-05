import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/pages/services/casolegales/empresaservice/empresa.service';
import { empresa } from 'src/app/pages/models/casoslegales/empresa';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';

import { EstadocivilService } from 'src/app/pages/services/general/estadocivilservice/estadocivil.service'; 
import { estadosciviles } from 'src/app/pages/models/general/estadocivil';

import { MunicipioService } from 'src/app/pages/services/general/municipioservice/municipio.service';
import { municipio } from 'src/app/pages/models/general/municipios';

import { DepartamentoService } from 'src/app/pages/services/general/departamentoservice/departamento.service';
import { departamento } from 'src/app/pages/models/general/departeamento';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent {
  
  emsa: empresa = new empresa();
  validationform!: UntypedFormGroup;
  submit!: boolean;
  submitMunicipio!: boolean;

  EstadoCivilDLL!: estadosciviles[]; //estdo civil ddl
  DepartamentoDLL!: departamento[]; //departamento ddl

  MunicipioDDL!: municipio[];// municipio ddl
  MunicipioDesactivado = true;

  breadCrumbItems!: Array<{}>;
  modelValueAsDate: Date = new Date(); // se usa para el calendario 

  dateNow: Date = new Date();
  
  constructor(
    private service: EmpresaService,
    private EstadoCivilService: EstadocivilService,
    private DepartamentoService: DepartamentoService,
    private MunicipioService: MunicipioService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private rolService: RolService,
  ) {
    this.validationform = this.formBuilder.group({
      emsa_Nombre: ['', [Validators.required]],
      emsa_RTN: ['', [Validators.required]],
      muni_Id: ['', [Validators.required]],
      emsa_Direccion: ['', [Validators.required]],
      emsa_RepresentanteNombre: ['', [Validators.required, Validators.pattern('^(?!\\s)[a-zA-Z0-9ÑñáéíóúÁÉÍÓÚ ]+(?<!\\s)$')]],
      emsa_RepresentanteDNI: ['', [Validators.required]],
      emsa_RepresentanteTelefono: ['', [Validators.required]],
      emsa_RepresentanteSexo: ['', [Validators.required]],
      eciv_Id: [null, [Validators.required]],
      depa_Id: ['', [Validators.required]],
      emsa_UsuCreacion: [1],
    });
  }

  ngOnInit(): void {

    if (!JSON.parse(localStorage.getItem("currentUser") || '').usua_EsAdmin) {
      const ropaAcceso = new ropa();
      ropaAcceso.role_Id = JSON.parse(localStorage.getItem("currentUser") || '').role_Id;
      ropaAcceso.pant_Pantalla = "Empresas";
      this.rolService.validarRolTienePantalla(ropaAcceso)
        .subscribe((data: any) => {
          if (data.code === 200) {
            if (data.data.codeStatus === 0) {
              this.router.navigate([""]);
            }
          }
        })
    }

    this.EstadoCivilService.getEstadosCiviles() //cargar estado civil
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.EstadoCivilDLL = data.data;
        }
      })

    this.DepartamentoService.getDepartamentos() //cargar departamentos
    .subscribe((data: any) => {
      if (data.code === 200) {
        this.DepartamentoDLL = data.data;
      }
    })

    this.breadCrumbItems = [
      { label: 'Empresas' },
      { label: 'Crear', active: true }
    ];
  }

  flatpickrOptions: any = {
    maxDate: new Date() // Deshabilitar fechas futuras
  };

  CargarMunicipios(id: any) { //cargar municipios por departamento 
    console.log(id);
    this.MunicipioService.getMunicipioByDepto(id)
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.MunicipioDDL = data.data;
          this.MunicipioDesactivado = false;
        }
      })
  }

  get form() {
    return this.validationform.controls;
  }

  regresar(){
    this.router.navigate(["casoslegales/empresa/listado"]);
  }

  validSubmit() {

    if (!this.validationform.valid) {
      this.submit = true;

      if (this.validationform.get('depa_Id')?.value != '' && this.validationform.get('muni_Id')?.value == '') {
        this.submitMunicipio = true;
      }

    }
    else {
      

      this.service.InsertarEmpresa(this.validationform.value)
        .subscribe((data: any) => {
          console.log(data.data.codeStatus)
          if (data.data.codeStatus == 1) {
            localStorage.setItem('EmpresaInsert', '1');
            this.router.navigate(["casoslegales/empresa/listado"]);
          }
          else if (data.data.codeStatus == 2) {
            this.mensajeWarning('Ya existe una empresa con ese nombre');
          }
          else if (data.data.codeStatus == 3) {
            this.mensajeWarning('Ya existe un empresa con ese RTN');
          }
        })
    }
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
}
