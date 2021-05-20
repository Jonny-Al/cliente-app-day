import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/Model/Usuario';
import { AreaServiceService } from 'src/app/Services/Area/area-service.service';
import { RolServiceService } from 'src/app/Services/Rol/rol-service.service';
import { UsuarioServiceService } from 'src/app/Services/Usuario/usuario-service.service';
import { Rol } from 'src/app/Model/Rol';
import { Area } from 'src/app/Model/Area';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

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

    if (this.roles.length > 0) {
      for (let r of this.roles) {
        if (us.Rol.cargo == r.cargo) {
          us.IdRol = r.IdRol;
          break;
        }
      }
    } else {
      us.IdRol = this.userUpdate.Rol.IdRol;
    }

    if (this.areas.length > 0) {
      for (let a of this.areas) {
        if (us.Area.area == a.area) {
          us.IdArea = a.IdArea;
          break;
        }
      }
    } else {
      us.IdArea = this.userUpdate.Area.IdArea;
    }

    if (us.clave == claveConfirm && us.IdArea != null && us.IdRol != null) {
      this.serviceUsuario.updateUserInfo(us, 'Completa').subscribe({
        next: (response: any) => {
          if (response.message == "Actualizado") {
            this.toastShow(`El usuario ${this.userUpdate.nombres} ${this.userUpdate.apellidos} fue actualizado`, NgbToastType.Success);
          } else {
            this.toastShow(`${response.message}`, NgbToastType.Danger);
          }
        }, error: (response: any) => {
          this.toastShow('Usuario no actualizado', NgbToastType.Warning);
          console.log('Error al actualizar el usuario: ', response);
        }
      });
    }

  }


  updateStatus(status: number) {
    this.serviceUsuario.updateStatusUser(status, this.userUpdate.id).subscribe({
      next: (response: any) => {
        if (response.message) {
          console.log('No actualizado: ', response.message)
          this.toastShow('Estado no actualizado', NgbToastType.Warning);
        } else {
          this.userUpdate = response;
          if (status == 1) {
            this.toastShow(`${this.userUpdate.nombres} ${this.userUpdate.apellidos} esta activo`, NgbToastType.Success);
          } else {
            this.toastShow(`${this.userUpdate.nombres} ${this.userUpdate.apellidos} esta inactivo`, NgbToastType.Warning);
          }
        }
      }
    });
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

  // ====== FILTRADO POR FECHAS

  pipe = new DatePipe('en-US');

  range = new FormGroup({
    dpStart: new FormControl(),
    dpEnd: new FormControl()
  });

  dpInicio = new FormControl();

  filterForDate() {

    const start = this.pipe.transform(this.range.value.dpStart, 'dd/MM/yyyy');
    const end = this.pipe.transform(this.range.value.dpEnd, 'dd/MM/yyyy');
    const dpinicio = this.pipe.transform(this.dpInicio.value, 'dd-MM-yyyy');

    console.log(`Inicio: ${start}`);
    console.log(`Final: ${end}`);
    console.log(`dpInicio: ${dpinicio}`);

  }


}
