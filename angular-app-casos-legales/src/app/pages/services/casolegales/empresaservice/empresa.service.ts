import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { empresa } from 'src/app/pages/models/casoslegales/empresa';


const API_URL = GlobalComponent.API_URL;
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  
  getempresas(){
    return this.http.get<empresa[]>(API_URL + 'Empresas/Listado')
  }

  EliminarEmpreasa(Empresa: any) {
    return this.http.post<empresa[]>(API_URL + 'Empresas/Eliminar', Empresa)
  }

  InsertarEmpresa(empresas: any){
    return this.http.post<empresa[]>(API_URL + 'Empresas/Insertar', empresas)
  }

  BuscarEmpleado(id:any){
    return this.http.get<empresa[]>(API_URL + 'Empresas/Buscar?id='+ id)
  }

  EditarEmpleado(empresas: any){
    return this.http.post<empresa[]>(API_URL + 'Empresas/Editar', empresas)
  }
}
