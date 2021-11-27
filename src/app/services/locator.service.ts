import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CityList } from '../shared/city.config';
import { DistrictLocation } from '../models/district-location.model';

@Injectable({
  providedIn: 'root'
})
export class LocatorService {
  private apiUrl = 'https://gist.motc.gov.tw/gist_api/V3/Map/GeoLocating/'
  constructor(private http: HttpClient) { }

  getDistrict(locationY: number, locationX: number) {
    let params = {
      $format: 'JSON'
    }
    return this.http.get<DistrictLocation[]>(`${this.apiUrl}District/LocationX/${locationX}/LocationY/${locationY}`, { params }).pipe(
      // API 有時會掛掉所以取資料失敗會直接給預設值(臺北市)
      catchError(() => of([{
        City: CityList[4].City,
        CityName: CityList[4].CityName,
        TownCode: '',
        TownName: ''
      }]))
    ).toPromise();
  }
}
