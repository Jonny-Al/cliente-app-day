import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validate } from 'class-validator';
import { Usuario } from 'src/app/Model/Usuario';
import { UsuarioServiceService } from 'src/app/Services/Usuario/usuario-service.service';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { Rol } from 'src/app/Model/Rol';
import { RolServiceService } from 'src/app/Services/Rol/rol-service.service';
import { Area } from 'src/app/Model/Area';
import { AreaServiceService } from 'src/app/Services/Area/area-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  areas: Area[] = [];

  constructor(private modalService: NgbModal, private serviceUsuario: UsuarioServiceService, private serviceRol: RolServiceService, private serviceArea: AreaServiceService, private toastService: NgbToastService) { }

  ngOnInit() {
    this.serviceUsuario.getListUsers().subscribe({
      next: (response: any) => {
        this.usuarios = response;
      }, error(response: any) {
        console.log('Error al obtener lista de usuarios: ', response);
      }
    });

    this.serviceRol.getListRoles().subscribe({
      next: (response: any) => {
        this.roles = response;
      }, error(response: any) {
        console.log('Error al obtener la lista de roles: ', response);
      }
    });

    this.serviceArea.getListAreas().subscribe({
      next: (response: any) => {
        this.areas = response;
      }, error(response: any) {
        console.log('Error al obtener la lista de areas: ', response);
      }
    });

  }

  // ==== METODO PARA REGISTRAR UN USUARIO

  userAdd: Usuario = new Usuario();

  addUser(usuario: Usuario) {
    usuario.estado = '1';

    validate(usuario).then(errors => {
      if (errors.length > 0) {
        console.log('Error de campos: ', errors);
      } else {
        // Add usuario
        this.serviceUsuario.addUser(usuario).subscribe({
          next: (response: any) => {
            if (response.message) {
              if (response.message == 'Agregado') {
                this.toastShow('Usuario registrado', NgbToastType.Success);
                this.ngOnInit();
              }
            }
          }, error(response: any) {
            console.log('Error: ' + response);
          }
        });
      }
    });
  }


  // ===== METODO PARA OBTENER USUARIO POR ID PARA ACTUALIZAR

  userUpdate: Usuario = new Usuario();

  editUser(id: number, modal: any) {
    this.userUpdate.id = id;
    this.serviceUsuario.searchUsuario(id).subscribe({
      next: (response: any) => {
        this.userUpdate = response;
        this.openModal(modal, 'modal');
      }, error(response: any) {
        console.log('Error al obtener el usuario: ', response);
      }
    });
  }


  updateUser(usuario: Usuario) {
    this.serviceUsuario.updateUserInfoPersonal(usuario).subscribe({
      next: (response: any) => {
        if (response.message) {
          if (response.message == 'Actualizado') {
            this.toastShow(`Se actualizo a ${this.userUpdate.nombres}  ${this.userUpdate.apellidos}`, NgbToastType.Success);
            this.ngOnInit();
          } else {
            this.toastShow(`No se actualizo a ${this.userUpdate.nombres}  ${this.userUpdate.apellidos}`, NgbToastType.Warning);
          }
        }
      }, error(response: any) {
        console.log('Error al actualizar el usuario: ', response);
      }
    });
  }

  // ====== METODO PARA ELIMINAR UN USUARIO

  uselimina!: String;
  usDelete!: number;

  confirmDeleteUser(id: number, nombreUser: String, apellidoUser: String, modal: any) {
    this.usDelete = id;
    this.uselimina = nombreUser + '  ' + apellidoUser;
    this.openModal(modal, 'modal');
  }

  deleteUser() {
    this.serviceUsuario.deleteUser(this.usDelete).subscribe({
      next: (response: any) => {
        if (response == true) {
          this.toastShow(`Se elimino a: ${this.uselimina}`, NgbToastType.Success);
          this.ngOnInit();
        } else {
          this.toastShow(`No se elimino a: ${this.uselimina}`, NgbToastType.Warning);
        }
      }
    });
  }


  // ======  METODOS PARA MODALES

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

  // ==========

  toastShow(message: any, type: any): void {
    this.closeModal();

    const toast: NgbToast = {
      toastType: type,
      text: message,
      dismissible: true,
      timeInSeconds: 5,
    }
    this.toastService.show(toast);
  }

}
