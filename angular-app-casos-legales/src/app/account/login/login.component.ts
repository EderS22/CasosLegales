import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { ToastService } from './toast-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: UntypedFormBuilder,private authenticationService: AuthenticationService,private router: Router,
    private authFackservice: AuthfakeauthenticationService,private route: ActivatedRoute,public toastService: ToastService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
      email: ['Eder', [Validators.required]],
      password: ['2023', [Validators.required]],
    });

    document.documentElement.setAttribute('data-layout-mode', 'dark');
    document.documentElement.setAttribute('data-body-image', 'img-1');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;

    if(this.loginForm.valid){
        console.log(this.loginForm.value)
        this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe((data: any) => {
          console.log(data)
          if (data.code === 200) {
                if(data.data.usua_Id > 0){
                
                  localStorage.setItem('currentUser', JSON.stringify(data.data));
                  this.router.navigate(['/']);
                } else{
                    this.mensajeWarning("Usuario y/o contraseña incorrectos");
                }
            } else {
                this.mensajeError("Error relacionado con el servidor");
            }
        });    
    }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
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
