import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { Observable } from 'rxjs';
import { municipio } from 'src/app/pages/models/general/municipios'; 


const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }

  getMunicipios() {
    return this.http.get<municipio[]>(API_URL + 'Municipios/Listado');

  }
  InsertMunicipio(muni: municipio) {
    return this.http.post(API_URL + 'Municipios/Insertar', muni)
  }

  EditarMunicipio(muni: municipio) {
    return this.http.post(API_URL + 'Municipios/Editar', muni)
  }

  EliminarMunicipio(muni: municipio) {
    return this.http.post(API_URL + 'Municipios/Eliminar', muni)
  }
}