import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { Observable } from 'rxjs';
import { tiposdeevidencia } from 'src/app/pages/models/casoslegales/tiposdeevidencia';


const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class TiposdeevidenciaService {

   constructor(private http:HttpClient) { }

  getTiposdeevidencia(){
    return this.http.get<tiposdeevidencia[]>(API_URL + 'TiposDeEvidencia/Listado');

}

deleteData(tiposdeevidencia: tiposdeevidencia): Observable<any> {
  return this.http.post<tiposdeevidencia[]>(API_URL + 'TiposDeEvidencia/Eliminar', tiposdeevidencia);
}
}
