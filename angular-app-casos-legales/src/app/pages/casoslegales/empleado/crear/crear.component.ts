import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/pages/services/casolegales/empleadoservice/empleado.service';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';
import { Router } from '@angular/router';

import { EstadoscivilesService } from 'src/app/pages/services/general/estadocivilservice/estadosciviles.service';
import { estadocivil } from 'src/app/pages/models/general/estadocivil';

import { MunicipioService } from 'src/app/pages/services/general/municipioservice/municipio.service';
import { municipio } from 'src/app/pages/models/general/municipios';

import { DepartamentoService } from 'src/app/pages/services/general/departamentoservice/departamento.service';
import { departamento } from 'src/app/pages/models/general/departeamento';



@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearComponent implements OnInit {

  empe: empleado = new empleado();

  EstadoCivilDLL! : estadocivil[]; //estdo civil ddl
  DepartamentoDLL! : departamento[]; //departamento ddl

  MunicipioDDL! : municipio[];// municipio ddl
  MunicipioDesactivado = true;

  breadCrumbItems!: Array<{}>;
  modelValueAsDate: Date = new Date(); // se usa para el calendario 

  constructor(
    private service: EmpleadoService,
    private EstadoCivilService : EstadoscivilesService,
    private DepartamentoService: DepartamentoService,
    private MunicipioService: MunicipioService,
    private router: Router
  ) { }



  ngOnInit(): void {

    this.EstadoCivilService.getEstadoCivil() //cargar estado civil
    .subscribe((data: any)=> {
      if(data.code === 200){
        this.EstadoCivilDLL= data.data;
      }
    })

    this.DepartamentoService.getDepartamentos() //cargar departamentos
    .subscribe((data: any)=> {
      if(data.code === 200){
        this.DepartamentoDLL= data.data;
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
    .subscribe((data: any)=>{
      if(data.code === 200){
        this.MunicipioDDL= data.data;
        this.MunicipioDesactivado = false;
      }
    })
  }
}
