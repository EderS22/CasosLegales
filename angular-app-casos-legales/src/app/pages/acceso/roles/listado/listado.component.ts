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
    pantallasValid: boolean = true;
    submitted = false;
    rolForm!: UntypedFormGroup;
    breadCrumbItems!: Array<{}>;
    listadoRoles: rol[] = [];
    listadoPantallas: pantalla[] = [];
    pantallasTemp: pantalla[] = [];
    pantallasIdsSelects: number[] = [];
    allCorrect: boolean = true;

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

        this.CargarRoles();
        this.CargarPantallasPorIdRol(0, true);

        this.rolForm = this.formBuilder.group({
            role_Id: [0],
            role_Nombre: ['', [Validators.required]],
            role_Descripcion: ['', [Validators.required]]
        });
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

    CargarPantallasPorIdRol(role_Id: number, usua_EsAdmin: boolean) {
        this.rolService.getPantallasPorRolYAdmin(role_Id, usua_EsAdmin)
            .subscribe((data: any) => {
                if (data.code === 200) {
                    this.listadoPantallas = data.data;

                    this.listadoPantallas.forEach(element => {
                        this.rolForm.addControl(`pant_${element.pant_Id}`, new FormControl(false))
                    });
                }
            })
    }

    get form() {
        return this.rolForm.controls;
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            this.CargarRoles();
        });
    }

    onSubmit() {
        this.submitted = true;
        this.pantallasIdsSelects = [];
        this.allCorrect = true;

        this.listadoPantallas.forEach(element => {
            if (this.form[`pant_${element.pant_Id}`].value) {
                this.pantallasIdsSelects.push(element.pant_Id);
            }
        })

        if(this.pantallasIdsSelects.length > 0){
            this.pantallasValid = true;

            if (this.rolForm.valid) {
                if (this.isEdit) {
                    this.rolService.validarRolexiste(this.form['role_Nombre'].value)
                        .subscribe((response: any) => {
                            if (response.code === 200) {
                                if (response.data.codeStatus > 0) {
                                    if (response.data.codeStatus === this.form['role_Id'].value) {
                                        const rolEditar = new rol();
                                        rolEditar.role_Id = this.form['role_Id'].value;
                                        rolEditar.role_Nombre = this.form['role_Nombre'].value;
                                        rolEditar.role_Descripcion = this.form['role_Descripcion'].value;
                                        rolEditar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
                                        
                                        this.rolService.actualizarRol(rolEditar)
                                            .subscribe((respuesta: any) => {
                                                if (respuesta.code === 200) {
                                                    const ropaEliminar = new ropa();
    
                                                    ropaEliminar.role_Id = this.form['role_Id'].value;
                                                    ropaEliminar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
    
                                                    this.rolService.eliminarPantallasdeRol(ropaEliminar)
                                                        .subscribe((data: any) => {
                                                            if (data.code === 200) {
                                                                if (data.data.codeStatus === 1) {
                                                                    this.pantallasIdsSelects.forEach(element => {
                                                                        const ropaInsert = new ropa();
    
                                                                        ropaInsert.role_Id = this.form['role_Id'].value;
                                                                        ropaInsert.pant_Id = element;
                                                                        ropaInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
    
                                                                        this.rolService.insertarRopa(ropaInsert).subscribe((data2: any) => {
                                                                            if (data2.code === 200) {
                                                                                if (data2.data.codeStatus !== 1) {
                                                                                    this.allCorrect = false;
                                                                                }
                                                                            }
                                                                        })
                                                                    });
    
                                                                    if (this.allCorrect) {
                                                                        this.modalService.dismissAll();
                                                                        this.rerender();
                                                                        this.mensajeSuccess('Rol editado con éxito');
                                                                    } else {
                                                                        this.mensajeError('Ocurrio un error al intentar editar el rol');
                                                                    }
                                                                }
                                                            } else {
                                                                this.mensajeError('Ocurrio un error al intentar editar el rol');
                                                            }
                                                        })
                                                }
                                            })
                                    } else {
                                        this.mensajeWarning('El nombre del rol ya existe');
                                    }
                                }else{
                                    const rolEditar = new rol();
                                    rolEditar.role_Id = this.form['role_Id'].value;
                                    rolEditar.role_Nombre = this.form['role_Nombre'].value;
                                    rolEditar.role_Descripcion = this.form['role_Descripcion'].value;

                                    this.rolService.actualizarRol(rolEditar)
                                        .subscribe((respuesta: any) => {
                                            if (respuesta.code === 200) {
                                                const ropaEliminar = new ropa();

                                                ropaEliminar.role_Id = this.form['role_Id'].value;
                                                ropaEliminar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                                this.rolService.eliminarPantallasdeRol(ropaEliminar)
                                                    .subscribe((data: any) => {
                                                        if (data.code === 200) {
                                                            if (data.data.codeStatus === 1) {
                                                                this.pantallasIdsSelects.forEach(element => {
                                                                    const ropaInsert = new ropa();

                                                                    ropaInsert.role_Id = this.form['role_Id'].value;
                                                                    ropaInsert.pant_Id = element;
                                                                    ropaInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                                                    this.rolService.insertarRopa(ropaInsert).subscribe((data2: any) => {
                                                                        if (data2.code === 200) {
                                                                            if (data2.data.codeStatus !== 1) {
                                                                                this.allCorrect = false;
                                                                            }
                                                                        }
                                                                    })
                                                                });

                                                                if (this.allCorrect) {
                                                                    this.modalService.dismissAll();
                                                                    this.rerender();
                                                                    this.mensajeSuccess('Rol editado con éxito');
                                                                } else {
                                                                    this.mensajeError('Ocurrio un error al intentar editar el rol');
                                                                }
                                                            }
                                                        } else {
                                                            this.mensajeError('Ocurrio un error al intentar editar el rol');
                                                        }
                                                    })
                                            }
                                        })
                                }
                            }
                        })
                } else {
                    this.rolService.validarRolexiste(this.form['role_Nombre'].value)
                        .subscribe((response: any) => {
                            if (response.code === 200) {
                                if (response.data.codeStatus > 0) {
                                    this.mensajeWarning('El nombre del rol ya existe');
                                } else {
                                    const rolInsert = new rol();
    
                                    rolInsert.role_Nombre = this.form['role_Nombre'].value;
                                    rolInsert.role_Descripcion = this.form['role_Descripcion'].value;
                                    rolInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
    
                                    this.rolService.insertarNuevoRol(rolInsert)
                                        .subscribe((data: any) => {
                                            if (data.code === 200) {
                                                if (data.data.codeStatus > 0) {
                                                    this.pantallasIdsSelects.forEach(element => {
                                                        const ropaInsert = new ropa();
    
                                                        ropaInsert.role_Id = data.data.codeStatus;
                                                        ropaInsert.pant_Id = element;
                                                        ropaInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
    
                                                        this.rolService.insertarRopa(ropaInsert).subscribe((data2: any) => {
                                                            if (data2.code === 200) {
                                                                if (data2.data.codeStatus !== 1) {
                                                                    this.allCorrect = false;
                                                                }
                                                            }
                                                        })
                                                    });
    
                                                    if (this.allCorrect) {
                                                        this.modalService.dismissAll();
                                                        this.rerender();
                                                        this.mensajeSuccess('Rol añadido con éxito');
                                                    } else {
                                                        this.mensajeError('Ocurrio un error al intentar agregar el rol');
                                                    }
                                                }
                                            } else {
                                                this.mensajeError('Ocurrio un error al intentar editar el rol');
                                            }
                                        })
                                }
                            }
                        })
                }
            }       
        }else{
            this.pantallasValid = false;
        }
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

    openModalRol(content: any, data: any) {
        this.submitted = false;
        this.rolForm.reset();
        this.pantallasValid = true;

        if (data.role_Id > 0) {
            this.isEdit = true;
            this.form['role_Id'].setValue(data.role_Id);
            this.form['role_Nombre'].setValue(data.role_Nombre);
            this.form['role_Descripcion'].setValue(data.role_Descripcion);

            this.rolService.getPantallasPorRolYAdmin(data.role_Id, false)
                .subscribe((datos: any) => {
                    if (datos.code === 200) {
                        this.pantallasTemp = datos.data;

                        this.pantallasTemp.forEach(elemento => {
                            this.rolForm.setControl(`pant_${elemento.pant_Id}`, new FormControl(true))
                        });
                    }
                })
        }else{
            this.isEdit = false;
        }

        this.modalService.open(content, { centered: true, backdrop: 'static', size: 'lg', keyboard: false });
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
