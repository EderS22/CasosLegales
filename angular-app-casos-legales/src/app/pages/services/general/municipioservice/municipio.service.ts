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

  getMunicipioByDepto(id: any) {
    return this.http.put<municipio[]>(API_URL + 'Municipios/MunicipioDDL?id='+id, null);
  }
}