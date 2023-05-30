import { Component, ViewChild } from '@angular/core';
import { AbogadosjuecesService } from 'src/app/pages/services/casolegales/abogadosjuecesservice/abogadosjueces.service';
import { abogadosjueces } from 'src/app/pages/models/casoslegales/abogadosjueces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {
  abogado: abogadosjueces = new abogadosjueces();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  breadCrumbItems!: Array<{}>;
  ListadoAbogados!: abogadosjueces[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dateNow: Date = new Date();

  constructor(
    private service: AbogadosjuecesService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('AbogadoInsert') == '1'){
      this.mensajeSuccess('AbogadoJuez Ingresado Correctamente');
      localStorage.setItem('AbogadoInsert','');
    }
    else if (localStorage.getItem('AbogadoInsert') == '2'){
      this.mensajeSuccess('Abogado Editado Correctamente');
      localStorage.setItem('AbogadoInsert','');
    }

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

    this.loadAbogados();

    this.breadCrumbItems = [
      { label: 'AbogadosJueces' },
      { label: 'Listado', active: true }
    ];
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.service.getAbogados().subscribe((data: any) => {
        if (data.code === 200) {
          this.ListadoAbogados = data.data;
          this.dtTrigger.next(null);
        }
      })
    });
  }

  loadAbogados() {
    this.service.getAbogados().subscribe((data: any) => {
      if (data.code === 200) {
        this.ListadoAbogados = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  InsertarAbogado() {
    this.router.navigate(["casoslegales/abogadosjueces/crear"]);
  }

  IdEditarAbogado(Id: any){
    localStorage.setItem('IdAbogado', Id);
    this.router.navigate(["casoslegales/abogadosjueces/editar"]);
  }

  optenerIdEliminar(e: abogadosjueces , contentDelete: any) {
    this.abogado = e;
    this.openModalDelet(contentDelete)
  }

  openModalDelet(contentDelete: any) {
    this.modalService.open(contentDelete, { size: 'md', centered: true, backdrop: 'static' });
  }

  MandarDatosEliminar() {
    this.service.EliminarAbogado(this.abogado)
      .subscribe((data: any) => {
        if (data.data.codeStatus == 1) {
          this.mensajeSuccess('Abogado Eliminado Correctamente');
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