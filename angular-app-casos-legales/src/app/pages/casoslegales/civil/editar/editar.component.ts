import { Component, OnInit } from '@angular/core';
import { CivilService } from 'src/app/pages/services/casolegales/civilesservice/civil.service';
import { civiles } from 'src/app/pages/models/casoslegales/civil';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EstadocivilService } from 'src/app/pages/services/general/estadocivilservice/estadocivil.service'; 
import { estadosciviles } from 'src/app/pages/models/general/estadocivil';

import { MunicipioService } from 'src/app/pages/services/general/municipioservice/municipio.service';
import { municipio } from 'src/app/pages/models/general/municipios';

import { DepartamentoService } from 'src/app/pages/services/general/departamentoservice/departamento.service';
import { departamento } from 'src/app/pages/models/general/departeamento';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})


export class EditarComponent {

  empe: civiles = new civiles();
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
    private service: CivilService,
    private EstadoCivilService: EstadocivilService,
    private DepartamentoService: DepartamentoService,
    private MunicipioService: MunicipioService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) 
  {
    this.validationform = this.formBuilder.group({
      civi_DNI: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      civi_Nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      civi_Apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      civi_Sexo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      civi_Telefono: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      civi_CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      civi_FechaNacimiento: ['', [Validators.required]],
      eciv_Id: [null, [Validators.required]],
      depa_Id: ['', [Validators.required]],
      muni_Id: ['', [Validators.required]],
      civi_Direccion: ['', [Validators.required]],
      civi_UsuModificacion: [1],
    });
  }

  ngOnInit(): void {


    if(localStorage.getItem('IdCivil') == '' || localStorage.getItem('IdCivil') == null)
    {
      this.router.navigate(["casoslegales/civil/listado"]);
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
      { label: 'Civiles' },
      { label: 'Editar', active: true }
    ];

    this.service.BuscarCivil(localStorage.getItem('IdCivil'))
    .subscribe((data: any) => {
     console.log(data);
     this.MunicipioService.getMunicipioByDepto(data.depa_Id)
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.MunicipioDDL = data.data;
          this.MunicipioDesactivado = false;
        }
      })
      this.validationform = this.formBuilder.group({
        civi_Id:        [data.civi_Id, [Validators.required]],
        civi_DNI:       [data.civi_DNI, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        civi_Nombres:   [data.civi_Nombres, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        civi_Apellidos: [data.civi_Apellidos, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        civi_Sexo:      [data.civi_Sexo, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        civi_Telefono:  [data.civi_Telefono, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        civi_CorreoElectronico: [data.civi_CorreoElectronico, [Validators.required, Validators.pattern('[a-zA-Z0-9@.áéíóúÁÉÍÓÚ]+')]],
        civi_FechaNacimiento:   [data.civi_FechaNacimiento, [Validators.required]],
        eciv_Id: [data.eciv_Id, [Validators.required]],
        depa_Id: [data.depa_Id, [Validators.required]],
        muni_Id: [data.muni_Id, [Validators.required]],
        civi_Direccion: [data.civi_Direccion, [Validators.required]],
        civi_UsuModificacion: [1],
      });

      
    })
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
    localStorage.setItem('IdCivil', '');
    this.router.navigate(["casoslegales/civil/listado"]);
  }

  
  validSubmit() {

    if (!this.validationform.valid) {
      this.submit = true;
      if (this.validationform.get('depa_Id')?.value != null && this.validationform.get('muni_Id')?.value == null) {
        this.submitMunicipio = true;
      }

    }
    else {
      var fechaControl = this.validationform.get('civi_FechaNacimiento');
      var fechaFormateada = '';

      if (fechaControl?.value) {
        var fecha = new Date(fechaControl.value);

        if (!isNaN(fecha.getTime())) {
          var dia = fecha.getDate();
          var mes = fecha.getMonth() + 1;
          var anio = fecha.getFullYear();

          fechaFormateada = anio + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
        }
      }

      this.validationform.get('civi_FechaNacimiento')?.setValue(fechaFormateada);

      this.service.EditarCivil(this.validationform.value)
        .subscribe((data: any) => {
          if (data.data.codeStatus == 1) {
            localStorage.setItem('CivilInsert', '2');
            localStorage.setItem('IdCivil', '');
            this.router.navigate(["casoslegales/civil/listado"]);
          }
          else if (data.data.codeStatus == 11) {
            this.mensajeWarning('Ya existe un Civil con ese DNI');
          }
          else if (data.data.codeStatus == 12) {
            this.mensajeWarning('Ya existe un Civil con ese correo electronico');
          }
          else if (data.data.codeStatus == 13) {
            this.mensajeWarning('Ya existe un Civil con ese numero de telefono');
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
