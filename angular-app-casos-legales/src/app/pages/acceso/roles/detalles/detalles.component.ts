import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
  listadoPantallasAcce: pantalla[] = [];
  listadoPantallasGral: pantalla[] = [];
  listadoPantallasCale: pantalla[] = [];

  searchTermAcce$ = new Subject<string>();
  searchTermGral$ = new Subject<string>();
  searchTermCale$ = new Subject<string>();

  pantallasFilteredAcce: pantalla[] = [];
  pantallasFilteredGral: pantalla[] = [];
  pantallasFilteredCale: pantalla[] = [];

  rolModel: rol = new rol();

  dateNow: Date = new Date();
  
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

    this.filterListAcce();
    this.filterListGral();
    this.filterListCale();
    
    localStorage.removeItem("role_IdDetalles");
  }

  busquedaGeneral(value:string) {
    this.searchTermAcce$.next(value);
    this.searchTermGral$.next(value);
    this.searchTermCale$.next(value);
  }

  filterListAcce(): void {
    this.searchTermAcce$.subscribe(term => {
      this.pantallasFilteredAcce = this.listadoPantallasAcce
      .filter(item => item.pant_Pantalla.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }

  filterListGral(): void {
    this.searchTermGral$.subscribe(term => {
      this.pantallasFilteredGral = this.listadoPantallasGral
      .filter(item => item.pant_Pantalla.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }

  filterListCale(): void {
    this.searchTermCale$.subscribe(term => {
      this.pantallasFilteredCale = this.listadoPantallasCale
      .filter(item => item.pant_Pantalla.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }


  CargarPantallasPorIdRol(role_Id: number, usua_EsAdmin: boolean) {
    this.rolService.getPantallasPorRolYAdmin(role_Id, usua_EsAdmin)
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.listadoPantallas = data.data;

          this.listadoPantallas.forEach(element => {

            if(element.pant_Esquema === "Acceso"){
                this.listadoPantallasAcce.push(element);
            }

            if(element.pant_Esquema === "General"){
                this.listadoPantallasGral.push(element);
            }

            if(element.pant_Esquema === "CasosLegales"){
                this.listadoPantallasCale.push(element);
            }
          });

          this.pantallasFilteredAcce = this.listadoPantallasAcce;
          this.pantallasFilteredGral = this.listadoPantallasGral;
          this.pantallasFilteredCale = this.listadoPantallasCale;
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
