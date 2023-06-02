import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { TestigosPorCaso } from 'src/app/pages/models/casoslegales/TestigosPorCaso';
import { abogadosjueces } from 'src/app/pages/models/casoslegales/abogadosjueces';
import { civiles } from 'src/app/pages/models/casoslegales/civil';
import { empresa } from 'src/app/pages/models/casoslegales/empresa';
import { tiposdecaso } from 'src/app/pages/models/casoslegales/tiposdecaso';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import { AbogadosjuecesService } from 'src/app/pages/services/casolegales/abogadosjuecesservice/abogadosjueces.service';
import { CasosService } from 'src/app/pages/services/casolegales/casos/casos.service';
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
        private casoService: CasosService,
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
    submittedTestigoDemandante: boolean = false;
    submittedTestigoDemandado: boolean = false;

    casoForm!: UntypedFormGroup;
    testigoDemandanteForm!: UntypedFormGroup;
    testigoDemandadoForm!: UntypedFormGroup;

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

    listadoTestigosFull: civiles[] = [];
    listadoTestigosDemandanteFull: civiles[] = [];
    listadoTestigosDemandadosFull: civiles[] = [];

    listadoTestigosDemandante: TestigosPorCaso[] = [];
    listadoTestigosDemandados: TestigosPorCaso[] = [];

    filesImgDemandado: File[] = [];
    filesDocumentDemandado: File[] = [];
    
    filesImgDemandante: File[] = [];
    filesDocumentDemandante: File[] = [];

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

        if (this.caso_IdEditar > 0) {
            this.isEdit = true;
        } else {
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
            caso_IdDemandado: [[], Validators.required],
            abju_IdAbogadoDemandante: [null, Validators.required],
            abju_IdAbogadoDemandado: [null, Validators.required]
        });

        this.testigoDemandanteForm = this.formBuilder.group({
            caso_Id: [this.form["caso_Id"].value],
            teca_Testigo: [null, Validators.required],
            teca_Declaracion: ['', Validators.required],
            teca_Demandante: [false],
            teca_Demandado: [false]
        });

        this.testigoDemandadoForm = this.formBuilder.group({
            caso_Id: [this.form["caso_Id"].value],
            teca_Testigo: [null, Validators.required],
            teca_Declaracion: ['', Validators.required],
            teca_Demandante: [false],
            teca_Demandado: [false]
        });

        this.tiposCasoService.getTiposdecaso()
            .subscribe((data: any) => {
                if (data.code === 200) {
                    this.listadoTiposDeCaso = data.data;
                }
            })

        this.abogadosJuecesService.DdlAbogados()
            .subscribe((data: any) => {
                if (data.code === 200) {
                    this.listadoAbogados = data.data;

                    this.listadoAbogadosDemandados = data.data;
                    this.listadoAbogadosDemandantes = data.data;
                }
            })

        this.abogadosJuecesService.DdlJueces()
            .subscribe((data: any) => {
                if (data.code === 200) {
                    this.listadoJueces = data.data;
                }
            })

        this.civilesService.getCiviles()
            .subscribe((data: any) => {
                if (data.code === 200) {
                    this.listadoCiviles = data.data;

                    this.listadoCivilesDemandante = data.data;
                    this.listadoCivilesDemandado = data.data;
                    this.listadoTestigosFull = data.data;
                }
            })

        this.empresasService.getempresas()
            .subscribe((data: any) => {
                if (data.code === 200) {
                    this.listadoEmpresas = data.data;

                    this.listadoEmpresasDemandante = data.data;
                    this.listadoEmpresasDemandado = data.data;
                }
            })
    }

    get form() {
        return this.casoForm.controls;
    }

    get formTestigoDemandante() {
        return this.testigoDemandanteForm.controls;
    }

    get formTestigoDemandado() {
        return this.testigoDemandadoForm.controls;
    }

    onSubmit() {
        this.submitted = true;


    }

    agregarTestigoDemandante() {
        this.submittedTestigoDemandante = true;

        if (this.testigoDemandanteForm.valid) {
            const testigoTemp = new TestigosPorCaso();
            testigoTemp.caso_Id = this.formTestigoDemandante["caso_Id"].value;
            testigoTemp.teca_Testigo = this.formTestigoDemandante["teca_Testigo"].value;
            testigoTemp.teca_Declaracion = this.formTestigoDemandante["teca_Declaracion"].value;
            testigoTemp.teca_Demandante = true;

            testigoTemp.civi_DNI = this.listadoCiviles.filter(item => item.civi_Id === testigoTemp.teca_Testigo)[0].civi_DNI;
            testigoTemp.civi_Nombres = this.listadoCiviles.filter(item => item.civi_Id === testigoTemp.teca_Testigo)[0].civi_Nombres;
            testigoTemp.civi_Apellidos = this.listadoCiviles.filter(item => item.civi_Id === testigoTemp.teca_Testigo)[0].civi_Apellidos;

            this.listadoTestigosDemandante.push(testigoTemp);

            this.listadoTestigosFull = this.listadoTestigosFull.filter(item => item.civi_Id !== testigoTemp.teca_Testigo);
            
            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;

            this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(item => item.civi_Id !== testigoTemp.teca_Testigo);
            this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(item => item.civi_Id !== testigoTemp.teca_Testigo);

            this.testigoDemandanteForm.reset();
            this.submittedTestigoDemandante = false;
        }
    }

    agregarTestigoDemandado() {
        this.submittedTestigoDemandado = true;

        if (this.testigoDemandadoForm.valid) {
            const testigoTemp = new TestigosPorCaso();
            testigoTemp.caso_Id = this.formTestigoDemandado["caso_Id"].value;
            testigoTemp.teca_Testigo = this.formTestigoDemandado["teca_Testigo"].value;
            testigoTemp.teca_Declaracion = this.formTestigoDemandado["teca_Declaracion"].value;
            testigoTemp.teca_Demandante = true;

            testigoTemp.civi_DNI = this.listadoCiviles.filter(item => item.civi_Id === testigoTemp.teca_Testigo)[0].civi_DNI;
            testigoTemp.civi_Nombres = this.listadoCiviles.filter(item => item.civi_Id === testigoTemp.teca_Testigo)[0].civi_Nombres;
            testigoTemp.civi_Apellidos = this.listadoCiviles.filter(item => item.civi_Id === testigoTemp.teca_Testigo)[0].civi_Apellidos;

            this.listadoTestigosDemandados.push(testigoTemp);

            this.listadoTestigosFull = this.listadoTestigosFull.filter(item => item.civi_Id !== testigoTemp.teca_Testigo);
            
            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;

            this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(item => item.civi_Id !== testigoTemp.teca_Testigo);
            this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(item => item.civi_Id !== testigoTemp.teca_Testigo);

            this.testigoDemandadoForm.reset();
            this.submittedTestigoDemandado = false;
        }
    }

    eliminarTestigoDemandado(value: number) {
        if (value > 0) {
            this.listadoTestigosDemandados = this.listadoTestigosDemandados.filter(item => item.teca_Testigo !== value);

            this.listadoCivilesDemandado.push(this.listadoCiviles.filter(item => item.civi_Id === value)[0]);
            this.listadoCivilesDemandante.push(this.listadoCiviles.filter(item => item.civi_Id === value)[0]);

            if(this.form['caso_TipoDemandante'].value === "C"){
                this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== this.form['caso_IdDemandante'].value);

                this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
                this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
            }
        }
    }

    eliminarTestigoDemandante(value: number) {
        if (value > 0) {
            this.listadoTestigosDemandante = this.listadoTestigosDemandante.filter(item => item.teca_Testigo !== value);

            this.listadoCivilesDemandado.push(this.listadoCiviles.filter(item => item.civi_Id === value)[0]);
            this.listadoCivilesDemandante.push(this.listadoCiviles.filter(item => item.civi_Id === value)[0]);

            if(this.form['caso_TipoDemandante'].value === "C"){
                this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== this.form['caso_IdDemandante'].value);

                this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
                this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
            }
        }
    }

    tipoDemandanteChange() {
        this.form['caso_IdDemandante'].setValue(null);
        this.listadoEmpresasDemandado = this.listadoEmpresas;
        this.listadoCivilesDemandado = this.listadoCiviles;

        if (this.listadoTestigosDemandados.length > 0) {
            this.listadoTestigosDemandados.forEach(item => {
                this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        }
        
        if (this.listadoTestigosDemandante.length > 0) {
            this.listadoTestigosDemandante.forEach(item => {
                this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        }
        
    }

    tipoDemandadoChange() {
        this.form['caso_IdDemandado'].setValue(null);
        this.listadoEmpresasDemandante = this.listadoEmpresas;
        this.listadoCivilesDemandante = this.listadoCiviles;

        if (this.listadoTestigosDemandados.length > 0) {
            this.listadoTestigosDemandados.forEach(item => {
                this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        }
        
        if (this.listadoTestigosDemandante.length > 0) {
            this.listadoTestigosDemandante.forEach(item => {
                this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        } 

    }

    demandanteChange(value: number) {
        this.listadoEmpresasDemandado = this.listadoEmpresas;
        this.listadoCivilesDemandado = this.listadoCiviles;

        if (this.listadoTestigosDemandados.length > 0) {
            this.listadoTestigosDemandados.forEach(item => {
                this.listadoCivilesDemandado =  this.listadoCivilesDemandado.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        } 
        
        if (this.listadoTestigosDemandante.length > 0) {
            this.listadoTestigosDemandante.forEach(item => {
                this.listadoCivilesDemandado =  this.listadoCivilesDemandado.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        }

        if (value > 0 && this.form['caso_TipoDemandante'].value === "E") {
            this.listadoEmpresasDemandado = this.listadoEmpresasDemandado.filter(item => item.emsa_Id !== value);
        }
        else if (value > 0 && this.form['caso_TipoDemandante'].value === "C") 
        {
            this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(item => item.civi_Id !== value);
        }

        if(this.form['caso_IdDemandado'].value){
            if(this.form['caso_IdDemandado'].value.length > 0){
                const demandados: number [] = this.form['caso_IdDemandado'].value;

                if(this.form['caso_TipoDemandante'].value === "C"){
                    demandados.forEach(element => {
                        this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== value && item.civi_Id !== element);
                    });
                }else{
                    demandados.forEach(element => {
                        this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== element);
                    });
                }  
            }
            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }

        if(this.form['caso_TipoDemandado'].value === "E" && this.form['caso_TipoDemandante'].value === "E"){
            this.listadoTestigosFull =  this.listadoCivilesDemandado;

            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }
    }

    demandadoChange(value: number[]) {
        this.listadoEmpresasDemandante = this.listadoEmpresas;
        this.listadoCivilesDemandante = this.listadoCiviles;

        if (this.listadoTestigosDemandados.length > 0) {
            this.listadoTestigosDemandados.forEach(item => {
                this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        } 
        
        if (this.listadoTestigosDemandante.length > 0) {
            this.listadoTestigosDemandante.forEach(item => {
                this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        }

        if (value.length > 0 && this.form['caso_TipoDemandado'].value === "E") {
            value.forEach(element => {
                this.listadoEmpresasDemandante = this.listadoEmpresasDemandante.filter(item => item.emsa_Id !== element);
            })
        }
        else if (value.length > 0 && this.form['caso_TipoDemandado'].value === "C") 
        {   
            value.forEach(element => {
                this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(item => item.civi_Id !== element);

                if(this.form['caso_IdDemandante'].value > 0){
                    this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== element && item.civi_Id !== this.form['caso_IdDemandante'].value);
                }
            })

            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }

        if(this.form['caso_TipoDemandado'].value === "E" && this.form['caso_TipoDemandante'].value === "C"){
            this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== this.form['caso_IdDemandante'].value);

            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }

        if(this.form['caso_TipoDemandado'].value === "E" && this.form['caso_TipoDemandante'].value === "E"){
            this.listadoTestigosFull = this.listadoCivilesDemandante;

            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }
    }

    abogadoDemandanteChange(value: number) {
        this.listadoAbogadosDemandados = this.listadoAbogados;
        if (value > 0) {
            this.listadoAbogadosDemandados = this.listadoAbogadosDemandados.filter(item => item.abju_Id !== value);
        }
    }

    abogadoDemandadoChange(value: number) {
        this.listadoAbogadosDemandantes = this.listadoAbogados;
        if (value > 0) {
            this.listadoAbogadosDemandantes = this.listadoAbogadosDemandantes.filter(item => item.abju_Id !== value);
        }
    }

    testigosDemandadoChange(value: number) {
        this.listadoTestigosDemandanteFull = this.listadoTestigosFull;

        if (value > 0) {
            this.listadoTestigosDemandanteFull = this.listadoTestigosDemandanteFull.filter(item => item.civi_Id !== value);
        }
    }

    testigosDemandanteChange(value: number) {
        this.listadoTestigosDemandadosFull = this.listadoTestigosFull;

        if (value > 0) {
            this.listadoTestigosDemandadosFull = this.listadoTestigosDemandadosFull.filter(item => item.civi_Id !== value);
        }
    }
   
	onSelectFileImgDemandado(event:any) {
        let filesTemp: File[] = event.addedFiles;
        if(this.filesImgDemandado.length > 0){
            filesTemp.forEach(element => {
                this.filesImgDemandado.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if(this.filesImgDemandante.length > 0){
            filesTemp.forEach(element => {
                this.filesImgDemandante.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        this.filesImgDemandado.push(...filesTemp);
	}

	onRemoveFileImgDemandado(event:any) {		
		this.filesImgDemandado.splice(this.filesImgDemandado.indexOf(event), 1);
	}
   
    onSelectFileDocumentDemandado(event:any){
        let filesDocumentTemp: File[] = event.addedFiles;

        if(this.filesDocumentDemandado.length > 0){
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandado.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if(this.filesDocumentDemandante.length > 0){
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandante.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        this.filesDocumentDemandado.push(...filesDocumentTemp);
    }

    onRemoveFileDocumentDemandado(event:any){
        this.filesDocumentDemandado.splice(this.filesDocumentDemandado.indexOf(event), 1);
    }

    onSelectFileImgDemandante(event:any) {
        let filesTemp: File[] = event.addedFiles;

        if(this.filesImgDemandado.length > 0){
            filesTemp.forEach(element => {
                this.filesImgDemandado.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if(this.filesImgDemandante.length > 0){
            filesTemp.forEach(element => {
                this.filesImgDemandante.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

		this.filesImgDemandante.push(...filesTemp);
	}

	onRemoveFileImgDemandante(event:any) {		
		this.filesImgDemandante.splice(this.filesImgDemandante.indexOf(event), 1);
	}
   
    onSelectFileDocumentDemandante(event:any){
        let filesDocumentTemp: File[] = event.addedFiles;

        if(this.filesDocumentDemandado.length > 0){
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandado.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if(this.filesDocumentDemandante.length > 0){
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandante.forEach(value => {
                    if(element.name === value.name){
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        this.filesDocumentDemandante.push(...filesDocumentTemp);
    }

    onRemoveFileDocumentDemandante(event:any){
        this.filesDocumentDemandante.splice(this.filesDocumentDemandante.indexOf(event), 1);
    }

    getLinkImageDemandante(){
        const fileTemp = new FormData();

        fileTemp.append('file', this.filesImgDemandado[0], this.filesImgDemandado[0].name);
        
        this.casoService.getLinkImageDemandante(fileTemp).subscribe((data:any) => {
            if (typeof (data) === 'object') {
                console.log(data.link);

            }
        });
    }   

    getLinkImage(){
        const fileTemp = new FormData();

        fileTemp.append('file', this.filesImgDemandado[0], this.filesImgDemandado[0].name);

        this.casoService.getLinkImage(fileTemp)
        .subscribe((data:any) => {
            if (data.status === 'ok') {
                console.log(data.data.downloadPage)
            }
        })
    }

    getLinkDocument(){
        const fileTemp = new FormData();

        fileTemp.append('file', this.filesDocumentDemandante[0], this.filesDocumentDemandante[0].name);

        this.casoService.getLinkDocument(fileTemp)
        .subscribe((data:any) => {
            if (data.status === 'ok') {
                console.log(data.data.downloadPage)
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
            timer: 2500,
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
