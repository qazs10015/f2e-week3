import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCity } from '../models/basic-city.model';
import { catchError } from 'rxjs/operators';
import { CityList } from '../shared/city.config';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  private apiUrl = 'https://gist.motc.gov.tw/gist_api/V3/Map/Basic/'
  constructor(private http: HttpClient) { }

  // 有時候 API 會掛掉
  getCity() {
    return this.http.get<BaseCity[]>(this.apiUrl + 'City').pipe(
      // API 有時會掛掉所以取資料失敗會直接給已預先儲存的城市清單
      catchError(() => of(CityList))
    ).toPromise();
  }








}
