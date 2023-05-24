import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { cargos } from 'src/app/pages/models/general/cargo';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }


  getCargos() {
    return this.http.get<cargos[]>(API_URL + 'Cargo/Listado')
  }

  InsertCargo(carg: cargos) {
    console.log(carg)
    return this.http.post(API_URL + 'Cargo/Insertar', carg)
  }

  EditarCargo(carg: cargos) {
    return this.http.post(API_URL + 'Cargo/Editar', carg)
  }

  EliminarCargo(carg: cargos) {
    return this.http.post(API_URL + 'Cargo/Eliminar', carg)
  }
}
