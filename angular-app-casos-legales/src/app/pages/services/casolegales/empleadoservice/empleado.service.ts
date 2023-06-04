import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';

const API_URL = GlobalComponent.API_URL;
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  getempleados(){
    return this.http.get<empleado[]>(API_URL + 'Empleados/Listado')
  }

  EliminarEmpleados(empleado: empleado) {
    return this.http.post<empleado[]>(API_URL + 'Empleados/Eliminar', empleado)
  }

  InsertarEmpleados(empleado: any){
    return this.http.post<empleado[]>(API_URL + 'Empleados/Insertar', empleado)
  }

  BuscarEmpleado(id:any){
    return this.http.get<empleado[]>(API_URL + 'Empleados/Buscar?id='+ id)
  }

  EditarEmpleado(empleado: any){
    return this.http.post<empleado[]>(API_URL + 'Empleados/Editar', empleado)
  }

  prueba(){
    return this.http.get<[]>('https://jsonplaceholder.typicode.com/albums/1/photos')
  }

}
