import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { Observable } from 'rxjs';
import { tiposdecaso } from 'src/app/pages/models/casoslegales/tiposdecaso';


const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class TiposdecasoService { 

  constructor(private http:HttpClient) { }

  getTiposdecaso(){
    return this.http.get<tiposdecaso[]>(API_URL + 'TiposDeCaso/Listado');

}

deleteData(tiposdecaso: tiposdecaso): Observable<any> {
  return this.http.post<tiposdecaso[]>(API_URL + 'TiposDeCaso/Eliminar', tiposdecaso);
}
}
