import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validate } from 'class-validator';
import { Usuario } from 'src/app/Model/Usuario';
import { UsuarioServiceService } from 'src/app/Services/Usuario/usuario-service.service';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { Rol } from 'src/app/Model/Rol';
import { RolServiceService } from 'src/app/Services/Rol/rol-service.service';
import { Area } from 'src/app/Model/Area';
import { AreaServiceService } from 'src/app/Services/Area/area-service.service';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})



export class UsersComponent implements OnInit {
  hide = true; // Para ver password ingresada en modal #modalAddUser

  
  // == Lista de usuarios con paginación
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listUsuarios: Usuario[] = [];// para lista en tabla de usuarios

  displayedColumns: string[] = ['Nombres', 'Apellidos', 'Correo', 'Telefono', 'Cargo', 'Area', 'Acciones'];
  dataSource = new MatTableDataSource<Usuario>(this.listUsuarios);

  ngAfterViewInit() { // Add paginación a datasource
    this.dataSource.paginator = this.paginator;
  }

  // Filtra tabla por lo ingresado en tabla en campo #input
  tableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ===========
  roles: Rol[] = []; // --> para lista en select option #modalAddUser
  areas: Area[] = []; // --> para lista en select option #modalAddUser

  constructor(private modalService: NgbModal, private serviceUsuario: UsuarioServiceService, private serviceRol: RolServiceService, private serviceArea: AreaServiceService, private toastService: NgbToastService) { }

  ngOnInit() {

    // == Obtiene la lista de usuarios
    this.serviceUsuario.getListUsers().subscribe({
      next: (response: any) => {
        this.dataSource.data = response as Usuario[];
      }, error(response: any) {
        console.log('Error al obtener lista de usuarios: ', response);
      }
    });

    // == Obtiene la lista de roles
    this.serviceRol.getListRoles().subscribe({
      next: (response: any) => {
        this.roles = response;
      }, error(response: any) {
        console.log('Error al obtener la lista de roles: ', response);
      }
    });

    // == Obtiene la lista de areas
    this.serviceArea.getListAreas().subscribe({
      next: (response: any) => {
        this.areas = response;
      }, error(response: any) {
        console.log('Error al obtener la lista de areas: ', response);
      }
    });

  }

  // ==== METODO PARA REGISTRAR UN USUARIO

  userAdd: Usuario = new Usuario(); // --> para formulario ngModel de registro en #modalAddUser
  // Agrega usuario desde el modal #modalAddUser
  addUser(usuario: Usuario, form: NgForm) {
    usuario.estado = 1;

    validate(usuario).then(errors => {
      if (errors.length > 0) {
        console.log('Error de campos al agregar usuario: ', errors); // Imprime errores que encuentra en atributos
      } else {
        // Add usuario
        this.serviceUsuario.addUser(usuario).subscribe({
          next: (response: any) => {
            if (response.message) {
              if (response.message == 'Agregado') {
                form.onReset(); // Limpia los campos del formulario
                this.toastShow('Usuario registrado', NgbToastType.Success);
                this.ngOnInit();
              }
            }
          }, error: (response: any) => {
            console.log('Error de petición: ', response);
          }
        });
      }
    });
  }

  // ===== METODO PARA OBTENER USUARIO POR ID PARA ACTUALIZAR

  userUpdate: Usuario = new Usuario(); // --> para formulario ngModel de actualizacion en #modalUpdateUser

  // Al seleccionar usuario en lapiz de table obtiene los datos de service y refleja en modal #modalUpdateUser 
  editUser(id: number, modal: any) {
    this.userUpdate.id = id;
    this.serviceUsuario.searchUsuario(id).subscribe({
      next: (response: any) => {
        this.userUpdate = response;
        this.openModal(modal, 'modal');
      }, error: (response: any) => {
        console.log('Error al obtener el usuario: ', response);
      }
    });
  }

  // === Actualiza desde el modal #modalUpdateUser
  updateUser(usuario: Usuario) {

    validate(usuario).then(errors => {
      if (errors.length > 0) {
        console.log('Error de campos al actualizar usuario: ', errors); // Imprime errores que encuentra en atributos
      } else {
        // Update usuario
        this.serviceUsuario.updateUserInfoPersonal(usuario).subscribe({
          next: (response: any) => {
            if (response.message) {
              if (response.message == 'Actualizado') {
                this.toastShow(`Se actualizo a:  ${this.userUpdate.nombres}  ${this.userUpdate.apellidos}`, NgbToastType.Success);
                this.ngOnInit();
              } else {
                this.toastShow(`No se actualizo a: ${this.userUpdate.nombres}  ${this.userUpdate.apellidos}`, NgbToastType.Warning);
              }
            }
          }, error: (response: any) => {
            console.log('Error al actualizar el usuario: ', response);
          }
        });
      }
    });
  }

  // ====== METODOS PARA ELIMINAR UN USUARIO

  uselimina!: String;
  usDelete!: number;

  // == Seleccion de usuario que se va eliminar confirma abriendo el modal #modalDeleteUser
  confirmDeleteUser(id: number, nombreUser: String, apellidoUser: String, modal: any) {
    this.usDelete = id;
    this.uselimina = nombreUser + '  ' + apellidoUser;
    this.openModal(modal, 'modal');
  }

  // Elimina desde el modal #modalDeleteUser
  deleteUser() {
    this.serviceUsuario.deleteUser(this.usDelete).subscribe({
      next: (response: any) => {
        if (response == true) {
          this.toastShow(`Se elimino a: ${this.uselimina}`, NgbToastType.Success);
          this.ngOnInit();
        } else {
          this.toastShow(`No se logro eliminar a: ${this.uselimina}`, NgbToastType.Warning);
        }
      }
    });
  }


  // ======  METODOS PARA MODALES


  // ==== MUESTRA MODALES CON ALERTAS QUE PASAN EN EL SISTEMA  --> aun no se usa
  classalert!: String;
  message!: String;

  alertModal(modal: any, message: String, alerttype: number) {

    switch (alerttype) {

      case 1:
        this.classalert = 'alert-success';
        break;

      case 2:
        this.classalert = 'alert-danger';
        break;

      case 3:
        this.classalert = 'alert-warning';
        break;

    }

    this.modalService.dismissAll();
    this.message = message;
    this.modalService.open(modal);

  }

  openModal(modal: any, type: any) {
    this.modalService.open(modal, { size: type });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  // ========== MENSAJES EN TOAST

  toastShow(message: any, type: any): void {
    this.closeModal();

    const toast: NgbToast = {
      toastType: type,
      text: message,
      dismissible: true,
      timeInSeconds: 8,
    }
    this.toastService.show(toast);
  }

}


