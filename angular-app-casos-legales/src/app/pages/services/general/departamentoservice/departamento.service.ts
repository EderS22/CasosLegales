import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { departamento } from 'src/app/pages/models/general/departeamento';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }
  

  getDepartamentos(){
    return this.http.get<departamento[]>(API_URL + 'Departamentos/Listado')
  }

  InsertDepartameto(depto : departamento){
    return this.http.post(API_URL + 'Departamentos/Insertar' , depto)
  }


  

}

