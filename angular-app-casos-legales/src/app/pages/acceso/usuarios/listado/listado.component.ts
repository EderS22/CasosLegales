import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
     /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Usuarios' },
      { label: 'Listado', active: true }
    ];
  }
}
