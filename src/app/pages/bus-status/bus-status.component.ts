import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';
import { KeyboardDialogComponent } from './../../dialogs/keyboard-dialog/keyboard-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BusN1EstimateTime } from 'src/app/models/bus-n1-estimate-time.model';
import { BusRoute } from 'src/app/models/bus-route.model';
import { UtilityService } from 'src/app/services/utility.service';
import { BaseCity } from '../../models/basic-city.model';
import { BasicService } from '../../services/basic.service';
import { CityBusService } from '../../services/city-bus.service';
import { LocationService } from '../../services/location.service';
import { LocatorService } from '../../services/locator.service';
import { MoreButtonDialogComponent } from './../../dialogs/more-button-dialog/more-button-dialog.component';
import { RouteImageDialogComponent } from './../../dialogs/route-image-dialog/route-image-dialog.component';
import { ScheduleListDialogComponent } from './../../dialogs/schedule-list-dialog/schedule-list-dialog.component';
import { BusVehicleInfo } from './../../models/bus-vehicle-info.model';
import { BusA1Data } from 'src/app/models/bus-a1-data.model';

@Component({
  selector: 'app-bus-status',
  templateUrl: './bus-status.component.html',
  styleUrls: ['./bus-status.component.scss'],
})
export class BusStatusComponent implements OnInit {
  myForm = this.fb.group({
    city: this.fb.control(''),
    routeName: this.fb.control(''),
    vehicleType: this.fb.control(null),
  });

  private get cityFrmCtrl() {
    return this.myForm.get('city')!;
  }
  private get routeNameFrmCtrl() {
    return this.myForm.get('routeName')!;
  }

  options: BaseCity[] = [];
  // filteredOptions: Observable<BaseCity[]> = of([]);

  lstBusRoute: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cityBusService: CityBusService,
    private locationService: LocationService,
    private locatorService: LocatorService,
    private BasicService: BasicService,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    private router: Router,

