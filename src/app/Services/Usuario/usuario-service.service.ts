import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { Usuario } from '../../Model/Usuario';
import { Util } from '../../Utilidades/Util';


@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {
  headers = new HttpHeaders();
  url = `${Util.getUrl()}/users`;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json'
    });
  }


  getListUsers() {
    return this.http.get<Usuario[]>(`${this.url}/list/assets`, { headers: this.headers });
  }

  addUser(us: Usuario) {
    return this.http.post(`${this.url}/add`, us, { responseType: 'json' });
  }

  updateUserInfoPersonal(usuario: Usuario) {
    return this.http.put(`${this.url}/update/information/Personal`, usuario, { responseType: 'json' });
  }

  searchUsuario(idus: number) {
    return this.http.get<Usuario>(`${this.url}/search/${idus}`);
  }

  deleteUser(uselimna: number) {
    return this.http.delete(`${this.url}/delete?id=${uselimna}`);
  }

  toasts: any[] = [];

  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast DOM element from view
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }


}