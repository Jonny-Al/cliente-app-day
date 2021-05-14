import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<Usuario[]>(`${this.url}/list/all`, { headers: this.headers });
  }

  addUser(us: Usuario) {
    return this.http.post(`${this.url}/add`, us, { headers: this.headers });
  }

  updateUserInfo(usuario: Usuario, type: String) {
    return this.http.put(`${this.url}/update/information/${type}`, usuario, { headers: this.headers });
  }

  updateStatusUser(status: number, id: number) {
    return this.http.put(`${this.url}/update/status/${status}?id=${id}`, null, { headers: this.headers });
  }

  searchUsuario(idus: number) {
    return this.http.get<Usuario>(`${this.url}/search/${idus}`);
  }

  deleteUser(uselimna: number) {
    return this.http.delete(`${this.url}/delete?id=${uselimna}`);
  }
}
