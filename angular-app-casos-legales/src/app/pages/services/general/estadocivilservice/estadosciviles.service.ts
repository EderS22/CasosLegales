import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { estadocivil } from 'src/app/pages/models/general/estadocivil';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class EstadoscivilesService {

  constructor(private http: HttpClient) { }

  getEstadoCivil() {
    return this.http.get<estadocivil[]>(API_URL + 'EstadosCiviles/Listado')
  }
}
