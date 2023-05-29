import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pantalla } from 'src/app/pages/models/acceso/pantalla';
import { rol } from 'src/app/pages/models/acceso/rol';
import { ropa } from 'src/app/pages/models/acceso/rolesporpantalla';
import { RolService } from 'src/app/pages/services/acceso/rol/rol.service';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-agregareditar',
  templateUrl: './agregareditar.component.html',
  styleUrls: ['./agregareditar.component.scss']
})
export class AgregareditarComponent implements OnInit {

  constructor(
    private rolService: RolService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) { }

  breadCrumbItems!: Array<{}>;
  dateNow: Date = new Date();
  isEdit: boolean = false;
  role_IdEditar: number = 0;
  
  listadoPantallas: pantalla[] = [];
  listadoPantallasAcce: pantalla[] = [];
  listadoPantallasGral: pantalla[] = [];
  listadoPantallasCale: pantalla[] = [];

  pantallasTemp: pantalla[] = [];
  pantallasIdsSelects: number[] = [];
  allCorrect: boolean = true;
  submitted = false;
  rolForm!: UntypedFormGroup;
  pantallasValid: boolean = true;

  searchTermAcce$ = new Subject<string>();
  searchTermGral$ = new Subject<string>();
  searchTermCale$ = new Subject<string>();

  pantallasFilteredAcce: pantalla[] = [];
  pantallasFilteredGral: pantalla[] = [];
  pantallasFilteredCale: pantalla[] = [];

  ngOnInit(): void {
    if(!JSON.parse(localStorage.getItem("currentUser") || '').usua_EsAdmin){
        const ropaAcceso = new ropa();
        ropaAcceso.role_Id = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;
        ropaAcceso.pant_Pantalla = "Roles";
        this.rolService.validarRolTienePantalla(ropaAcceso)
        .subscribe((data:any) => {
            if(data.code === 200){
                if(data.data.codeStatus === 0){
                    this.router.navigate([""]);
                }
            }
        })
    }

    this.role_IdEditar = parseInt(localStorage.getItem("role_IdEditar") ?? '0', 0);

    this.breadCrumbItems = [
      { label: 'Roles' },
      { label: 'Agregar y editar', active: true }
    ];

    this.CargarPantallasPorIdRol(0, true);

    this.rolForm = this.formBuilder.group({
      role_Id: [0],
      role_Nombre: ['', [Validators.required]],
      role_Descripcion: ['', [Validators.required]]
    });

    if (this.role_IdEditar > 0) {
      this.isEdit = true;

      this.rolService.cargarRolById(this.role_IdEditar)
        .subscribe((data: any) => {
          if (data.code === 200) {
            this.form['role_Id'].setValue(data.data.role_Id);
            this.form['role_Nombre'].setValue(data.data.role_Nombre);
            this.form['role_Descripcion'].setValue(data.data.role_Descripcion);

            this.rolService.getPantallasPorRolYAdmin(data.data.role_Id, false)
              .subscribe((datos: any) => {
                if (datos.code === 200) {
                  this.pantallasTemp = datos.data;
                  this.pantallasTemp.forEach(elemento => {
                    this.rolForm.setControl(`pant_${elemento.pant_Id}`, new FormControl(true))
                  });
                }
              })
          }
        })
    }
    this.filterListAcce();
    this.filterListGral();
    this.filterListCale();
  }

