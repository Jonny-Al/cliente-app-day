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
    responseType: 'json',
    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxTHBteTFfLWliRkxwQXFSZndLUzZaQmpLWUJ4VVBaSmpYcmpGTVBOdzNzIn0.eyJleHAiOjE2MjE1NjA4MjIsImlhdCI6MTYyMTU2MDUyMiwianRpIjoiNzUzNTc5MDEtZGMxOC00NzZmLTlkYzUtMDk1NDQ1ZDlkYWQ2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3R1dG9yaWFsIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjRlMGIxN2U1LTM1Y2QtNGE5NS1hMWM5LTNjZWFiNWRkMjdhZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwaS1yZXN0LWJhY2tlbmQiLCJzZXNzaW9uX3N0YXRlIjoiM2I4MzZhOWEtNDAyZS00N2ZlLTk3NjMtOGYzNjRmNWYxMDUwIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJyZWFsbS11c2VyIiwicmVhbG0tYWRtaW4iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBbGVqYW5kcm8gR2FyY2lhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJnaXZlbl9uYW1lIjoiQWxlamFuZHJvIiwiZmFtaWx5X25hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImFAYS5jb20ifQ.dJtHe8BvW8Vsi7eGT0R9tlijlaYpWS7KUGAlHIJ74wtz5Clr3Zf9zjCaQOcm47V90DaRPqwIxjjn_W0LCSgtUf30z_3rW9RimlesHFwPK81nhKfw3msogC9qbz5hGJyuo4x7CJgey-kSv4xCkk-KvXl8YjJl6LjwAiCUmSoDe8TNyZLxX0LU5Yz4ZXS7_d6uynfZkjaNv_wDLQj26gpgJ_hzFroKQBn2aNQVTMSRImKFjSCwJLL8Pz_gcFkj0YgLIMnMoi3d3SiWrYDgdXHbwo_fSJdSytgUrjkb4SaDcAFAcfsqdkp378UjFPg23O2L3ckuAPhne0ya9VdjAJNeBw'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  url = `${Util.getUrl()}/users`;

  constructor(private http: HttpClient) { }

  getListUsers() {
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
