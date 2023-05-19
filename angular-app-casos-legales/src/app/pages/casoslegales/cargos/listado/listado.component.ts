import { Component , ViewChildren } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

import {ListJsModel} from './listjs.model';
import { OrdersService } from './listjs.service';
import { NgbdOrdersSortableHeader, SortEvent } from './listjs-sortable.directive';

@Component({
  selector: 'app-listado',
  // templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {

  breadCrumbItems!: Array<{}>;
  submitted = false;
  listJsForm!: UntypedFormGroup;
  ListJsData!: ListJsModel[];
  checkedList:any;
  masterSelected!:boolean;
  ListJsDatas:any;

  checkedValGet: any[] = [];
  ListJsList!: Observable<ListJsModel[]>;
  total: Observable<number>;
  constructor(private modalService: NgbModal,public service: OrdersService, private formBuilder: UntypedFormBuilder) {
    this.ListJsList = service.countries$;
    this.total = service.total$;
  }


  deleteData(id:any) {    
    if(id){
      document.getElementById('lj_'+id)?.remove();   
    }
    else{      
      this.checkedValGet.forEach((item:any)=>{
        document.getElementById('lj_'+ item)?.remove();      
      });
    }
  }

   /**
   * Open modal
   * @param content modal content
   */
    editModal(content: any,id:any) {
      this.submitted = false;
      this.modalService.open(content, { size: 'md', centered: true });
      var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
      updateBtn.innerHTML = "Update";
      var listData = this.ListJsDatas.filter((data: { id: any; }) => data.id === id);      
      this.listJsForm.controls['Descripcion'].setValue(listData[0].descripcion);
    }

}