    private deviceDetectorService: DeviceDetectorService
  ) {}
  async ngOnInit() {
    // form 有異動就直接搜尋資料
    this.myForm.valueChanges
      .pipe(
        switchMap((formVal) => {
          // 城市
          const city = formVal?.city ?? '';
          // 路線名稱
          const routeName = formVal?.routeName ?? '';
          // 無障礙車輛
          const vehicleType = formVal?.vehicleType;

          return forkJoin([
            this.cityBusService.getRoute(city, routeName),
            this.cityBusService.getRealTimeByFrequency(city, routeName),
            // this.cityBusService.getVehicle(city, vehicleType),
          ]).pipe(
            map((val: any[]) => {
              let lstBusRoute = val[0] as BusRoute[];
              let lstBusRealTimeInfo = val[1] as BusA1Data[];
              // let lstBusVehicleInfo = val[2] as BusVehicleInfo[];

              // 所有的即時資料的車牌號碼
              const lstPlantNumb = Array.from(
                new Set(lstBusRealTimeInfo.map((item) => item.PlateNumb))
              );
              // const filterVehicle = lstPlantNumb.filter((pn) =>
              //   lstBusVehicleInfo.find((bv) => bv.PlateNumb === pn)
              // );

              // 以 車牌 為群組名稱，群組化資料
              // const newLstBusN1EstimateTime = filterVehicle.map((pn) => {
              //   // 取出所有符合該車牌的資料
              //   const lstMatchPlantNumb = lstBusRealTimeInfo.filter(
              //     (item) => item.PlateNumb === pn
              //   );

              //   return lstMatchPlantNumb;
              // });

              return lstBusRoute;
            })
          );
        })
      )
      .subscribe((val) => {
        console.log(val);
        this.lstBusRoute = val;
      });

    // 取得縣市清單
    this.options = await this.BasicService.getCity();
    // 取得目前座標
    const currentPos = await this.locationService.getPosition();
    // 取得目前行政區
    const currentDistrict = await this.locatorService.getDistrict(
      currentPos.lat,
      currentPos.lng
    );
    // 將目前行政區設為預設搜尋選項
    this.myForm.patchValue({ city: currentDistrict[0].City });
  }

  /** 退回鍵 */
  backSpace() {
    const currentRouteName: string = this.routeNameFrmCtrl?.value ?? '';

    this.routeNameFrmCtrl?.patchValue(
      currentRouteName.slice(0, currentRouteName.length - 1)
    );
  }

  /** 搜尋資料 */
  search(routeName: string) {
    this.combineSearchString(routeName);
  }

  changeCity(e: any) {
    this.cityFrmCtrl.setValue(e.target.value);
  }

  showRouteImage(imageUrl: string) {
    const config: MatDialogConfig = {
      data: imageUrl,
      width: '90vw',
      height: '80vh',
    };
    const ref = this.dialog.open(RouteImageDialogComponent, config);
  }

  showMoreBtn() {
    const config: MatDialogConfig = {
      width: '90vw',
      height: '60vh',
    };
    const ref = this.dialog.open(MoreButtonDialogComponent, config);
    ref.afterClosed().subscribe((routeName) => {
      if (routeName) {
        this.combineSearchString(routeName);
      }
    });
  }

  changeFavoriteClass(city: string, routeName: string) {
    return this.utilityService.isSaveFavorite(city, routeName)
      ? 'fas fa-heart red'
      : 'far fa-heart';
  }

  /** 加入收藏 */
  addFavorite(routeName: string) {
    this.utilityService.addOrRemoveFavorite(
      this.myForm.get('city')?.value,
      routeName
    );
  }

  /** 導頁 */
  redirect(routeName: string) {
    this.router.navigate([
      '/busStatus',
      this.myForm.get('city')?.value,
      routeName,
    ]);
  }

  /** 班表 */
  async showScheduleList(routeName: string) {
    const lstSchedule = await this.cityBusService.getScheduleList(
      this.myForm.get('city')?.value,
      routeName
    );

    const timeTables = lstSchedule.map((item) => item.Timetables);
    // timeTables.map(t => t.map(item => item.StopTimes))
    const sortTimeTables = timeTables.map((item) =>
      item.sort((a, b) => Number(a.TripID) - Number(b.TripID))
    );
    const stopTimes = sortTimeTables.map((st) =>
      st.map((item) => item.StopTimes)
    );
    const newStopTimes = stopTimes.map((stopTimes) => {
      // 取得目的地名稱
      const stopName = stopTimes.find((stItem) => stItem[0].StopName.Zh_tw)![0]
        .StopName.Zh_tw;
      const lstArrivalTime = stopTimes.map(
        (stItem) => stItem.map((item) => item.ArrivalTime)[0]
      );
      return { stopName, lstArrivalTime };
    });

    const config: MatDialogConfig = {
      data: newStopTimes,
      width: '90vw',
      // height: '60vh'
    };
    const ref = this.dialog.open(ScheduleListDialogComponent, config);
  }

  showKeyboard() {
    const deviceType = this.deviceDetectorService.getDeviceInfo().deviceType;
    if (deviceType !== DeviceType.Desktop) {
      const config: MatDialogConfig = {
        width: 'auto',
        height: '47vh',
        position: {
          bottom: '4vh',
        },
        hasBackdrop: false,
      };
      const ref = this.dialog.open(KeyboardDialogComponent, config);
      ref.afterOpened().subscribe(() => {
        // 開啟 dialog 後取得實體，並訂閱事件
        ref.componentInstance.backSpaceEvent.subscribe(() => this.backSpace());
        ref.componentInstance.resetEvent.subscribe(() =>
          this.myForm.get('routeName')?.reset()
        );
        ref.componentInstance.showMoreEvent.subscribe(() => this.showMoreBtn());
        ref.componentInstance.searchEvent.subscribe((val) => this.search(val));
      });
    }
  }

  /** 組合搜尋字串 */
  private combineSearchString(routeName: string) {
    const currentRouteName = this.routeNameFrmCtrl?.value ?? '';
    if (isNaN(Number(routeName))) {
      this.routeNameFrmCtrl?.patchValue(routeName);
    } else {
      this.routeNameFrmCtrl?.patchValue(currentRouteName + routeName);
    }
  }
}
