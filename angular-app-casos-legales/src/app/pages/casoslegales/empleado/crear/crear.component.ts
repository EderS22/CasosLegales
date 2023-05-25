import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/pages/services/casolegales/empleadoservice/empleado.service';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EstadoscivilesService } from 'src/app/pages/services/general/estadocivilservice/estadosciviles.service';
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

export class CrearComponent implements OnInit {

  empe: empleado = new empleado();
  validationform!: UntypedFormGroup;
  submit!: boolean;
  submitMunicipio!: boolean;

  EstadoCivilDLL!: estadosciviles[]; //estdo civil ddl
  DepartamentoDLL!: departamento[]; //departamento ddl

  MunicipioDDL!: municipio[];// municipio ddl
  MunicipioDesactivado = true;

  breadCrumbItems!: Array<{}>;
  modelValueAsDate: Date = new Date(); // se usa para el calendario 

  constructor(
    private service: EmpleadoService,
    private EstadoCivilService: EstadoscivilesService,
    private DepartamentoService: DepartamentoService,
    private MunicipioService: MunicipioService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) {
    this.validationform = this.formBuilder.group({
      empe_DNI: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      empe_Nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      empe_Apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      empe_Sexo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      empe_Telefono: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      empe_CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      empe_FechaNacimiento: ['', [Validators.required]],
      eciv_Id: [null, [Validators.required]],
      depa_Id: ['', [Validators.required]],
      muni_Id: ['', [Validators.required]],
      empe_Direccion: ['', [Validators.required]],
      empe_UsuCreacion: [1],
    });
  }

  ngOnInit(): void {

    this.EstadoCivilService.getEstadoCivil() //cargar estado civil
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

  validSubmit() {

    if (!this.validationform.valid) {
      this.submit = true;
      if (this.validationform.get('depa_Id')?.value != null && this.validationform.get('muni_Id')?.value == null) {
        this.submitMunicipio = true;
      }

    }
    else {
      var fechaControl = this.validationform.get('empe_FechaNacimiento');
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

      this.validationform.get('empe_FechaNacimiento')?.setValue(fechaFormateada);

      this.service.InsertarEmpleados(this.validationform.value)
        .subscribe((data: any) => {
          if (data.data.codeStatus == 1) {
            this.router.navigate(["casoslegales/empleado/listado"]);
          }
          else if (data.data.codeStatus == 2) {
            this.mensajeWarning('Ya existe un Empleado con ese DNI');
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
