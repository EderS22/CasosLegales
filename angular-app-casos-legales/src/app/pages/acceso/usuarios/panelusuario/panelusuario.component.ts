import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/pages/services/acceso/usuario/usuarios.service';

@Component({
  selector: 'app-panelusuario',
  templateUrl: './panelusuario.component.html',
  styleUrls: ['./panelusuario.component.scss']
})
export class PanelusuarioComponent implements OnInit {

  breadCrumbItems!: Array<{}>;

  selectedImage!: File;
  imagen!: string;

  constructor(
    private UsuarioService: UsuariosService,
  ) { }



  ngOnInit(): void {

    const currentUserString = localStorage.getItem('currentUser');
    let currentUser: any; // Puedes ajustar el tipo de 'currentUser' según la estructura del objeto esperado

    if (currentUserString !== null) {
      currentUser = JSON.parse(currentUserString);
      this.imagen = currentUser.usua_img;
    }

    this.breadCrumbItems = [
      { label: 'acceso' },
      { label: 'Panel de Usuario', active: true }
    ];
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

}
