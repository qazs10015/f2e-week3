import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CityBusService } from 'src/app/services/city-bus.service';
import { LocationService } from 'src/app/services/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custom-google-map',
  templateUrl: './custom-google-map.component.html',
  styleUrls: ['./custom-google-map.component.scss']
})
export class CustomGoogleMapComponent implements OnInit {


  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  apiLoaded: Observable<boolean>;


  currentSelectInfoWindow: any = {};
  /** 目前位置的經緯度 */
  currentPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  /** bus 站點的 marker */
  markerOptions = {} as google.maps.MarkerOptions;

  /** 目前 bus 位置的 marker */
  currentBusMarkerOption = {} as google.maps.MarkerOptions;

  /** googleMap 的參數 */
  googleMapOptions = {} as google.maps.MapOptions;

  polyPath: google.maps.LatLngLiteral[] = [];

  /** 圖資 */
  polyOptions = {} as google.maps.PolylineOptions;

  /** 地圖縮放比例 */
  zoom = 13;

  startPosition = { lat: 0, lng: 0 } as google.maps.LatLngLiteral;
  // endPosition = { lat: 0, lng: 0 } as google.maps.LatLngLiteral;

  stopMarkers: any[] = [];

  /** 目前行駛方向
   *  0：去
   *  1：返
   */
  private _currentDirection = 0;

  @Input() set currentDirection(val: number) {
    this._currentDirection = val;
  }

  /** 所有站點的即時資料 */
  private _lstStopData: any[] = [];
  @Input() set lstStopData(val: any[]) {
    if (val.length > 0) {

      this._lstStopData = val;

      // 整理所有站點的位置
      this.stopMarkers = this._lstStopData.map(item => {
        return {
          isCommingBus: item.estimateTime === 0,
          stopPos: { lat: item.stopPos.PositionLat, lng: item.stopPos.PositionLon },
          stopName: item.stopName,
          statusMsg: item.statusMsg
        }
      });

      // 取第一個站位當作起始位置
      if (this.startPosition.lat === 0) {

        this.startPosition = this.stopMarkers[0].stopPos;
      }


    }

  }
  constructor(
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    private cityBusService: CityBusService) {
    this.apiLoaded = this.httpClient.jsonp(environment.googleMap, 'callback')
      .pipe(
        tap(() => {
          this.loadGoogleMapConfig();
        }),
        map(() => true),
        catchError(() => of(false)),
      );
  }


  async ngOnInit() {

    // this.currentDirection = changes['currentDirection']?.currentValue;
    const city = this.router.snapshot.paramMap.get('city') ?? '';
    const routeName = this.router.snapshot.paramMap.get('routeName') ?? '';
    const shape = await this.cityBusService.getBusShape(city, routeName);

    // LINESTRING((121.508405511567 25.0378847666251,121.508504751296 25.0382006816341))
    // 移除掉不需要的字元
    const infoList: string[] = shape[this._currentDirection].Geometry.replace('LINESTRING', '').replace(/\(+/gm, '').replace(/\)+/gm, '').split(',');

    // 整理路線資料
    this.polyPath = infoList.map(info => {
      const coordinate = info.split(' ');
      return { lat: Number(coordinate[1]), lng: Number(coordinate[0]) };
    });




  }

  openInfoWindow(marker: MapMarker, stopStatus: any) {
    this.currentSelectInfoWindow = stopStatus;
    console.log(stopStatus);
    this.infoWindow.open(marker);
  }

  private loadGoogleMapConfig() {
    // 一般站位的 marker
    this.markerOptions = {
      draggable: false,
      // animation: google.maps.Animation.DROP,
      icon: {
        labelOrigin: new google.maps.Point(0, 0),
        fillOpacity: 1,
        fillColor: 'red',
        strokeColor: 'red',
        strokeWeight: 8,
        scale: 6,
        path: google.maps.SymbolPath.CIRCLE
      } as google.maps.Symbol,
    };

    // 目前 bus 位置的 marker
    this.currentBusMarkerOption = {
      draggable: false,
      animation: google.maps.Animation.BOUNCE,
      icon: 'assets/icons/small_bus.png'
    }

    // 地圖選項設定
    this.googleMapOptions = {
      disableDefaultUI: true,
      clickableIcons: true,
      disableDoubleClickZoom: true,
      draggable: true,
      zoomControl: true,
    }

    // 線圖設定
    this.polyOptions = {
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: 5,
    };
  }

}
