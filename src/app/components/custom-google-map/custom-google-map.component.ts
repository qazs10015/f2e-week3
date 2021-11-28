import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custom-google-map',
  templateUrl: './custom-google-map.component.html',
  styleUrls: ['./custom-google-map.component.scss']
})
export class CustomGoogleMapComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  /** 起點的 icon */
  startIcon = 'assets/icons/start.png';
  /** 終點的 icon */
  endIcon = 'assets/icons/end.png';
  /** 目前位置的經緯度 */
  currentPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  /** Bike 租借站的 marker */
  markerOptions: any;

  /** googleMap 的參數 */
  googleMapOptions = {} as google.maps.MapOptions;

  polyPath: google.maps.LatLngLiteral[] = [];

  /** 圖資 */
  polyOptions = {} as google.maps.PolylineOptions;

  /** 地圖縮放比例 */
  zoom = 17;

  startPosition = { lat: 0, lng: 0 } as google.maps.LatLngLiteral;
  endPosition = { lat: 0, lng: 0 } as google.maps.LatLngLiteral;
  constructor(private httpClient: HttpClient, private locationService: LocationService,) {
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
    this.startPosition = await this.locationService.getPosition();
    this.endPosition = await this.locationService.getPosition();
    debugger
  }

  private loadGoogleMapConfig() {
    this.markerOptions = { draggable: false, animation: google.maps.Animation.DROP };

    this.googleMapOptions = {
      disableDefaultUI: true,
      clickableIcons: true,
      disableDoubleClickZoom: true,
      draggable: true,
      zoomControl: true,
    }

    this.polyOptions = {
      strokeColor: '#f25c54',
      strokeOpacity: 1,
      strokeWeight: 7,
    };
  }

}
