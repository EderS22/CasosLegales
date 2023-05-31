import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CivilService } from 'src/app/pages/services/casolegales/civilesservice/civil.service';
import { civiles } from 'src/app/pages/models/casoslegales/civil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {
  civi: civiles = new civiles();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  breadCrumbItems!: Array<{}>;
  ListadoCiviles!: civiles[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dateNow: Date = new Date();

  constructor(
    private service: CivilService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('CivilInsert') == '1'){
      this.mensajeSuccess('Civil Ingresado Correctamente');
      localStorage.setItem('CivilInsert','');
    }
    else if (localStorage.getItem('CivilInsert') == '2'){
      this.mensajeSuccess('Civil Editado Correctamente');
      localStorage.setItem('CivilInsert','');
    }

    this.dtOptions = {
      pagingType: 'simple_numbers',
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

    this.loadCiviles();

    this.breadCrumbItems = [
      { label: 'Civiles' },
      { label: 'Listado', active: true }
    ];
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getCiviles().subscribe((data: any) => {
        if (data.code === 200) {
          this.ListadoCiviles = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  loadCiviles() {
    this.service.getCiviles().subscribe((data: any) => {
      if (data.code === 200) {
        this.ListadoCiviles = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  InsertarCivil() {
    this.router.navigate(["casoslegales/civil/crear"]);
  }

  IdEditarCivil(Id: any){
    localStorage.setItem('IdCivil', Id);
    this.router.navigate(["casoslegales/civil/editar"]);
  }

  optenerIdEliminar(e: civiles , contentDelete: any) {
    this.civi = e;
    this.openModalDelet(contentDelete)
  }

  openModalDelet(contentDelete: any) {
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  MandarDatosEliminar() {
    this.service.EliminarCivil(this.civi)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.mensajeSuccess('Civil Eliminado Correctamente');
          this.modalService.dismissAll();
          this.rerender();
        }
        else if (data.data.codeStatus == 2) {
          this.mensajeWarning('No es posible eliminar el registro, ya que el mismo está siendo utilizado por otra tabla');
        }
        else {
          this.mensajeError('Ups, Algo Salio Mal!!');
        }
      })
  }
  
  mensajeSuccess(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeWarning(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  mensajeError(messageBody: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: messageBody,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}