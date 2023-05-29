import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { civiles } from 'src/app/pages/models/casoslegales/civil';

const API_URL = GlobalComponent.API_URL;
@Injectable({
  providedIn: 'root'
})
export class CivilService {

  constructor(private http: HttpClient) { }

  getCiviles(){
    return this.http.get<civiles[]>(API_URL + 'Civiles/Listado')
  }

  EliminarCivil(civil: civiles) {
    return this.http.post<civiles[]>(API_URL + 'Civiles/Eliminar', civil)
  }

  InsertarCivil(civil: any){
    return this.http.post<civiles[]>(API_URL + 'Civiles/Insertar', civil)
  }

  BuscarCivil(id:any){
    return this.http.get<civiles[]>(API_URL + 'Civiles/Buscar?id='+ id)
  }

  EditarCivil(civil: any){
    return this.http.post<civiles[]>(API_URL + 'Civiles/Editar', civil)
  }

  
}