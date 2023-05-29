import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregareditar',
  templateUrl: './agregareditar.component.html',
  styleUrls: ['./agregareditar.component.scss']
})
export class AgregareditarComponent implements OnInit {

    constructor(
        private rolService: RolService,
        private formBuilder: UntypedFormBuilder,
        private router: Router
    ) { }
    
    breadCrumbItems!: Array<{}>;
    dateNow: Date = new Date();
    isEdit: boolean = false;
    caso_IdEditar: number = 0;
    submitted: boolean = false;
    casoForm!: UntypedFormGroup;

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

        this.caso_IdEditar = parseInt(localStorage.getItem("caso_IdEditar") ?? '0', 0);

        if(this.caso_IdEditar > 0){
            this.isEdit = true;
        }else{
            this.isEdit = false;
        }

        this.breadCrumbItems = [
            { label: 'Casos' },
            { label: 'Agregar y editar', active: true }
        ];

        this.casoForm = this.formBuilder.group({
            caso_Id: [0],
            caso_Descripcion: ['', Validators.required],
            tica_Id: ['', Validators.required],
            caso_Juez: ['', Validators.required]
        });
    }

    get form(){
        return this.casoForm.controls;
    }

    onSubmit(){
       
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
