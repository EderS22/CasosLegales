import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
    
    constructor(
        private rolService: RolService,
        private router: Router
    ) { }

    breadCrumbItems!: Array<{}>;
    dateNow: Date = new Date();
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

        const casoAllCorrect = localStorage.getItem("casoAllCorrect");

        if(casoAllCorrect){
            if(casoAllCorrect){
                this.mensajeSuccess("Caso agregado con exito");
            }else{
                this.mensajeError("Ocurrio un error al intentar agregar el caso")       
            }

            localStorage.removeItem("casoAllCorrect");
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
    }

    editarAgregarCaso(id:number){
        localStorage.setItem("caso_IdEditar", id.toString());
        this.router.navigate(["casoslegales/casos/agregareditar"]);
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
