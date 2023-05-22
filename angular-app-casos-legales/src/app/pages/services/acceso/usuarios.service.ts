import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { usuario } from '../../models/acceso/usuario';
import { empleado } from '../../models/casoslegales/empleados';
import { rol } from '../../models/acceso/rol';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    constructor(private http:HttpClient) { }

    getUsuarios(){
        return this.http.get<usuario[]>(API_URL + 'Usuarios/List');
    }

    getEmpleadosNoTienenUsuario(){
        return this.http.get<empleado[]>(API_URL + 'Usuarios/ListarEmpleadosNoTienenUsuario');
    }

    getListadoRoles(){
        return this.http.get<rol[]>(API_URL + 'Roles/List');
    }

    getUsuarioEditar(id: number){
        return this.http.get<usuario>(API_URL + `Usuarios/Find/${id}`);
    }

    validarUsernameExiste(username: string){
        return this.http.get(API_URL + `Usuarios/ValidarUsernameExiste/${username}`)
    }

    insertarNuevoUsuario(usuario: usuario){
        return this.http.post<usuario>(API_URL + 'Usuarios/Insert', usuario);
    }

    editarUsuario(usuario: usuario){
        return this.http.post<usuario>(API_URL + 'Usuarios/Update', usuario);
    }

    eliminarUsuario(usuario: usuario){
        return this.http.post(API_URL + `Usuarios/Delete`, usuario);
    }
}
