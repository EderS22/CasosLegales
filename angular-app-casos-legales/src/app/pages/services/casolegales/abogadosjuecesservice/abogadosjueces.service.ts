import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { abogadosjueces } from 'src/app/pages/models/casoslegales/abogadosjueces';

const API_URL = GlobalComponent.API_URL;
@Injectable({
  providedIn: 'root'
})
export class AbogadosjuecesService {

  constructor(private http: HttpClient) { }

  getAbogados(){
    return this.http.get<abogadosjueces[]>(API_URL + 'AbogadosJueces/Listado')
  }

  EliminarAbogado(abog: abogadosjueces) {
    return this.http.post<abogadosjueces[]>(API_URL + 'AbogadosJueces/Eliminar', abog)
  }

  InsertarAbogado(abog: any){
    return this.http.post<abogadosjueces[]>(API_URL + 'AbogadosJueces/Insertar', abog)
  }

  BuscarAbogado(id:any){
    return this.http.get<abogadosjueces[]>(API_URL + 'AbogadosJueces/Buscar?id='+ id)
  }

  EditarAbogado(abog: any){
    return this.http.post<abogadosjueces[]>(API_URL + 'AbogadosJueces/Editar', abog)
  }

  
}
