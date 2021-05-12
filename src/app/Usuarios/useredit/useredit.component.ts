import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/Model/Usuario';
import { UsuarioServiceService } from 'src/app/Services/Usuario/usuario-service.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  constructor(private serviceUsuario: UsuarioServiceService, private activatedRoute: ActivatedRoute, private router: Router) { }
  usInfo: Usuario = new Usuario();

  ngOnInit(): void {
    let idus = this.activatedRoute.snapshot.params['usuario'];

    this.serviceUsuario.searchUsuario(idus).subscribe({
      next: (response: any) => {
        this.usInfo = response;
      }, error: () => {
        console.log('Error al obtener el usuario: ')
        this.router.navigate(['usuarios']);
      }
    });
  }

}
