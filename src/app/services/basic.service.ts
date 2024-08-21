import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCity } from '../models/basic-city.model';
import { catchError } from 'rxjs/operators';
import { CityList } from '../shared/city.config';

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  constructor(private http: HttpClient) {}

  /** 取得城市清單 */
  getCity() {
    return Promise.resolve(CityList);
  }
}
