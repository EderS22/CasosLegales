import { Component } from '@angular/core';
import { EmpleadoService } from 'src/app/pages/services/casolegales/empleadoservice/empleado.service';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {

  breadCrumbItems!: Array<{}>;
  ListadoEmpleado!: empleado[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private service: EmpleadoService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
      },
      columnDefs: [
        {
          targets: 4,
          orderable: false,
        },
      ]
    };

    this.loadEmpleados();

    this.breadCrumbItems = [
      { label: 'Empleados' },
      { label: 'Listado', active: true }
    ];
  }

  loadEmpleados() {
    this.service.getempleados().subscribe((data: any) => {
      if (data.code === 200) {
        this.ListadoEmpleado = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  InsertarUsuario() {
    this.router.navigate(["casoslegales/empleado/crear"]);
  }

}
