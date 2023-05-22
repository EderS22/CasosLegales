import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DepartamentoService } from 'src/app/pages/services/general/departamentoservice/departamento.service';
import { departamento } from 'src/app/pages/models/general/departeamento';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {

  depa: departamento = new departamento();
  

  breadCrumbItems!: Array<{}>;
  depto!: departamento[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  submitted = false;
  dp!: UntypedFormGroup;

  constructor(private service: DepartamentoService, private modalService: NgbModal, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {

    this.dp = this.formBuilder.group({

      depa_Nombre: ['', [Validators.required]]
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
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
    this.loadDeptos();

    this.breadCrumbItems = [
      { label: 'Departamentos' }, 
      { label: 'Listado', active: true }
    ];
  }

  loadDeptos(){
    this.service.getDepartamentos().subscribe((data:any) => {
      if(data.code === 200){
        this.depto = data.data
        this.dtTrigger.next(null);
      }
    })
  }

  get form() {
    return this.dp.controls;
  }

  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static' });
  }

  GuardarDepartamento(){
    this.depa.depa_UsuCreacion = 1;
    this.service.InsertDepartameto(this.depa)
    .subscribe((data: any) => {
      if(data.data.codeStatus == 1){
        this.modalService.dismissAll();
      }
      else if(data.data.codeStatus == 2){
        alert("departamento repetido")
      }
    })
  }

  EditarDepartamento(d: departamento, contentEdit: any):void {
    this.depa = d;
    console.log(this.depa);
    this.openModalEdit(contentEdit)
  }

  openModalEdit(contentEdit: any){
    this.submitted = false;
    this.modalService.open(contentEdit, { size: 'md', centered: true, backdrop: 'static' });
  }
}
