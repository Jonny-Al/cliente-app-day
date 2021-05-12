import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from 'src/app/Model/Area';
import { Util } from 'src/app/Utilidades/Util';

@Injectable({
  providedIn: 'root'
})
export class AreaServiceService {

  headers = new HttpHeaders();
  url = `${Util.getUrl()}/area`;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json'
    });
  }

  getListAreas() {
    return this.http.get<Area[]>(`${this.url}/list`, { headers: this.headers });
  }

}
