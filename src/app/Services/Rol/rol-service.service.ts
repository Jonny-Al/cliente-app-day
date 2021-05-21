import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from 'src/app/Model/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolServiceService {

  url = 'api/rol';

  constructor(private http: HttpClient) { }

  getListRoles() {
    return this.http.get<Rol[]>(`${this.url}/list`, { responseType: 'json' });
  }

  getFilterRol(rol: string) {
    return this.http.get<Rol[]>(`${this.url}/filter?rol=${rol}`, { responseType: 'json' });
  }

}
