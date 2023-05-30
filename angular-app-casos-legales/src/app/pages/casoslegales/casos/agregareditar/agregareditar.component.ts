import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./agregareditar.component.scss'],
  encapsulation: ViewEncapsulation.None
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

    listadoAbogadosDemandantes: abogadosjueces[] = [];
    listadoAbogadosDemandados: abogadosjueces[] = [];

    listadoEmpresas: empresa[] = [];
    listadoCiviles: civiles[] = [];
    
    listadoEmpresasDemandante: empresa[] = [];
    listadoEmpresasDemandado: empresa[] = [];

    listadoCivilesDemandante: civiles[] = [];
    listadoCivilesDemandado: civiles[] = [];

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
            tica_Id: [null, Validators.required],
            abju_IdJuez: [null, Validators.required],
            caso_TipoDemandante: [null, Validators.required],
            caso_IdDemandante: [null, Validators.required],
            caso_TipoDemandado: [null, Validators.required],
            caso_IdDemandado: [null, Validators.required],
            abju_IdAbogadoDemandante: [null, Validators.required],
            abju_IdAbogadoDemandado: [null, Validators.required]
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

                this.listadoAbogadosDemandados = data.data;
                this.listadoAbogadosDemandantes = data.data;
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

                this.listadoCivilesDemandante = data.data;
                this.listadoCivilesDemandado = data.data;
            }
        })

        this.empresasService.getempresas()
        .subscribe((data:any) => {
            if(data.code === 200){
                this.listadoEmpresas = data.data;

                this.listadoEmpresasDemandante = data.data;
                this.listadoEmpresasDemandado = data.data;
            }
        })
    }

    get form(){
        return this.casoForm.controls;
    }

    onSubmit(){
       this.submitted = true;
    }

    tipoDemandanteChange(){
       this.form['caso_IdDemandante'].setValue(null);
    }

    tipoDemandadoChange(){
        this.form['caso_IdDemandado'].setValue(null);
    }

    demandanteChange(value:number){
        this.listadoEmpresasDemandado = this.listadoEmpresas;
        this.listadoCivilesDemandado = this.listadoCiviles;
        if(value > 0 && this.form['caso_TipoDemandante'].value === "E")
        {
            this.listadoEmpresasDemandado = this.listadoEmpresasDemandado.filter(item => item.emsa_Id !== value);
        }
        else if (value > 0 && this.form['caso_TipoDemandante'].value === "C")
        {
            this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(item => item.civi_Id !== value);
        }
    }

    demandadoChange(value:number){
        this.listadoEmpresasDemandante = this.listadoEmpresas;
        this.listadoCivilesDemandante = this.listadoCiviles;
        if(value > 0 && this.form['caso_TipoDemandado'].value === "E"){
            this.listadoEmpresasDemandante = this.listadoEmpresasDemandante.filter(item => item.emsa_Id !== value);  
        } 
        else if (value > 0 && this.form['caso_TipoDemandado'].value === "C")
        {
            this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(item => item.civi_Id !== value);
        }
    }

    abogadoDemandanteChange(value:number){
        this.listadoAbogadosDemandados = this.listadoAbogados;
        if(value > 0){
            this.listadoAbogadosDemandados = this.listadoAbogadosDemandados.filter(item => item.abju_Id !== value);
        }
    }

    abogadoDemandadoChange(value:number){
        this.listadoAbogadosDemandantes = this.listadoAbogados;
        if(value > 0){
            this.listadoAbogadosDemandantes = this.listadoAbogadosDemandantes.filter(item => item.abju_Id !== value);
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
