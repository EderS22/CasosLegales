import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import { rol } from '../../../models/acceso/rol';
import { pantalla } from 'src/app/pages/models/acceso/pantalla';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root'
})

export class RolService {

    constructor(private http: HttpClient) { }

    getListadoRoles(){
        return this.http.get<rol[]>(API_URL + 'Roles/List');
    }

    getPantallasPorRolYAdmin(role_Id: number, usua_EsAdmin: boolean){
        return this.http.post<pantalla[]>(API_URL + 'Pantallas/ListadoPantallasPorIdRol', {}, {
            params: {
                role_Id: role_Id,
                usua_EsAdmin: usua_EsAdmin
            }
        });
    }

    insertarNuevoRol(rol: rol){
        return this.http.post(API_URL + 'Roles/InsertarNuevoRol', rol);
    }

    actualizarRol(rol: rol){
        return this.http.post(API_URL + 'Roles/ActualizarRol', rol); 
    }

    eliminarRol(rol: rol){
        return this.http.post(API_URL + 'Roles/EliminarRol', rol); 
    }

    validarRolexiste(role_Nombre: string){
        return this.http.post(API_URL + 'Roles/ValidarRolExiste', {}, {
            params: {
                role_Nombre: role_Nombre
            }
        })
    }

    insertarRopa(ropa:ropa){
        return this.http.post(API_URL + 'RolesPorPantalla/Insert', ropa);
    }

    eliminarPantallasdeRol(ropa:ropa){
        return this.http.post(API_URL + 'RolesPorPantalla/EliminarPantallasdeRol', ropa);
    }

    validarUsuarioPoseeRol(role_Id: number){
        return this.http.get(API_URL + `Usuarios/ValidarUsuariosPoseenRol/${role_Id}`);
    }

    cargarRolById(role_Id:number){
        return this.http.post(API_URL + 'Roles/BuscarRolPorId', {}, {
            params: {
                role_Id: role_Id
            }
        })
    }

    validarRolTienePantalla(ropa: ropa){
        return this.http.post(API_URL + 'RolesPorPantalla/ValidarRolTienePantalla', ropa);
    }
}
