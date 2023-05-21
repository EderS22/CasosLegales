import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { UsuariosService } from '../../../services/acceso/usuarios.service';
import { usuario } from '../../../models/acceso/usuario';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {
  breadCrumbItems!: Array<{}>;
  usuarios!: usuario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: UsuariosService){}

  ngOnInit(): void {
    
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
        },
        columnDefs: [
            {
                targets: 6, 
                orderable: false,
            },
            {
                targets: 2, 
                orderable: false,
            },   
        ]
    };
    this.LoadUsuarios();

    this.breadCrumbItems = [
      { label: 'Usuarios' },
      { label: 'Listado', active: true }
    ];
  }

  LoadUsuarios(){
    this.service.getUsuarios().subscribe((data:any) => {
        if(data.code === 200){
          this.usuarios = data.data;
          this.dtTrigger.next(null);
        }
    })
  }
}
