import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../../../../pages/models/acceso/usuario';
import { UsuariosService } from '../../../services/acceso/usuario/usuarios.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})

export class DetallesComponent implements OnInit {

  constructor(
    private router: Router,
    private service: UsuariosService
  ) { }

  usuario: usuario = new usuario();
  breadCrumbItems!: Array<{}>;
  
  ngOnInit(): void {
    if(parseInt(localStorage.getItem("usua_IdDetalles") ?? '0', 0) === 0){
      this.router.navigate(["acceso/usuarios/listado"]);
    }

    this.breadCrumbItems = [
      { label: 'Usuarios' },
      { label: 'Detalles', active: true }
    ];
    
    this.service.getUsuarioEditar(parseInt(localStorage.getItem("usua_IdDetalles") ?? '0', 0))
    .subscribe((data: any) => {
        if (data.code === 200) {
            this.usuario = data.data;
        }
      })

    localStorage.removeItem("usua_IdDetalles");
  }

}
