import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/Model/Categorias'
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  categoria!: Categorias[];
  constructor(private service: ServiceService, private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.service.getCategoria()
    .subscribe(data=>{
      console.log(data);
      this.categoria = data;
    })
  }
}