  filterListAcce(): void {
    this.searchTermAcce$.subscribe(term => {
      this.pantallasFilteredAcce = this.listadoPantallasAcce
      .filter(item => item.pant_Pantalla.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }

  filterListGral(): void {
    this.searchTermGral$.subscribe(term => {
      this.pantallasFilteredGral = this.listadoPantallasGral
      .filter(item => item.pant_Pantalla.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }

  filterListCale(): void {
    this.searchTermCale$.subscribe(term => {
      this.pantallasFilteredCale = this.listadoPantallasCale
      .filter(item => item.pant_Pantalla.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }


  CargarPantallasPorIdRol(role_Id: number, usua_EsAdmin: boolean) {
    this.rolService.getPantallasPorRolYAdmin(role_Id, usua_EsAdmin)
      .subscribe((data: any) => {
        if (data.code === 200) {
          this.listadoPantallas = data.data;

          this.listadoPantallas.forEach(element => {
            this.rolForm.addControl(`pant_${element.pant_Id}`, new FormControl(false))

            if(element.pant_Esquema === "Acceso"){
                this.listadoPantallasAcce.push(element);
            }

            if(element.pant_Esquema === "General"){
                this.listadoPantallasGral.push(element);
            }

            if(element.pant_Esquema === "CasosLegales"){
                this.listadoPantallasCale.push(element);
            }
          });

          this.pantallasFilteredAcce = this.listadoPantallasAcce;
          this.pantallasFilteredGral = this.listadoPantallasGral;
          this.pantallasFilteredCale = this.listadoPantallasCale;
        }
      })
  }

  get form() {
    return this.rolForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.pantallasIdsSelects = [];
    this.allCorrect = true;

    this.listadoPantallas.forEach(element => {
      if (this.form[`pant_${element.pant_Id}`].value) {
        this.pantallasIdsSelects.push(element.pant_Id);
      }
    })

    if (this.pantallasIdsSelects.length > 0) {
      this.pantallasValid = true;

      if (this.rolForm.valid) {
        if (this.isEdit) {
          this.rolService.validarRolexiste(this.form['role_Nombre'].value)
            .subscribe((response: any) => {
              if (response.code === 200) {
                if (response.data.codeStatus > 0) {
                  if (response.data.codeStatus === this.form['role_Id'].value) {
                    const rolEditar = new rol();
                    rolEditar.role_Id = this.form['role_Id'].value;
                    rolEditar.role_Nombre = this.form['role_Nombre'].value;
                    rolEditar.role_Descripcion = this.form['role_Descripcion'].value;
                    rolEditar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                    this.rolService.actualizarRol(rolEditar)
                      .subscribe((respuesta: any) => {
                        if (respuesta.code === 200) {
                          const ropaEliminar = new ropa();

                          ropaEliminar.role_Id = this.form['role_Id'].value;
                          ropaEliminar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                          this.rolService.eliminarPantallasdeRol(ropaEliminar)
                            .subscribe((data: any) => {
                              if (data.code === 200) {
                                if (data.data.codeStatus === 1) {
                                  this.pantallasIdsSelects.forEach(element => {
                                    const ropaInsert = new ropa();

                                    ropaInsert.role_Id = this.form['role_Id'].value;
                                    ropaInsert.pant_Id = element;
                                    ropaInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                    this.rolService.insertarRopa(ropaInsert).subscribe((data2: any) => {
                                      if (data2.code === 200) {
                                        if (data2.data.codeStatus !== 1) {
                                          this.allCorrect = false;
                                        }
                                      }
                                    })
                                  });

                                  if (this.allCorrect) {
                                    this.mensajeSuccess('Rol editado con éxito');
                                    setTimeout(() => {
                                      this.router.navigate(["acceso/roles/listado"]);
                                    }, 2000);
                                  } else {
                                    this.mensajeError('Ocurrio un error al intentar editar el rol');
                                  }
                                }
                              } else {
                                this.mensajeError('Ocurrio un error al intentar editar el rol');
                              }
                            })
                        }
                      })
                  } else {
                    this.mensajeWarning('El nombre del rol ya existe');
                  }
                } else {
                  const rolEditar = new rol();
                  rolEditar.role_Id = this.form['role_Id'].value;
                  rolEditar.role_Nombre = this.form['role_Nombre'].value;
                  rolEditar.role_Descripcion = this.form['role_Descripcion'].value;

                  this.rolService.actualizarRol(rolEditar)
                    .subscribe((respuesta: any) => {
                      if (respuesta.code === 200) {
                        const ropaEliminar = new ropa();

                        ropaEliminar.role_Id = this.form['role_Id'].value;
                        ropaEliminar.usua_IdModificacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                        this.rolService.eliminarPantallasdeRol(ropaEliminar)
                          .subscribe((data: any) => {
                            if (data.code === 200) {
                              if (data.data.codeStatus === 1) {
                                this.pantallasIdsSelects.forEach(element => {
                                  const ropaInsert = new ropa();

                                  ropaInsert.role_Id = this.form['role_Id'].value;
                                  ropaInsert.pant_Id = element;
                                  ropaInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                                  this.rolService.insertarRopa(ropaInsert).subscribe((data2: any) => {
                                    if (data2.code === 200) {
                                      if (data2.data.codeStatus !== 1) {
                                        this.allCorrect = false;
                                      }
                                    }
                                  })
                                });

                                if (this.allCorrect) {
                                  this.mensajeSuccess('Rol editado con éxito');
                                  setTimeout(() => {
                                    this.router.navigate(["acceso/roles/listado"]);
                                  }, 2000);
                                } else {
                                  this.mensajeError('Ocurrio un error al intentar editar el rol');
                                }
                              }
                            } else {
                              this.mensajeError('Ocurrio un error al intentar editar el rol');
                            }
                          })
                      }
                    })
                }
              }
            })
        } else {
          this.rolService.validarRolexiste(this.form['role_Nombre'].value)
            .subscribe((response: any) => {
              if (response.code === 200) {
                if (response.data.codeStatus > 0) {
                  this.mensajeWarning('El nombre del rol ya existe');
                } else {
                  const rolInsert = new rol();

                  rolInsert.role_Nombre = this.form['role_Nombre'].value;
                  rolInsert.role_Descripcion = this.form['role_Descripcion'].value;
                  rolInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                  this.rolService.insertarNuevoRol(rolInsert)
                    .subscribe((data: any) => {
                      if (data.code === 200) {
                        if (data.data.codeStatus > 0) {
                          this.pantallasIdsSelects.forEach(element => {
                            const ropaInsert = new ropa();

                            ropaInsert.role_Id = data.data.codeStatus;
                            ropaInsert.pant_Id = element;
                            ropaInsert.usua_IdCreacion = JSON.parse(localStorage.getItem("currentUser") || '').usua_Id;

                            this.rolService.insertarRopa(ropaInsert).subscribe((data2: any) => {
                              if (data2.code === 200) {
                                if (data2.data.codeStatus !== 1) {
                                  this.allCorrect = false;
                                }
                              }
                            })
                          });

                          if (this.allCorrect) {
                            this.mensajeSuccess('Rol añadido con éxito');
                            setTimeout(() => {
                              this.router.navigate(["acceso/roles/listado"]);
                            }, 2000);
                          } else {
                            this.mensajeError('Ocurrio un error al intentar agregar el rol');
                          }
                        }
                      } else {
                        this.mensajeError('Ocurrio un error al intentar editar el rol');
                      }
                    })
                }
              }
            })
        }
      }
    } else {
      this.pantallasValid = false;
    }
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
