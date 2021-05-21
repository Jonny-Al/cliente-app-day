import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Usuario } from '../../Model/Usuario';
import { Util } from '../../Utilidades/Util';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT',
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  url = `${Util.getUrl()}/users`;

  constructor(private http: HttpClient) { }

  getListUsers() {
    //==== Esta sollicitud es de preba pero funciona - Es de Keycloak para obtener la info del usuario enviando el token del HttpInterceptor
    this.http.get<any>('http://localhost:8080/auth/realms/tutorial/protocol/openid-connect/userinfo').subscribe({
      next: (response: any) => {
        console.log('Response información usuario por token a keycloak: ', response);
      }, error(response: any) {
        console.log('Error al obtener info de usuario http a Keycloak: ', response);
      }
    });

    // Este da error es un api la cual esta en Spring Boot el error lo dejare debajo
    return this.http.get<Usuario[]>(`${this.url}/list/all`).pipe(catchError(this.handleError));
  }

  addUser(usuario: Usuario) {
    return this.http.post(`${this.url}/add`, usuario, httpOptions).pipe(catchError(this.handleError));
  }

  updateUserInfo(usuario: Usuario, type: String) {
    return this.http.put(`${this.url}/update/information/${type}`, usuario, httpOptions).pipe(catchError(this.handleError));
  }

  updateStatusUser(status: number, id: number) {
    return this.http.put(`${this.url}/update/status/${status}?id=${id}`, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  searchUsuario(idus: number) {
    return this.http.get<Usuario>(`${this.url}/search/${idus}`, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  deleteUser(uselimna: number) {
    return this.http.delete(`${this.url}/delete?id=${uselimna}`, { responseType: 'json' }).pipe(catchError(this.handleError));
  }

  // =============== CONTROL DE ERRORES HTTP

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ocurrio un error en service Usuario:', error.error);
    } else {
      console.error(
        `Backend return code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Algo salio mal por favor intentelo mas tarde');
  }
}
