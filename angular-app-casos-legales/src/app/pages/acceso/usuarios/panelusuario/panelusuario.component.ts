import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/pages/services/acceso/usuario/usuarios.service';
import { PanelusuarioService } from 'src/app/pages/services/acceso/panelusuario/panelusuario.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-panelusuario',
  templateUrl: './panelusuario.component.html',
  styleUrls: ['./panelusuario.component.scss']
})
export class PanelusuarioComponent implements OnInit {

  breadCrumbItems!: Array<{}>;

  selectedImage!: File;
  imagen!: string;
  previewUrl!: string;
  validationform!: UntypedFormGroup;
  submit!: boolean;
  isNextStepEnabled : boolean = true;
  currentStep = 1;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private UsuarioService: UsuariosService,
    private PanelUsuarioService: PanelusuarioService
  ) 
  { 
    this.validationform = this.formBuilder.group({
      usua_Nombre: ['', [Validators.required]],
      usua_Clave: ['', [Validators.required]], 
      usua_ClaveNueva1: ['0', [Validators.required]], 
      usua_ClaveNueva2: ['0', [Validators.required]], 
    });
  }

  ngOnInit(): void {
    /*
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
    */

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

  get form() {
    return this.validationform.controls;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];

    // Generar la vista previa de la imagen
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }


  validSubmit() {
    if (!this.validationform.valid) {
      this.submit = true;
      this.isNextStepEnabled = false; // De
      return; // Detener la ejecución si el formulario no es válido
    } else {
      this.isNextStepEnabled = true; // Ha
      this.currentStep += 1;
    }
  }
  

  validSubmit2() {
    if (!this.validationform.valid) {
      this.submit = true;
      
      return; // Detener la ejecución si el formulario no es válido
    } else {
     
    }
  }
 
}
