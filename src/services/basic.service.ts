import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCity } from 'src/models/basic-city.model';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  private apiUrl = 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/'
  constructor(private http: HttpClient) { }

  getCity() {
    return this.http.get<BaseCity[]>(this.apiUrl + 'City').toPromise();
  }
}
