
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusA1Data } from '../models/bus-a1-data.model';
import { BusN1EstimateTime } from '../models/bus-n1-estimate-time.model';
import { BusRoute } from '../models/bus-route.model';
import { BusShape } from '../models/bus-shape.model';
import { BusStopOfRoute } from '../models/bus-stop-of-route.model';
import { BusVehicleInfo } from '../models/bus-vehicle-info.model';

@Injectable({
  providedIn: 'root'
})
export class CityBusService {
  private apiUrl = 'https://ptx.transportdata.tw/MOTC/v2/Bus/'
  constructor(private http: HttpClient) { }

  /** 取得批次更新的公車資料 */
  getRealTimeByFrequency(city: string, routeName = '', keyword = '') {
    let params: any = {
      $format: 'JSON'
    }
    let url = `${this.apiUrl}RealTimeByFrequency/City/${city}`;

    if (routeName) {
      url += `/${routeName}`;
    }

    if (keyword) {
      params['$filter'] = keyword;
    }

    return this.http.get<BusA1Data[]>(url, { params }).toPromise();
  }

  /** 取得批次更新的預估公車到站資料 */
  getEstimatedTimeOfArrival(city: string, routeName = '', keyword = '') {
    let params: any = {
      $format: 'JSON'
    }
    let url = `${this.apiUrl}EstimatedTimeOfArrival/City/${city}`;

    if (routeName) {
      url += `/${routeName}`;
    }

    if (keyword) {
      params['$filter'] = keyword;
    }

    return this.http.get<BusN1EstimateTime[]>(url, { params });
  }


  /** 取得公車路線 */
  getRoute(city: string, routeName = '') {
    let params: any = {
      $format: 'JSON'
    }

    let url = `${this.apiUrl}Route/City/${city}`;

    if (routeName) {
      url += `/${routeName}`;
    }
    return this.http.get<BusRoute[]>(url, { params }).toPromise();
  }

  /** 取得車輛資料
   * 0：一般
   * 1：無障礙
   */
  getVehicle(city: string, vehicleType: boolean) {
    let params: any = {
      $format: 'JSON',
    }

    if (vehicleType) {
      params['$filter'] = `VehicleType eq 1`
    }

    return this.http.get<BusVehicleInfo[]>(`${this.apiUrl}Vehicle/City/${city}`, { params }).toPromise();
  }

  /** 取得站序資料 */
  getStops(city: string, routeName = '') {
    let params: any = {
      $format: 'JSON'
    }

    let url = `${this.apiUrl}StopOfRoute/City/${city}`;

    if (routeName) {
      url += `/${routeName}`;
    }
    return this.http.get<BusStopOfRoute[]>(url, { params }).toPromise();
  }

  /** 市區公車之線型資料 */
  getBusShape(city: string, routeName = '') {
    let params: any = {
      $format: 'JSON'
    }

    let url = `${this.apiUrl}Shape/City/${city}`;

    if (routeName) {
      url += `/${routeName}`;
    }
    return this.http.get<BusShape[]>(url, { params }).toPromise();
  }

}
