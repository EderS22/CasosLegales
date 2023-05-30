import { Component, OnInit } from '@angular/core';
import { AbogadosjuecesService } from 'src/app/pages/services/casolegales/abogadosjuecesservice/abogadosjueces.service';
import { abogadosjueces } from 'src/app/pages/models/casoslegales/abogadosjueces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CargoService } from 'src/app/pages/services/general/cargosservice/cargo.service';
import { cargos } from 'src/app/pages/models/general/cargo';

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

  abogado: abogadosjueces = new abogadosjueces();
  validationform!: UntypedFormGroup;
  submit!: boolean;
  submitMunicipio!: boolean;

  CargosDll!: cargos[]; //cargos dll
  EstadoCivilDLL!: estadosciviles[]; //estdo civil ddl
  DepartamentoDLL!: departamento[]; //departamento ddl

  MunicipioDDL!: municipio[];// municipio ddl
  MunicipioDesactivado = true;

  breadCrumbItems!: Array<{}>;
  modelValueAsDate: Date = new Date(); // se usa para el calendario 

  constructor(
    private service: AbogadosjuecesService,
    private CargosService: CargoService,
    private EstadoCivilService: EstadocivilService,
    private DepartamentoService: DepartamentoService,
    private MunicipioService: MunicipioService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) 
  {
    this.validationform = this.formBuilder.group({
      abju_DNI: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      abju_Nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      abju_Apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      abju_Sexo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      abju_Telefono: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      abju_CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      abju_FechaNacimiento: ['', [Validators.required]],
      eciv_Id: [null, [Validators.required]],
      carg_Id: [null, [Validators.required]],
      depa_Id: ['', [Validators.required]],
      muni_Id: ['', [Validators.required]],
      abju_Direccion: ['', [Validators.required]],
      abju_UsuModificacion: [1],
    });
  }

  ngOnInit(): void {


    if(localStorage.getItem('IdAbogado') == '' || localStorage.getItem('IdAbogado') == null)
    {
      this.router.navigate(["casoslegales/abogadosjueces/listado"]);
    }
 
    this.CargosService.getCargos() //cargar estado civil
    .subscribe((data: any) => {
      if (data.code === 200) {
        this.CargosDll = data.data;
      }
    })

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
      { label: 'Empleados' },
      { label: 'Editar', active: true }
    ];

    this.service.BuscarAbogado(localStorage.getItem('IdCivil'))
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
        abju_Id:        [data.abju_Id, [Validators.required]],
        abju_DNI:       [data.abju_DNI, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        abju_Nombres:   [data.abju_Nombres, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        abju_Apellidos: [data.abju_Apellidos, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        abju_Sexo:      [data.abju_Sexo, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        abju_Telefono:  [data.abju_Telefono, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        abju_CorreoElectronico: [data.abju_CorreoElectronico, [Validators.required, Validators.pattern('[a-zA-Z0-9@.áéíóúÁÉÍÓÚ]+')]],
        abju_FechaNacimiento:   [data.abju_FechaNacimiento, [Validators.required]],
        eciv_Id: [data.eciv_Id, [Validators.required]],
        carg_Id: [data.carg_Id, [Validators.required]],
        depa_Id: [data.depa_Id, [Validators.required]],
        muni_Id: [data.muni_Id, [Validators.required]],
        abju_Direccion: [data.abju_Direccion, [Validators.required]],
        abju_UsuModificacion: [1],
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
    localStorage.setItem('IdAbogado', '');
    this.router.navigate(["casoslegales/abogadosjueces/listado"]);
  }

  
  validSubmit() {

    if (!this.validationform.valid) {
      this.submit = true;
      if (this.validationform.get('depa_Id')?.value != null && this.validationform.get('muni_Id')?.value == null) {
        this.submitMunicipio = true;
      }

    }
    else {
      var fechaControl = this.validationform.get('abju_FechaNacimiento');
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

      this.validationform.get('abju_FechaNacimiento')?.setValue(fechaFormateada);

      this.service.EditarAbogado(this.validationform.value)
        .subscribe((data: any) => {
          if (data.data.codeStatus == 1) {
            localStorage.setItem('AbogadoInsert', '2');
            localStorage.setItem('IdAbogado', '');
            this.router.navigate(["casoslegales/abogadosjueces/listado"]);
          }
          else if (data.data.codeStatus == 11) {
            this.mensajeWarning('Ya existe un Abogado o Juez con ese DNI');
          }
          else if (data.data.codeStatus == 12) {
            this.mensajeWarning('Ya existe un Abogado o Juez con ese correo electronico');
          }
          else if (data.data.codeStatus == 13) {
            this.mensajeWarning('Ya existe un Abogado o Juez con ese numero de telefono');
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
