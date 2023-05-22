import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { TiposdecasoService } from '../../../services/casolegales/tiposdecasoservice/tiposdecaso.service';
import { tiposdecaso } from '../../../models/casoslegales/tiposdecaso';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent {
  tdp: tiposdecaso = new tiposdecaso();

  content!: tiposdecaso[];
  checkedValGet: any[] = [];
  submitted = false;
  breadCrumbItems!: Array<{}>;
  tiposdecasos!: tiposdecaso[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: TiposdecasoService, private modalService: NgbModal){}

  ngOnInit(): void {
    
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
        },
        columnDefs: [
            {
                targets: 2, 
                orderable: false,
            }  
        ]
    };
    this.LoadTiposdecaso();

    this.breadCrumbItems = [
      { label: 'TiposdeCaso' },
      { label: 'Listado', active: true }
    ];
  }

  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true, backdrop:'static' });
  }

  openModalDelete(content: any, C: tiposdecaso) {
    this.tdp = C;
    console.log(this.tdp);
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true, backdrop:'static' });
  }

  // deleteData(id: any) {
  //   if (id) {
  //     this.service.deleteData(id).subscribe({
  //       next: data => { },
  //       error: err => {
  //         this.content = JSON.parse(err.error).message;
  //       }
  //     });
  //     document.getElementById('TiposDeCaso/Eliminar' + id)?.remove();
  //   }  
  //   else {
  //     this.checkedValGet.forEach((item: any) => {
  //       document.getElementById('TiposDeCaso/Eliminar' + item)?.remove();
  //     });
  //     (document.getElementById("selection-element") as HTMLElement).style.display = "none"
  //   }
  // }

  // deleteId: any;
  // confirm(content: any, id: any) {
  //   this.deleteId = id;
  //   this.modalService.open(content, { centered: true });
  //   console.log(id);
  //   console.log("Hola");
  // }

  deleteData() {    
    if(this.tdp.tica_Id == null){

    }
    else{
      this.service.deleteData(this.tdp)
      .subscribe((data:any)=>{
        console.log(data);
      })
    }
  }

  LoadTiposdecaso(){
    this.service.getTiposdecaso().subscribe((data:any) => {
        if(data.code === 200){
          this.tiposdecasos = data.data;
          console.log(this.tiposdecasos);
          this.dtTrigger.next(null);
        }
    })
  }

}
