import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { abogadosjueces } from 'src/app/pages/models/casoslegales/abogadosjueces';
import { civiles } from 'src/app/pages/models/casoslegales/civil';
import { empresa } from 'src/app/pages/models/casoslegales/empresa';
import { tiposdecaso } from 'src/app/pages/models/casoslegales/tiposdecaso';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import { AbogadosjuecesService } from 'src/app/pages/services/casolegales/abogadosjuecesservice/abogadosjueces.service';
import { CivilService } from 'src/app/pages/services/casolegales/civilesservice/civil.service';
import { EmpresaService } from 'src/app/pages/services/casolegales/empresaservice/empresa.service';
import { TiposdecasoService } from 'src/app/pages/services/casolegales/tiposdecasoservice/tiposdecaso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregareditar',
  templateUrl: './agregareditar.component.html',
  styleUrls: ['./agregareditar.component.scss']
})
export class AgregareditarComponent implements OnInit {

    constructor(
        private rolService: RolService,
        private tiposCasoService: TiposdecasoService,
        private abogadosJuecesService: AbogadosjuecesService,
        private empresasService: EmpresaService,
        private civilesService: CivilService,
        private formBuilder: UntypedFormBuilder,
        private router: Router
    ) { }
    
    breadCrumbItems!: Array<{}>;
    dateNow: Date = new Date();
    isEdit: boolean = false;
    caso_IdEditar: number = 0;
    submitted: boolean = false;
    casoForm!: UntypedFormGroup;
    listadoTiposDeCaso: tiposdecaso[] = [];
    listadoAbogados: abogadosjueces[] = [];
    listadoJueces: abogadosjueces[] = [];
    listadoEmpresas: empresa[] = [];
    listadoCiviles: civiles[] = [];

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
            caso_Juez: ['', Validators.required],
            caso_TipoDemandante: ['', Validators.required],
            caso_IdDemandante: ['', Validators.required],
            caso_TipoDemandado: ['', Validators.required],
            caso_IdDemandado: ['', Validators.required],
            abju_IdAbogadoDemandante: ['', Validators.required],
            abju_IdAbogadoDemandado: ['', Validators.required]
        });

        this.tiposCasoService.getTiposdecaso()
        .subscribe((data:any) => {
            if(data.code === 200){
                this.listadoTiposDeCaso = data.data;
            }
        })

        this.abogadosJuecesService.DdlAbogados()
        .subscribe((data:any) => {
            if(data.code === 200){
                this.listadoAbogados = data.data;
            }
        })
        
        this.abogadosJuecesService.DdlJueces()
        .subscribe((data:any) => {
            if(data.code === 200){
                this.listadoJueces = data.data;
            }
        })

        this.civilesService.getCiviles()
        .subscribe((data:any) => {
            if(data.code === 200){
                this.listadoCiviles = data.data;
            }
        })

        this.empresasService.getempresas()
        .subscribe((data:any) => {
            if(data.code === 200){
                this.listadoEmpresas = data.data;
            }
        })
    }

    get form(){
        return this.casoForm.controls;
    }

    onSubmit(){
       
    }

    tipoDemandanteChange(value:string){
        if(value === "E"){

        }
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
