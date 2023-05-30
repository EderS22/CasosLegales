import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/pages/services/acceso/usuario/usuarios.service';
import { PanelusuarioService } from 'src/app/pages/services/acceso/panelusuario/panelusuario.service';

@Component({
  selector: 'app-panelusuario',
  templateUrl: './panelusuario.component.html',
  styleUrls: ['./panelusuario.component.scss']
})
export class PanelusuarioComponent implements OnInit {

  breadCrumbItems!: Array<{}>;

  selectedImage!: File;
  imagen!: string;
  isLoadingImage: boolean = false;

  constructor(
    private UsuarioService: UsuariosService,
    private PanelUsuarioService: PanelusuarioService
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
    this.isLoadingImage = true;
    this.selectedImage = event.target.files[0];
    this.PanelUsuarioService.uploadImage(this.selectedImage)
    .subscribe((data: any)=>{
      console.log(data)
      this.imagen = data.data.url;
      console.log(data.data.url)
      console.log(this.imagen)
    })
  }

}
