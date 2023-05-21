import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { usuario } from '../../models/acceso/usuario';


const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    constructor(private http:HttpClient) { }

    getUsuarios(){
        return this.http.get<usuario[]>(API_URL + 'Usuarios/List');
    }
}
