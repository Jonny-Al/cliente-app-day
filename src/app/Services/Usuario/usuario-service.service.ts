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
    responseType: 'json'
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {
  headers = new HttpHeaders();
  url = `${Util.getUrl()}/users`;

  constructor(private http: HttpClient) {

  }

  getListUsers() {
    return this.http.get<Usuario[]>(`${this.url}/list/all`, { responseType: 'json' }).pipe(catchError(this.handleError));
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
