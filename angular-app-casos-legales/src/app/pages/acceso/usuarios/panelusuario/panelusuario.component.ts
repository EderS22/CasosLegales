import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/pages/services/acceso/usuario/usuarios.service';
import { PanelusuarioService } from 'src/app/pages/services/acceso/panelusuario/panelusuario.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panelusuario',
  templateUrl: './panelusuario.component.html',
  styleUrls: ['./panelusuario.component.scss'],
})
export class PanelusuarioComponent implements OnInit {
  @ViewChild('submitButton', { static: false }) submitButton!: any;
  @ViewChild('PrimeraFase', { static: false }) PrimeraFase!: any;

  breadCrumbItems!: Array<{}>;

  selectedImage!: File;
  imagen!: string;
  previewUrl!: string;
  validationform!: UntypedFormGroup;
  update!: UntypedFormGroup;
  submit!: boolean;
  mostrarBotonImg: boolean = true;
  NombreUsuario!:string;
  RolDescripcion!:string;
  NombreEmpleado!: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private UsuarioService: UsuariosService,
    private AuthenticationService: AuthenticationService,
    private PanelUsuarioService: PanelusuarioService,
  ) {
    this.validationform = this.formBuilder.group({
      usua_Nombre: ['', [Validators.required]],
      usua_Clave: ['', [Validators.required]],
      usua_ClaveNueva1: ['0', [Validators.required]],
      usua_ClaveNueva2: ['0', [Validators.required]],
    });

    this.update = this.formBuilder.group({
      usua_Id: [null, [Validators.required]],
      usua_Nombre: ['', [Validators.required]],
      usua_EsAdmin: [false, [Validators.required]],
      usua_img: ['', [Validators.required]],
      role_Id: [null, [Validators.required]],
      empe_Id: [null, [Validators.required]],
      usua_IdModificacion: [1, [Validators.required]],
    })
  }

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    let currentUser: any; // Puedes ajustar el tipo de 'currentUser' según la estructura del objeto esperado

    if (currentUserString !== null) {
      currentUser = JSON.parse(currentUserString);
      
      this.imagen = currentUser.usua_img;
      this.NombreEmpleado= currentUser.empe_Nombres + ' ' + currentUser.empe_Apellidos;
      this.RolDescripcion = currentUser.role_Nombre;
      this.NombreUsuario = currentUser.usua_Nombre;

      console.log(currentUser);

      this.update = this.formBuilder.group({
        usua_Id: [currentUser.usua_Id, [Validators.required]],
        usua_Nombre: [currentUser.usua_Nombre, [Validators.required]],
        usua_EsAdmin: [currentUser.usua_EsAdmin, [Validators.required]],
        usua_img: [currentUser.usua_img, [Validators.required]],
        role_Id: [currentUser.role_Id, [Validators.required]],
        empe_Id: [currentUser.empe_Id, [Validators.required]],
        usua_IdModificacion: [1, [Validators.required]],
      })
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
    this.mostrarBotonImg = false;
    // Generar la vista previa de la imagen
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);

  }

  guardarImagen() {
    this.PanelUsuarioService.uploadImage(this.selectedImage)
      .subscribe((data: any) => {

        if (data.status === 200) {
          this.imagen = data.data.url;
          this.mostrarBotonImg = true;
          this.update.get('usua_img')?.setValue(this.imagen);
          this.mandarimagenactualizada()
          console.log(data)
          console.log(data.data.url)
          console.log(this.imagen)
        }
      })
  }

  mandarimagenactualizada(){
    this.UsuarioService.editarUsuario(this.update.value)
    .subscribe((data:any)=>{
      console.log(data)
    })
  }


  validSubmit() {
    this.validationform.get('usua_ClaveNueva1')?.setValue('0');
    this.validationform.get('usua_ClaveNueva2')?.setValue('0');
    if (!this.validationform.valid) {
      this.submit = true;
    } else {

      const nombreUsuario = this.validationform.get('usua_Nombre')?.value;
      const clave = this.validationform.get('usua_Clave')?.value;

      const currentUserString = localStorage.getItem('currentUser');
      let currentUser: any; // Puedes ajustar el tipo de 'currentUser' según la estructura del objeto esperado

      if (currentUserString !== null) {

        currentUser = JSON.parse(currentUserString);
        if (nombreUsuario != currentUser.usua_Nombre) {
          this.mensajeWarning("La validación ha resultado fallida. Los datos proporcionados no coinciden.");
        }
        else {
          this.AuthenticationService.login(nombreUsuario, clave)
            .subscribe((data: any) => {
              if (data.data.usua_Id > 0) {

                this.mensajeSuccess("¡Validación exitosa! Ahora puede avanzar al siguiente apartado de manera segura.")
                this.validationform.get('usua_ClaveNueva1')?.setValue('');
                this.validationform.get('usua_ClaveNueva2')?.setValue('');
                this.submit = false;
                this.cambiarSegundaFace();
              } else {

                this.mensajeWarning("La validación ha resultado fallida. Los datos proporcionados no coinciden.");
              }
            })
        }
      }
    }
  }

  validSubmit2() {
    if (!this.validationform.valid) {
      this.submit = true;
    } else {
      const constrasenia1 = this.validationform.get('usua_ClaveNueva1')?.value;
      const constrasenia2 = this.validationform.get('usua_ClaveNueva2')?.value;

      if (constrasenia1 != constrasenia2) {
        this.mensajeWarning("La validación ha resultado fallida. Las contraseñas proporcionadas no coinciden.");
      }
      else {

        const nombreUsuario = this.validationform.get('usua_Nombre')?.value;
        const password = this.validationform.get('usua_ClaveNueva2')?.value;

        this.AuthenticationService.resetPassword(nombreUsuario, password)
          .subscribe((data: any) => {
            this.realizarClickEnBoton()
          })
      }

    }
  }

  realizarClickEnBoton() {
    this.submitButton.nativeElement.click();
  }

  cambiarSegundaFace() {
    this.PrimeraFase.nativeElement.click();
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
      timer: 2000,
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
