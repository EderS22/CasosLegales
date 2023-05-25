import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { rol } from '../../../models/acceso/rol';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { pantalla } from 'src/app/pages/models/acceso/pantalla';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';

@Component({
    selector: 'app-listado',
    templateUrl: './listado.component.html',
    styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        private rolService: RolService,
        private formBuilder: UntypedFormBuilder,
        private router: Router
    ) { }

    @ViewChild(DataTableDirective, { static: false })
    dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    isEdit: boolean = false;
    rol_IdEliminar: number = 0;
    listadoRoles: rol [] = [];

    breadCrumbItems!: Array<{}>;

    dateNow: Date = new Date();
    
    ngOnInit(): void {
        if(!JSON.parse(localStorage.getItem("currentUser") || '').usua_EsAdmin){
            const ropaAcceso = new ropa();
            ropaAcceso.role_Id = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
            ropaAcceso.pant_Pantalla = "Roles";
            this.rolService.validarRolTienePantalla(ropaAcceso)
            .subscribe((data:any) => {
                if(data.code === 200){
                    if(data.data.codeStatus === 0){
                        this.router.navigate([""]);
                    }
                }
            })
        }

        this.breadCrumbItems = [
            { label: 'Roles' },
            { label: 'Listado', active: true }
        ];

        this.CargarRoles();
        
        this.dtOptions = {
            pagingType: 'simple_numbers',
            language: {
                url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
            },
            columnDefs: [
                {
                    targets: 3,
                    orderable: false,
                },
            ]
        };
    }

    CargarRoles() {
        this.rolService.getListadoRoles()
            .subscribe((data: any) => {
                if (data.code === 200) {
                    if (data.data.length > 0) {
                        this.listadoRoles = data.data;
                        this.dtTrigger.next(null);
                    }
                }
            })
    }
  
    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.CargarRoles();
        });
    }

    eliminarRol(id:number){
        const rolEliminar = new rol();

        rolEliminar.role_Id = id;
        rolEliminar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
   
        this.rolService.eliminarRol(rolEliminar)
        .subscribe((data:any) => {
            if(data.code === 200){
                if(data.data.codeStatus === 1){
                    this.rerender();
                    this.mensajeSuccess("Rol eliminado con éxito");
                }else{
                    this.mensajeError("Ocurrio un error al intentar eliminar el rol");
                }
            }else{
                this.mensajeError("Error relacionado con el servidor");
            }
        })
    }

    detallesRol(id:number){
        localStorage.setItem("role_IdDetalles", id.toString());
        this.router.navigate(["acceso/roles/detalles"]);
    }

    editarAgregarRol(id:number){
        localStorage.setItem("role_IdEditar", id.toString());
        this.router.navigate(["acceso/roles/agregareditar"]);
    }

    openEliminar(content: any, id: number) {
        this.rol_IdEliminar = id;

        this.rolService.validarUsuarioPoseeRol(id)
        .subscribe((data:any) => {
            if(data.code === 200){
                if(data.data.codeStatus === 1){
                    this.mensajeWarning('No se puede eliminar el rol por que hay usuarios que lo poseen');
                }else{
                    this.modalService.open(content, { centered: true, backdrop: 'static', keyboard: false });
                }
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
