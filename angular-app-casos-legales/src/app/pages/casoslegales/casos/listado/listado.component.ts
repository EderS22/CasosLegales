import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { Caso } from 'src/app/pages/models/casoslegales/Caso';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import { CasosService } from 'src/app/pages/services/casolegales/casos/casos.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
    
    constructor(
        private casoService: CasosService,
        private rolService: RolService,
        private router: Router
    ) { }

    breadCrumbItems!: Array<{}>;
    dateNow: Date = new Date();

    ListadoCasos: Caso[] = [];
    ListadoCasosFiltered: Caso[] = [];

    searchTerm$ = new Subject<string>();

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    ngOnInit(): void {
        if (!JSON.parse(localStorage.getItem("currentUser") || '').usua_EsAdmin) {
            const ropaAcceso = new ropa();
            ropaAcceso.role_Id = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
            ropaAcceso.pant_Pantalla = "Casos";
            this.rolService.validarRolTienePantalla(ropaAcceso)
                .subscribe((data: any) => {
                    if (data.code === 200) {
                        if (data.data.codeStatus === 0) {
                            this.router.navigate([""]);
                        }
                    }
                })
        }

        const casoAllCorrectEdit = localStorage.getItem("casoAllCorrectEdit");
        const casoAllCorrect = localStorage.getItem("casoAllCorrect");

        if(casoAllCorrect){
            if(casoAllCorrect){
                this.mensajeSuccess("Caso agregado con exito");
            }else{
                this.mensajeError("Ocurrio un error al intentar agregar el caso")       
            }

            localStorage.removeItem("casoAllCorrect");
        }

        if(casoAllCorrectEdit){
            if(casoAllCorrectEdit){
                this.mensajeSuccess("Caso editado con exito");
            }else{
                this.mensajeError("Ocurrio un error al intentar editar el caso")       
            }

            localStorage.removeItem("casoAllCorrectEdit");
        }

        this.breadCrumbItems = [
            { label: 'Casos' },
            { label: 'Listado', active: true }
        ];

        this.dtOptions = {
            pagingType: 'simple_numbers',
            language: {
                url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
            },
            columnDefs: [
                {
                    targets: 0,
                    orderable: false,
                },
            ]
        };

        this.casoService.getListadoCasos()
        .subscribe((data:any) => {
            if(data.code === 200){
                this.ListadoCasos = data.data;
                this.ListadoCasosFiltered = data.data;
            }
        })

        this.filterList();
    }

    filterList(): void {
        this.searchTerm$.subscribe(term => {
            this.ListadoCasosFiltered = this.ListadoCasos
            .filter(item => item.caso_Fecha.toString().toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.caso_Descripcion.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.abju_DNI.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.abju_Nombres.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.abju_Apellidos.toLowerCase().indexOf(term.toLowerCase()) >= 0);
        });
    }

    editarAgregarCaso(id:number){
        localStorage.setItem("caso_IdEditar", id.toString());
        this.router.navigate(["casoslegales/casos/agregareditar"]);
    }

    reporteCaso(id:number){
        localStorage.setItem("caso_IdReporte", id.toString());
        this.router.navigate(["reportes/reporte/reportecaso"]);
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
