import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})


export class DetallesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  breadCrumbItems!: Array<{}>;
  
  ngOnInit(): void {
    if(parseInt(localStorage.getItem("usua_IdDetalles") ?? '0', 0) === 0){
      this.router.navigate(["acceso/usuarios/listado"]);
    }

    this.breadCrumbItems = [
      { label: 'Usuarios' },
      { label: 'Detalles', active: true }
    ];
    
    localStorage.removeItem("usua_IdDetalles");
  }

}
