import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pantalla } from 'src/app/pages/models/acceso/pantalla';
import { rol } from 'src/app/pages/models/acceso/rol';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit{
  constructor(
    private router:Router,
    private rolService:RolService
  ){}
  
  breadCrumbItems!: Array<{}>;
  listadoPantallas: pantalla[] = [];
  rolModel: rol = new rol();

  ngOnInit(): void {
    if(parseInt(localStorage.getItem("role_IdDetalles") ?? '0', 0) === 0){
      this.router.navigate(["acceso/roles/listado"]);
    }
    
    this.rolModel.role_Id = parseInt(localStorage.getItem("role_IdDetalles") ?? '0');


    this.breadCrumbItems = [
      { label: 'Roles' },
      { label: 'Detalles', active: true }
    ];

    this.CargarPantallasPorIdRol(this.rolModel.role_Id, false);
    this.CargarRolById(this.rolModel.role_Id);

    localStorage.removeItem("role_IdDetalles");
  }

  CargarPantallasPorIdRol(role_Id: number, usua_EsAdmin: boolean) {
    this.rolService.getPantallasPorRolYAdmin(role_Id, usua_EsAdmin)
        .subscribe((data: any) => {
            if (data.code === 200) {
                this.listadoPantallas = data.data;
            }
        })
  }

  CargarRolById(role_Id: number){
    this.rolService.cargarRolById(role_Id)
    .subscribe((data:any) => {
      if(data.code === 200){
        if(data.data.role_Id > 0){
          this.rolModel = data.data;
          console.log(data.data);
        }
      }
    })
  }
}
