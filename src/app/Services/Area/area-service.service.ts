import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from 'src/app/Model/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaServiceService {

  url = 'api/area';

  constructor(private http: HttpClient) { }

  getListAreas() {
    return this.http.get<Area[]>(`${this.url}/list`, { responseType: 'json' });
  }

  getFilterArea(area: string) {
    return this.http.get<Area[]>(`${this.url}/filter?area=${area}`, { responseType: 'json' });
  }

}
