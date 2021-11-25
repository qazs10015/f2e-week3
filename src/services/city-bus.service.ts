import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusA1Data } from 'src/models/bus-a1-data.model';

@Injectable({
  providedIn: 'root'
})
export class CityBusService {
  private apiUrl = 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/'
  constructor(private http: HttpClient) { }

  /** 取得批次更新的公車資料 */
  getRealTimeByFrequencyBus(city: string, keyword: string) {
    let params = {
      $format: 'JSON'
    }
    return this.http.get<BusA1Data[]>(this.apiUrl + city, { params }).toPromise();
  }
}
