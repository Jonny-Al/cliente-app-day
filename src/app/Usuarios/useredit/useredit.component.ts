import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/Model/Usuario';
import { AreaServiceService } from 'src/app/Services/Area/area-service.service';
import { RolServiceService } from 'src/app/Services/Rol/rol-service.service';
import { UsuarioServiceService } from 'src/app/Services/Usuario/usuario-service.service';
import { Rol } from 'src/app/Model/Rol';
import { Area } from 'src/app/Model/Area';
import { FormControl } from '@angular/forms';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  claveConfirm!: string;

  constructor(private serviceUsuario: UsuarioServiceService, private rolService: RolServiceService, private areaService: AreaServiceService, private activatedRoute: ActivatedRoute, private router: Router, private toastService: NgbToastService) { }

  userUpdate: Usuario = new Usuario();
  hide = true;
  roles: Rol[] = [];
  areas: Area[] = []

  ngOnInit() {

    this.serviceUsuario.searchUsuario(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (response: any) => {
        this.userUpdate = response;
      }, error: () => {
        console.log('Error al obtener el usuario: ')
        this.router.navigate(['usuarios']);
      }
    });
  }


  selectRoles = new FormControl();
  filterRoles(event: Event): any {
    const filter = (event.target as HTMLInputElement).value;
    this.rolService.getFilterRol(filter).subscribe({
      next: (response: any) => {
        if (!response.message) {
          this.roles = response;
        }
      }
    });
  }

  selectAreas = new FormControl();
  filterAreas(event: Event): any {
    const filter = (event.target as HTMLInputElement).value;
    this.areaService.getFilterArea(filter).subscribe({
      next: (response: any) => {
        if (!response.message) {
          this.areas = response;
        }
      }
    })
  };

  // === Actualización completa de usuario

  updateCompleteInformation(us: Usuario, claveConfirm: string) {

    us.IdRol = this.selectRoles.value;
    us.IdArea = this.selectAreas.value;

    this.serviceUsuario.updateUserInfo(us, 'Completa').subscribe({
      next: (response: any) => {
        console.log('Se actualizo: ', response);
      }, error: (response: any) => {
        console.log('Error al actualizar el usuario: ', response);
      }
    });
  }


  updateStatus(status: number) {
    this.serviceUsuario.updateStatusUser(status, this.userUpdate.id).subscribe({
      next: (response: any) => {
        if (response.message) {
          console.log('No actualizado: ', response.message)
          this.toastShow('Estado no actualizado', NgbToastType.Warning);
        } else {
          this.userUpdate = response;
          this.toastShow('Estado actualizado', NgbToastType.Success);
        }
      }
    })
  }


  // ======= TOASTS

  toastShow(message: string, type: any): void {

    const toast: NgbToast = {
      toastType: type,
      text: message,
      dismissible: true,
      timeInSeconds: 8,
    }
    this.toastService.show(toast);
  }


}
