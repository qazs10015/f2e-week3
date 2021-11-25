import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusA1Data } from 'src/models/bus-a1-data.model';

@Injectable({
  providedIn: 'root'
})
export class CityBusService {
  private apiUrl = 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/Streaming/City'
  constructor(private http: HttpClient) { }

  getRealTimeByFrequencyBus(city: string) {
    return this.http.get<BusA1Data[]>(this.apiUrl + city).toPromise();
  }
}
