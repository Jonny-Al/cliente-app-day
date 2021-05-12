import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/Model/Rol';
import { Util } from 'src/app/Utilidades/Util';

@Injectable({
  providedIn: 'root'
})
export class RolServiceService {

  headers = new HttpHeaders();
  url = `${Util.getUrl()}/rol`;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json'
    });
  }

  getListRoles() {
    return this.http.get<Rol[]>(`${this.url}/list`, { headers: this.headers });
  }

}
