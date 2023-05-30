import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/pages/services/casolegales/empleadoservice/empleado.service';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';
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
    private EstadoCivilService: EstadocivilService,
    private DepartamentoService: DepartamentoService,
    private MunicipioService: MunicipioService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) 
  {
    this.validationform = this.formBuilder.group({
      empe_DNI: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      empe_Nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      empe_Apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      empe_Sexo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      empe_Telefono: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      empe_CorreoElectronico: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]@.áéíóúÁÉÍÓÚ]+')]],
      empe_FechaNacimiento: ['', [Validators.required]],
      eciv_Id: [null, [Validators.required]],
      depa_Id: ['', [Validators.required]],
      muni_Id: ['', [Validators.required]],
      empe_Direccion: ['', [Validators.required]],
      empe_UsuModificacion: [1],
    });
  }

  ngOnInit(): void {


    if(localStorage.getItem('IdEmpleado') == '' || localStorage.getItem('IdEmpleado') == null)
    {
      this.router.navigate(["casoslegales/empleado/listado"]);
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
      { label: 'Empleados' },
      { label: 'Editar', active: true }
    ];

    this.service.BuscarEmpleado(localStorage.getItem('IdEmpleado'))
    .subscribe((data: any) => {
      console.log(data);
      this.validationform = this.formBuilder.group({
        empe_Id:        [data.empe_Id, [Validators.required]],
        empe_DNI:       [data.empe_DNI, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        empe_Nombres:   [data.empe_Nombres, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        empe_Apellidos: [data.empe_Apellidos, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        empe_Sexo:      [data.empe_Sexo, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        empe_Telefono:  [data.empe_Telefono, [Validators.required, Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ]+')]],
        empe_CorreoElectronico: [data.empe_CorreoElectronico, [Validators.required, Validators.pattern('[a-zA-Z0-9@.áéíóúÁÉÍÓÚ]+')]],
        empe_FechaNacimiento:   [data.empe_FechaNacimiento, [Validators.required]],
        eciv_Id: [data.eciv_Id, [Validators.required]],
        depa_Id: [data.depa_Id, [Validators.required]],
        muni_Id: [data.muni_Id, [Validators.required]],
        empe_Direccion: [data.empe_Direccion, [Validators.required]],
        empe_UsuModificacion: [1],
      });

      this.MunicipioService.getMunicipioByDepto(data.depa_Id)
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.MunicipioDDL = data.data;
          this.MunicipioDesactivado = false;
        }
      })


      
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
    localStorage.setItem('IdEmpleado', '');
    this.router.navigate(["casoslegales/empleado/listado"]);
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

      this.service.EditarEmpleado(this.validationform.value)
        .subscribe((data: any) => {
          if (data.data.codeStatus == 1) {
            localStorage.setItem('EMpleadoInsert', '2');
            localStorage.setItem('IdEmpleado', '');
            this.router.navigate(["casoslegales/empleado/listado"]);
          }
          else if (data.data.codeStatus == 11) {
            this.mensajeWarning('Ya existe un Empleado con ese DNI');
          }
          else if (data.data.codeStatus == 12) {
            this.mensajeWarning('Ya existe un Empleado con ese correo electronico');
          }
          else if (data.data.codeStatus == 13) {
            this.mensajeWarning('Ya existe un Empleado con ese numero de telefono');
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
