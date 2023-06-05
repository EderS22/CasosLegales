import { Component, OnInit, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { AcusadoPorCaso } from 'src/app/pages/models/casoslegales/AcusadoPorCaso';
import { Caso } from 'src/app/pages/models/casoslegales/Caso';
import { DetalleVeredicto } from 'src/app/pages/models/casoslegales/DetalleVeredicto';
import { EvidenciaPorCaso } from 'src/app/pages/models/casoslegales/EvidenciaPorCaso';
import { TestigoPorCaso } from 'src/app/pages/models/casoslegales/TestigoPorCaso';
import { Veredicto } from 'src/app/pages/models/casoslegales/Veredicto';
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

    @ViewChild(DataTableDirective, { static: false })
    dtElements!: QueryList<DataTableDirective>;

    TipoDema: TipoDeman[] = [
        { tide_Id: 'E', tide_Tipo: 'Empresa' },
        { tide_Id: 'C', tide_Tipo: 'Civil' }
    ]

    TipoDema1: TipoDeman[] = [];
    TipoDema2: TipoDeman[] = [];

    breadCrumbItems!: Array<{}>;
    dateNow: Date = new Date();

    isEdit: boolean = false;
    caso_IdEditar: number = 0;
    allCorrect: boolean = true;
    allCorrectEdit: boolean = true;

    veredicto: Veredicto = new Veredicto();
    detalleVeredicto: DetalleVeredicto[] = [];
    listadoDetalleVeredictoFilter: DetalleVeredicto[] = [];

    searchTerm$ = new Subject<string>();

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

    listadoTestigosDemandante: TestigoPorCaso[] = [];
    listadoTestigosDemandados: TestigoPorCaso[] = [];

    filesImgDemandado: File[] = [];
    filesDocumentDemandado: File[] = [];

    filesImgDemandante: File[] = [];
    filesDocumentDemandante: File[] = [];

    evidenciasDemandante: EvidenciaPorCaso[] = [];
    evidenciasDemandado: EvidenciaPorCaso[] = [];

    dtOptions: DataTables.Settings[] = [];
    dtTrigger1: Subject<any> = new Subject<any>();
    dtTrigger2: Subject<any> = new Subject<any>();

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

        this.dtOptions[0] = {
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

        this.dtOptions[1] = {
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
        this.TipoDema1 = this.TipoDema;
        this.TipoDema2 = this.TipoDema;
        this.filterList();

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
            teca_Id: [0],
            caso_Id: [this.form["caso_Id"].value],
            teca_Testigo: [null, Validators.required],
            teca_Declaracion: ['', Validators.required],
            teca_Demandante: [false],
            teca_Demandado: [false]
        });

        this.testigoDemandadoForm = this.formBuilder.group({
            teca_Id: [0],
            caso_Id: [this.form["caso_Id"].value],
            teca_Testigo: [null, Validators.required],
            teca_Declaracion: ['', Validators.required],
            teca_Demandante: [false],
            teca_Demandado: [false]
        });

        if (this.isEdit) {
            this.casoService.getCasoById(this.caso_IdEditar)
                .subscribe((data: any) => {
                    if (data.code === 200) {
                        this.form['caso_Id'].setValue(data.data.caso_Id);
                        this.form['caso_Descripcion'].setValue(data.data.caso_Descripcion);
                        this.form['tica_Id'].setValue(data.data.tica_Id);
                        this.form['abju_IdJuez'].setValue(data.data.abju_IdJuez);
                        this.form['caso_TipoDemandante'].setValue(data.data.caso_TipoDemandante);
                        this.form['caso_IdDemandante'].setValue(data.data.caso_IdDemandante);
                        this.form['abju_IdAbogadoDemandante'].setValue(data.data.abju_IdAbogadoDemandante);
                        this.form['abju_IdAbogadoDemandado'].setValue(data.data.abju_IdAbogadoDemandado);

                        this.abogadoDemandadoChange(data.data.abju_IdAbogadoDemandante);
                        this.abogadoDemandanteChange(data.data.abju_IdAbogadoDemandado);
                        this.demandanteChange(data.data.caso_IdDemandante);

                        this.casoService.getAcusadosPorIdCaso(this.caso_IdEditar)
                            .subscribe((data: any) => {
                                if (data.code === 200) {
                                    const listAcus: AcusadoPorCaso[] = data.data;
                                    this.form['caso_TipoDemandado'].setValue(listAcus[0].acus_TipoAcusado);

                                    let listNumberAcusTemp: number[] = [];

                                    listAcus.forEach(item => {
                                        listNumberAcusTemp.push(item.acus_Acusado);
                                    })

                                    this.form['caso_IdDemandado'].setValue(listNumberAcusTemp);

                                    this.demandadoChange(listNumberAcusTemp);
                                }
                            })

                        this.casoService.getTestigosPorIdCaso(this.caso_IdEditar)
                            .subscribe((data: any) => {
                                if (data.code === 200) {
                                    const testigosTemp: TestigoPorCaso[] = data.data;

                                    testigosTemp.forEach(item => {
                                        if (item.teca_Demandado) {
                                            this.formTestigoDemandado['teca_Id'].setValue(item.teca_Id);
                                            this.formTestigoDemandado['teca_Testigo'].setValue(item.teca_Testigo);
                                            this.formTestigoDemandado['teca_Declaracion'].setValue(item.teca_Declaracion);
                                            this.agregarTestigoDemandado();
                                        }

                                        if (item.teca_Demandante) {
                                            this.formTestigoDemandante['teca_Id'].setValue(item.teca_Id);
                                            this.formTestigoDemandante['teca_Testigo'].setValue(item.teca_Testigo);
                                            this.formTestigoDemandante['teca_Declaracion'].setValue(item.teca_Declaracion);
                                            this.agregarTestigoDemandante();
                                        }
                                    })
                                }
                            })
                    }
                })
            this.getListadoEvidencias();

            this.casoService.getVeredictoPorIdCaso(this.caso_IdEditar)
                .subscribe((data: any) => {
                    if (data.code === 200) {
                        this.veredicto = data.data;

                        this.casoService.getDetallesVeredictoPorIdVeredicto(this.veredicto.vere_Id)
                            .subscribe((response: any) => {
                                if (response.code === 200) {
                                    const listDetallesVereTemp: DetalleVeredicto[] = response.data;

                                    this.detalleVeredicto.forEach(item => {
                                        item.deve_Id = listDetallesVereTemp.filter(val => val.deve_EmpresaCivil === item.deve_EmpresaCivil)[0].deve_Id;
                                        item.deve_EsCulpable = listDetallesVereTemp.filter(val => val.deve_EmpresaCivil === item.deve_EmpresaCivil)[0].deve_EsCulpable;
                                    })
                                }
                            })
                    }
                })
        }
    }

    rerender(): void {
        this.dtElements.forEach((dtElement: DataTableDirective) => {
            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.getListadoEvidencias();
            });
        });
    }

    getListadoEvidencias() {
        this.casoService.getEvidenciasPorIdCaso(this.caso_IdEditar)
            .subscribe((data: any) => {
                if (data.code === 200) {
                    const evidenciasTemp: EvidenciaPorCaso[] = data.data;

                    evidenciasTemp.forEach(item => {
                        if (item.evca_Demandado) {
                            this.evidenciasDemandado.push(item);
                        }

                        if (item.evca_Demandante) {
                            this.evidenciasDemandante.push(item);
                        }
                    })

                    this.dtTrigger1.next(null);
                    this.dtTrigger2.next(null);
                }
            })
    }

    regresar() {
        this.router.navigate(['casoslegales/casos/listado']);
    }

    filterList(): void {
        this.searchTerm$.subscribe(term => {
            this.listadoDetalleVeredictoFilter = this.detalleVeredicto
                .filter(item => item.civi_DNI.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.civi_Nombres.toLowerCase().indexOf(term.toLowerCase()) >= 0 || item.emsa_Nombre.toLowerCase().indexOf(term.toLowerCase()) >= 0);
        });
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

        if (this.casoForm.valid) {
            if (this.isEdit) {
                const IdCaso = this.caso_IdEditar;

                const casoTemp = new Caso();
                casoTemp.caso_Id = IdCaso;
                casoTemp.caso_Descripcion = this.casoForm.get('caso_Descripcion')?.value;
                casoTemp.tica_Id = this.casoForm.get('tica_Id')?.value;
                casoTemp.abju_IdJuez = this.casoForm.get('abju_IdJuez')?.value;
                casoTemp.caso_TipoDemandante = this.casoForm.get('caso_TipoDemandante')?.value;
                casoTemp.caso_IdDemandante = this.casoForm.get('caso_IdDemandante')?.value;
                casoTemp.abju_IdAbogadoDemandante = this.casoForm.get('abju_IdAbogadoDemandante')?.value;
                casoTemp.abju_IdAbogadoDemandado = this.casoForm.get('abju_IdAbogadoDemandado')?.value;
                casoTemp.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                if (this.veredicto.vere_Descripcion !== undefined) {
                    if (this.veredicto.vere_Descripcion !== '') {
                        casoTemp.caso_Abierto = false;
                    } else {
                        casoTemp.caso_Abierto = true;
                    }
                }

                this.casoService.editarCaso(casoTemp)
                    .subscribe((data: any) => {
                        if (data.code === 200) {
                            if (data.data.codeStatus === 1) {

                                this.casoService.eliminarAcusadosPorCaso(IdCaso)
                                .subscribe((data:any) => {
                                    if(data.code === 200){
                                        const ListDemandado: number[] = this.casoForm.get('caso_IdDemandado')?.value;
                                        ListDemandado.forEach(item => {
                                            const DemandadoTemp = new AcusadoPorCaso();
                                            DemandadoTemp.caso_Id = IdCaso;
                                            DemandadoTemp.acus_TipoAcusado = this.casoForm.get('caso_TipoDemandado')?.value;
                                            DemandadoTemp.acus_Acusado = item;
                                            DemandadoTemp.acus_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
        
                                            this.casoService.insertarAcusadoPorCaso(DemandadoTemp)
                                                .subscribe((data: any) => {
                                                    if (data.code.codeStatus === 0) {
                                                        this.allCorrectEdit = false;
                                                    }
                                                })
                                        })
                                    }   
                                })

                                this.casoService.eliminarTodosTestigosPorCaso(IdCaso)
                                .subscribe((data:any) => {
                                    if(data.code === 200){
                                        if (this.listadoTestigosDemandados.length > 0) {
                                            this.listadoTestigosDemandados.forEach(element => {
                                                element.caso_Id = IdCaso;
                                                element.teca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
        
                                                this.casoService.insertTestigoPorCaso(element)
                                                    .subscribe((data: any) => {
                                                        if (data.code.codeStatus === 0) {
                                                            this.allCorrectEdit = false;
                                                        }
                                                    })
                                            })
                                        }
        
                                        if (this.listadoTestigosDemandante.length > 0) {
                                            this.listadoTestigosDemandante.forEach(element => {
                                                element.caso_Id = IdCaso;
                                                element.teca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
        
                                                this.casoService.insertTestigoPorCaso(element)
                                                    .subscribe((data: any) => {
                                                        if (data.code.codeStatus === 0) {
                                                            this.allCorrectEdit = false;
                                                        }
                                                    })
                                            })
                                        }
                                    }
                                })

                                if (this.filesImgDemandado.length > 0) {
                                    this.filesImgDemandado.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandado = true;
                                                            evidenciaTemp.tiev_Id = 1;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrectEdit = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.filesDocumentDemandado.length > 0) {
                                    this.filesDocumentDemandado.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandado = true;
                                                            evidenciaTemp.tiev_Id = 2;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrectEdit = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.filesImgDemandante.length > 0) {
                                    this.filesImgDemandante.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandante = true;
                                                            evidenciaTemp.tiev_Id = 1;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrectEdit = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.filesDocumentDemandante.length > 0) {
                                    this.filesDocumentDemandante.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandante = true;
                                                            evidenciaTemp.tiev_Id = 2;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrectEdit = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.veredicto.vere_Descripcion !== undefined) {
                                    if (this.veredicto.vere_Descripcion !== '') {
                                        this.veredicto.caso_Id = IdCaso;
                                        this.veredicto.vere_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                        this.casoService.insertarVeredicto(this.veredicto)
                                            .subscribe((data: any) => {
                                                if (data.code.codeStatus === 0) {
                                                    this.allCorrectEdit = false;
                                                } else {
                                                    if (this.detalleVeredicto.length > 0) {
                                                        this.casoService.eliminarDetallesVeredictos(this.veredicto.vere_Id)
                                                        .subscribe((data:any) => {
                                                            if(data.code === 200){
                                                                this.detalleVeredicto.forEach(element => {
                                                                    element.vere_Id = this.veredicto.vere_Id;
                                                                    element.deve_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
        
                                                                    this.casoService.insertarDetalleVeredicto(element)
                                                                        .subscribe((response: any) => {
                                                                            if (response.data.codeStatus === 0) {
                                                                                this.allCorrectEdit = false;
                                                                            }
                                                                        })
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                    }
                                }

                                if (!this.allCorrectEdit) {
                                    localStorage.setItem("casoAllCorrectEdit", "false");
                                } else {
                                    localStorage.setItem("casoAllCorrectEdit", "true");
                                    this.router.navigate(["casoslegales/casos/listado"]);
                                }

                            }
                        }
                    })

            } else {
                const casoTemp = new Caso();
                casoTemp.caso_Descripcion = this.casoForm.get('caso_Descripcion')?.value;
                casoTemp.tica_Id = this.casoForm.get('tica_Id')?.value;
                casoTemp.abju_IdJuez = this.casoForm.get('abju_IdJuez')?.value;
                casoTemp.caso_TipoDemandante = this.casoForm.get('caso_TipoDemandante')?.value;
                casoTemp.caso_IdDemandante = this.casoForm.get('caso_IdDemandante')?.value;
                casoTemp.abju_IdAbogadoDemandante = this.casoForm.get('abju_IdAbogadoDemandante')?.value;
                casoTemp.abju_IdAbogadoDemandado = this.casoForm.get('abju_IdAbogadoDemandado')?.value;
                casoTemp.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                if (this.veredicto.vere_Descripcion !== undefined) {
                    if (this.veredicto.vere_Descripcion !== '') {
                        casoTemp.caso_Abierto = false;
                    } else {
                        casoTemp.caso_Abierto = true;
                    }
                }

                this.casoService.insertarCaso(casoTemp)
                    .subscribe((data: any) => {
                        if (data.code === 200) {
                            if (data.data.codeStatus > 0) {
                                const IdCaso = data.data.codeStatus;

                                const ListDemandado: number[] = this.casoForm.get('caso_IdDemandado')?.value;
                                ListDemandado.forEach(item => {
                                    const DemandadoTemp = new AcusadoPorCaso();
                                    DemandadoTemp.caso_Id = IdCaso;
                                    DemandadoTemp.acus_TipoAcusado = this.casoForm.get('caso_TipoDemandado')?.value;
                                    DemandadoTemp.acus_Acusado = item;
                                    DemandadoTemp.acus_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                    this.casoService.insertarAcusadoPorCaso(DemandadoTemp)
                                        .subscribe((data: any) => {
                                            if (data.code.codeStatus === 0) {
                                                this.allCorrect = false;
                                            }
                                        })
                                })

                                if (this.listadoTestigosDemandados.length > 0) {
                                    this.listadoTestigosDemandados.forEach(element => {
                                        element.caso_Id = IdCaso;
                                        element.teca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                        this.casoService.insertTestigoPorCaso(element)
                                            .subscribe((data: any) => {
                                                if (data.code.codeStatus === 0) {
                                                    this.allCorrect = false;
                                                }
                                            })
                                    })
                                }

                                if (this.listadoTestigosDemandante.length > 0) {
                                    this.listadoTestigosDemandante.forEach(element => {
                                        element.caso_Id = IdCaso;
                                        element.teca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                        this.casoService.insertTestigoPorCaso(element)
                                            .subscribe((data: any) => {
                                                if (data.code.codeStatus === 0) {
                                                    this.allCorrect = false;
                                                }
                                            })
                                    })
                                }

                                if (this.filesImgDemandado.length > 0) {
                                    this.filesImgDemandado.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandado = true;
                                                            evidenciaTemp.tiev_Id = 1;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrect = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.filesDocumentDemandado.length > 0) {
                                    this.filesDocumentDemandado.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandado = true;
                                                            evidenciaTemp.tiev_Id = 2;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrect = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.filesImgDemandante.length > 0) {
                                    this.filesImgDemandante.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandante = true;
                                                            evidenciaTemp.tiev_Id = 1;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrect = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.filesDocumentDemandante.length > 0) {
                                    this.filesDocumentDemandante.forEach(element => {
                                        const fileTemp = new FormData();
                                        fileTemp.append('file', element, element.name);

                                        this.casoService.getLinkFile(fileTemp)
                                            .subscribe((data: any) => {
                                                if (data.status === 'ok') {
                                                    this.casoService.setLinkDirect(data.data.fileId)
                                                        .subscribe((data: any) => {
                                                            const evidenciaTemp = new EvidenciaPorCaso();

                                                            evidenciaTemp.caso_Id = IdCaso;
                                                            evidenciaTemp.evca_Demandante = true;
                                                            evidenciaTemp.tiev_Id = 2;
                                                            evidenciaTemp.evca_NombreArchivo = element.name;
                                                            evidenciaTemp.evca_UrlArchivo = data.data;
                                                            evidenciaTemp.evca_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


                                                            this.casoService.insertEvidenciaPorCaso(evidenciaTemp)
                                                                .subscribe((data: any) => {
                                                                    if (data.code.codeStatus === 0) {
                                                                        this.allCorrect = false;
                                                                    }
                                                                })
                                                        })
                                                }
                                            })
                                    })
                                }

                                if (this.veredicto.vere_Descripcion !== undefined) {
                                    if (this.veredicto.vere_Descripcion !== '') {
                                        this.veredicto.caso_Id = IdCaso;
                                        this.veredicto.vere_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                        this.casoService.insertarVeredicto(this.veredicto)
                                            .subscribe((data: any) => {
                                                if (data.code.codeStatus === 0) {
                                                    this.allCorrect = false;
                                                } else {
                                                    if (this.detalleVeredicto.length > 0) {
                                                        this.detalleVeredicto.forEach(element => {
                                                            element.vere_Id = data.data.codeStatus;
                                                            element.deve_UsuCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                                            this.casoService.insertarDetalleVeredicto(element)
                                                                .subscribe((response: any) => {
                                                                    if (response.data.codeStatus === 0) {
                                                                        this.allCorrect = false;
                                                                    }
                                                                })
                                                        })
                                                    }
                                                }
                                            })
                                    }
                                }

                                if (!this.allCorrect) {
                                    localStorage.setItem("casoAllCorrect", "false");
                                } else {
                                    localStorage.setItem("casoAllCorrect", "true");
                                    this.router.navigate(["casoslegales/casos/listado"]);
                                }
                            }
                        }
                    })

            }
        }
    }

    eliminarEvidencia(item:number){
        const evidenciaTemp = new  EvidenciaPorCaso();
        evidenciaTemp.evca_Id = item;
        evidenciaTemp.evca_UsuModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

        this.casoService.eliminarEvidenciaPorId(evidenciaTemp)
        .subscribe((data:any) => {
            if(data.code === 200){
                if(data.data.codeStatus === 1){
                    this.mensajeSuccess('Evidencia eliminada con éxito');
                    this.rerender();
                }
            }
        })
    }

    TipoCasoChange(event: any) {
        if (event > 0) {

        }
    }

    agregarTestigoDemandante() {
        this.submittedTestigoDemandante = true;

        if (this.testigoDemandanteForm.valid) {
            const testigoTemp = new TestigoPorCaso();
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
            const testigoTemp = new TestigoPorCaso();
            testigoTemp.caso_Id = this.formTestigoDemandado["caso_Id"].value;
            testigoTemp.teca_Testigo = this.formTestigoDemandado["teca_Testigo"].value;
            testigoTemp.teca_Declaracion = this.formTestigoDemandado["teca_Declaracion"].value;
            testigoTemp.teca_Demandado = true;

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

            if (this.form['caso_TipoDemandante'].value === "C") {
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

            if (this.form['caso_TipoDemandante'].value === "C") {
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
                this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        }

        if (this.listadoTestigosDemandante.length > 0) {
            this.listadoTestigosDemandante.forEach(item => {
                this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(val => val.civi_Id !== item.teca_Testigo);
            })
        }

        if (value > 0 && this.form['caso_TipoDemandante'].value === "E") {
            this.listadoEmpresasDemandado = this.listadoEmpresasDemandado.filter(item => item.emsa_Id !== value);
        }
        else if (value > 0 && this.form['caso_TipoDemandante'].value === "C") {
            this.listadoCivilesDemandado = this.listadoCivilesDemandado.filter(item => item.civi_Id !== value);
        }

        if (this.form['caso_IdDemandado'].value) {
            if (this.form['caso_IdDemandado'].value.length > 0) {
                const demandados: number[] = this.form['caso_IdDemandado'].value;

                if (this.form['caso_TipoDemandante'].value === "C") {
                    demandados.forEach(element => {
                        this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== value && item.civi_Id !== element);
                    });
                } else {
                    demandados.forEach(element => {
                        this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== element);
                    });
                }
            }
            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }

        if (this.form['caso_TipoDemandado'].value === "E" && this.form['caso_TipoDemandante'].value === "E") {
            this.listadoTestigosFull = this.listadoCivilesDemandado;

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
        else if (value.length > 0 && this.form['caso_TipoDemandado'].value === "C") {
            value.forEach(element => {
                this.listadoCivilesDemandante = this.listadoCivilesDemandante.filter(item => item.civi_Id !== element);

                if (this.form['caso_IdDemandante'].value > 0) {
                    this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== element && item.civi_Id !== this.form['caso_IdDemandante'].value);
                }
            })

            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }

        if (this.form['caso_TipoDemandado'].value === "E" && this.form['caso_TipoDemandante'].value === "C") {
            this.listadoTestigosFull = this.listadoCivilesDemandante.filter(item => item.civi_Id !== this.form['caso_IdDemandante'].value);

            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }

        if (this.form['caso_TipoDemandado'].value === "E" && this.form['caso_TipoDemandante'].value === "E") {
            this.listadoTestigosFull = this.listadoCivilesDemandante;

            this.listadoTestigosDemandanteFull = this.listadoTestigosFull;
            this.listadoTestigosDemandadosFull = this.listadoTestigosFull;
        }

        if (this.form['caso_IdDemandado'].value.length > 0) {
            const listDeman: number[] = this.form['caso_IdDemandado'].value;

            if (this.form['caso_TipoDemandado'].value === 'E') {
                this.detalleVeredicto = [];
                listDeman.forEach(item => {
                    const detalleVeredictoTemp = new DetalleVeredicto();

                    detalleVeredictoTemp.deve_TipoEmpresaCivil = "E";
                    detalleVeredictoTemp.deve_EmpresaCivil = item;
                    detalleVeredictoTemp.emsa_Nombre = this.listadoEmpresas.filter(val => val.emsa_Id === item)[0].emsa_Nombre;
                    detalleVeredictoTemp.civi_DNI = '';
                    detalleVeredictoTemp.civi_Nombres = '';
                    detalleVeredictoTemp.civi_Apellidos = '';
                    detalleVeredictoTemp.deve_EsCulpable = true;

                    this.detalleVeredicto.push(detalleVeredictoTemp);
                })
            }

            if (this.form['caso_TipoDemandado'].value === 'C') {
                this.detalleVeredicto = [];
                listDeman.forEach(item => {
                    const detalleVeredictoTemp = new DetalleVeredicto();

                    detalleVeredictoTemp.deve_TipoEmpresaCivil = "C";
                    detalleVeredictoTemp.deve_EmpresaCivil = item;
                    detalleVeredictoTemp.deve_EsCulpable = true;
                    detalleVeredictoTemp.civi_DNI = this.listadoCiviles.filter(val => val.civi_Id === item)[0].civi_DNI;
                    detalleVeredictoTemp.civi_Nombres = this.listadoCiviles.filter(val => val.civi_Id === item)[0].civi_Nombres;
                    detalleVeredictoTemp.civi_Apellidos = this.listadoCiviles.filter(val => val.civi_Id === item)[0].civi_Apellidos;
                    detalleVeredictoTemp.emsa_Nombre = '';

                    this.detalleVeredicto.push(detalleVeredictoTemp);
                })
            }

            this.listadoDetalleVeredictoFilter = this.detalleVeredicto;
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

    onSelectFileImgDemandado(event: any) {
        let filesTemp: File[] = event.addedFiles;
        if (this.filesImgDemandado.length > 0) {
            filesTemp.forEach(element => {
                this.filesImgDemandado.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if (this.filesImgDemandante.length > 0) {
            filesTemp.forEach(element => {
                this.filesImgDemandante.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        this.filesImgDemandado.push(...filesTemp);
    }

    onRemoveFileImgDemandado(event: any) {
        this.filesImgDemandado.splice(this.filesImgDemandado.indexOf(event), 1);
    }

    onSelectFileDocumentDemandado(event: any) {
        let filesDocumentTemp: File[] = event.addedFiles;

        if (this.filesDocumentDemandado.length > 0) {
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandado.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if (this.filesDocumentDemandante.length > 0) {
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandante.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        this.filesDocumentDemandado.push(...filesDocumentTemp);
    }

    onRemoveFileDocumentDemandado(event: any) {
        this.filesDocumentDemandado.splice(this.filesDocumentDemandado.indexOf(event), 1);
    }

    onSelectFileImgDemandante(event: any) {
        let filesTemp: File[] = event.addedFiles;

        if (this.filesImgDemandado.length > 0) {
            filesTemp.forEach(element => {
                this.filesImgDemandado.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if (this.filesImgDemandante.length > 0) {
            filesTemp.forEach(element => {
                this.filesImgDemandante.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Una o varias imagenes que intenta agregar ya han sido subidas");
                        filesTemp = filesTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        this.filesImgDemandante.push(...filesTemp);
    }

    onRemoveFileImgDemandante(event: any) {
        this.filesImgDemandante.splice(this.filesImgDemandante.indexOf(event), 1);
    }

    onSelectFileDocumentDemandante(event: any) {
        let filesDocumentTemp: File[] = event.addedFiles;

        if (this.filesDocumentDemandado.length > 0) {
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandado.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        if (this.filesDocumentDemandante.length > 0) {
            filesDocumentTemp.forEach(element => {
                this.filesDocumentDemandante.forEach(value => {
                    if (element.name === value.name) {
                        this.mensajeWarning("Uno o varios documentos que intenta agregar ya han sido subidos");
                        filesDocumentTemp = filesDocumentTemp.filter(item => item.name !== value.name);
                    }
                })
            });
        }

        this.filesDocumentDemandante.push(...filesDocumentTemp);
    }

    onRemoveFileDocumentDemandante(event: any) {
        this.filesDocumentDemandante.splice(this.filesDocumentDemandante.indexOf(event), 1);
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

class TipoDeman {
    tide_Id!: string;
    tide_Tipo!: string;
}