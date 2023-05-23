import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { estadosciviles } from 'src/app/pages/models/general/estadocivil';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class EstadocivilService {

  constructor(private http: HttpClient) { }


  getEstadosCiviles() {
    return this.http.get<estadosciviles[]>(API_URL + 'EstadosCiviles/Listado')
  }

  InsertEstadoCivil(esta: estadosciviles) {
    console.log(esta)
    return this.http.post(API_URL + 'EstadosCiviles/Insertar', esta)
  }

  EditarEstadoCivil(esta: estadosciviles) {
    return this.http.post(API_URL + 'EstadosCiviles/Editar', esta)
  }

  EliminarEstadoCivil(esta: estadosciviles) {
    return this.http.post(API_URL + 'EstadosCiviles/Eliminar', esta)
  }
}
