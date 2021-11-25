import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DistrictLocation } from 'src/models/district-location.model';

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
    return this.http.get<DistrictLocation[]>(`${this.apiUrl}District/LocationX/${locationX}/LocationY/${locationY}`, { params }).toPromise();
  }
}
