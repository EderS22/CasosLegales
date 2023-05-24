import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/acceso/usuario/usuarios.service';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import { usuario } from '../../../models/acceso/usuario';
import { empleado } from 'src/app/pages/models/casoslegales/empleados';
import { rol } from 'src/app/pages/models/acceso/rol';
// Sweet Alert
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})

export class ListadoComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!:DataTableDirective;

  breadCrumbItems!: Array<{}>;
  usuarios!: usuario[];
  empleadosNoTienenUsuario!: empleado[];
  listadoRoles!: rol[];
  usuarioForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  isEdit = false;
  usua_NombreEdit = '';
  usua_IdEditar = 0;
  empe_IdEditar = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal, 
    private service: UsuariosService, 
    private rolService: RolService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Usuarios' },
      { label: 'Listado', active: true }
    ];

    this.LoadEmpleadosNoTienenUsuario();
    this.LoadRoles();

    this.usuarioForm = this.formBuilder.group({
      usua_Nombre: ['', [Validators.required]],
      usua_EsAdmin: [false],
      usua_Clave: [''],
      role_Id: [''],
      empe_Id: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.dtOptions = {
        pagingType: 'simple_numbers',
        language: {
          url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json",
        },
        columnDefs: [
          {
            targets: 6,
            orderable: false,
          },
          {
            targets: 2,
            orderable: false,
          },
        ]
      };
      this.LoadUsuarios();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.LoadUsuarios();
    });
  }

  LoadUsuarios() {
    this.service.getUsuarios().subscribe((data: any) => {
      if (data.code === 200) {
        this.usuarios = data.data;
        this.dtTrigger.next(null);
      }
    })
  }

  LoadEmpleadosNoTienenUsuario() {
    this.service.getEmpleadosNoTienenUsuario().subscribe((data: any) => {
      if (data.code === 200) {
        this.empleadosNoTienenUsuario = data.data;
      }
    })
  }

  LoadRoles() {
    this.rolService.getListadoRoles().subscribe((data: any) => {
      if (data.code === 200) {
        this.listadoRoles = data.data;
      }
    })
  }

  /**
  * Open modal
  * @param content modal content
  */
  openModal(content: any, id: number) {
    this.submitted = false;

    if (id > 0) {
      this.isEdit = true;
      this.service.getUsuarioEditar(id).subscribe((data: any) => {
        if (data.code === 200) {
          this.form['usua_Nombre'].setValue(data.data.usua_Nombre);
          this.form['empe_Id'].setValue(data.data.empe_Id);
          this.usua_IdEditar = data.data.usua_Id;
          this.empe_IdEditar = data.data.empe_Id;
          this.usua_NombreEdit = data.data.empe_Nombres + [' '] + data.data.empe_Apellidos;
          this.form['usua_EsAdmin'].setValue(data.data.usua_EsAdmin);
          this.form['role_Id'].setValue(data.data.role_Id);
        }
      })
    } else {
      this.isEdit = false;
      this.usua_IdEditar = 0;
      this.empe_IdEditar = '';
      this.form['usua_Nombre'].setValue('');
      this.form['empe_Id'].setValue('');
      this.form['usua_EsAdmin'].setValue(false);
      this.form['role_Id'].setValue('');
    }

    this.modalService.open(content, { size: 'md', centered: true, backdrop: 'static' });
  }


  /**
 * Eliminar registro
 */
  usua_IdEliminar: any;
  openEliminar(content: any, id: any) {
    if(id === JSON.parse(localStorage.getItem("currentUser") || '').usua_Id){
      this.mensajeWarning('No puede eliminar su propio usuario');
    }else{
      this.usua_IdEliminar = id;
      this.modalService.open(content, { centered: true, backdrop: 'static' });
    }
  }

  /**
  * Form data get
  */
  get form() {
    return this.usuarioForm.controls;
  }

  guardarUsuario() {
    this.submitted = true;

    if (this.isEdit) {
      this.form['usua_Clave'].reset();
    } else {
      if (this.usuarioForm.get('usua_Clave')?.value === '' || this.usuarioForm.get('usua_Clave')?.value === null) {
        this.form['usua_Clave'].setErrors([Validators.required]);
      }
    }

    if (!this.usuarioForm.get('usua_EsAdmin')?.value) {
      if (this.usuarioForm.get('role_Id')?.value === '' || this.usuarioForm.get('role_Id')?.value === null) {
        this.form['role_Id'].setErrors([Validators.required]);
      }
    } else {
      this.form['role_Id'].reset();
    }

    if (this.usuarioForm.valid) {
      if (this.isEdit) {
        this.service.validarUsernameExiste(this.usuarioForm.get('usua_Nombre')?.value).subscribe((data: any) => {
          if (data.code === 200) {
            const idUsername = data.data.codeStatus;
            if (idUsername > 0) {
              if (idUsername === this.usua_IdEditar) {
                const usuarioEdit = new usuario();

                usuarioEdit.usua_Id = this.usua_IdEditar;
                usuarioEdit.usua_Nombre = this.usuarioForm.get('usua_Nombre')?.value;
                usuarioEdit.usua_EsAdmin = this.usuarioForm.get('usua_EsAdmin')?.value;
                usuarioEdit.role_Id = this.usuarioForm.get('role_Id')?.value ?? 0;
                usuarioEdit.empe_Id = this.usuarioForm.get('empe_Id')?.value;
                usuarioEdit.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                this.service.editarUsuario(usuarioEdit).subscribe((data: any) => {
                  if (data.code === 200) {
                    if (data.data.codeStatus === 1) {
                      this.mensajeSuccess('Datos del usuario editados con exito');
                      this.modalService.dismissAll();   
                      this.rerender();

                      localStorage.removeItem("currentUser");
                      this.service.getUsuarioEditar(usuarioEdit.usua_Id)
                      .subscribe((data:any) => {
                        if(data.code === 200){
                            localStorage.setItem("currentUser", JSON.stringify(data.data));
                        }
                      });
                    } else {
                      this.mensajeError('Ocurrio un error al intentar editar el usuario');
                    }
                  } else {
                    this.mensajeError('Error relacionado con el servidor');
                  }
                });
              } else {
                this.mensajeWarning('El nombre de usuario ya existe');
              }
            }
          }

        });
      } else {
        this.service.validarUsernameExiste(this.usuarioForm.get('usua_Nombre')?.value).subscribe((data: any) => {
          if (data.code === 200) {
            const idUsername = data.data.codeStatus;
            if (idUsername > 0) {
              this.mensajeWarning('El nombre de usuario ya existe');
            } else {
              const usuarioInsert = new usuario();

              usuarioInsert.usua_Nombre = this.usuarioForm.get('usua_Nombre')?.value;
              usuarioInsert.usua_Clave = this.usuarioForm.get('usua_Clave')?.value;
              usuarioInsert.usua_EsAdmin = this.usuarioForm.get('usua_EsAdmin')?.value;
              usuarioInsert.role_Id = this.usuarioForm.get('role_Id')?.value ?? 0;
              usuarioInsert.empe_Id = this.usuarioForm.get('empe_Id')?.value;
              usuarioInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;


              this.service.insertarNuevoUsuario(usuarioInsert).subscribe((data: any) => {
                if (data.code === 200) {
                  if (data.data.codeStatus === 1) {
                    this.mensajeSuccess('Usuario agregado con exito');
                    this.rerender();
                  } else {
                    this.mensajeError('Ocurrio un error al intentar agregar el usuario');
                  }
                } else {
                  this.mensajeError('Error relacionado con el servidor');
                }
              });
            }
          }
        });
      }
    }
  }

  eliminarUsuario(usua_IdEliminar: number) {
    if (usua_IdEliminar > 0) {
      const usuarioEliminar = new usuario();

      usuarioEliminar.usua_Id = usua_IdEliminar;
      usuarioEliminar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

      this.service.eliminarUsuario(usuarioEliminar)
        .subscribe((data: any) => {
          if (data.code === 200) {
            if (data.data.codeStatus === 1) {
              this.mensajeSuccess('Usuario eliminado con exito');
              this.rerender();
            } else {
              this.mensajeError('Ocurrio un error al intentar eliminar el usuario');
            }
          } else {
            this.mensajeError('Error relacionado con el servidor');
          }
        })
    }
  }

  detallesUsuario(id: number){
    localStorage.setItem("usua_IdDetalles", id.toString());
    this.router.navigate(["acceso/usuarios/detalles"]);
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
