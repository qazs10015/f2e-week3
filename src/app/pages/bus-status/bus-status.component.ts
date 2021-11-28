import { RouteImageDialogComponent } from './../../dialogs/route-image-dialog/route-image-dialog.component';
import { MoreButtonDialogComponent } from './../../dialogs/more-button-dialog/more-button-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { forkJoin, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BusN1EstimateTime } from 'src/app/models/bus-n1-estimate-time.model';
import { BusRoute } from 'src/app/models/bus-route.model';
import { BaseCity } from '../../models/basic-city.model';
import { BasicService } from '../../services/basic.service';
import { CityBusService } from '../../services/city-bus.service';
import { LocationService } from '../../services/location.service';
import { LocatorService } from '../../services/locator.service';
import { BusVehicleInfo } from './../../models/bus-vehicle-info.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bus-status',
  templateUrl: './bus-status.component.html',
  styleUrls: ['./bus-status.component.scss']
})
export class BusStatusComponent implements OnInit {

  myForm = this.fb.group({
    city: this.fb.control(''),
    routeName: this.fb.control(''),
    vehicleType: this.fb.control(null)
  });


  private get cityFrmCtrl() {
    return this.myForm.get('city')!;
  }
  private get routeNameFrmCtrl() {
    return this.myForm.get('routeName')!;
  }

  options: BaseCity[] = [];
  // filteredOptions: Observable<BaseCity[]> = of([]);


  /** 鍵盤選項 */
  lstKeyboardBtn = [
    { displayName: '紅', className: 'keyboardRed' },
    { displayName: '藍', className: 'keyboardBlue' },
    { displayName: '1', className: 'keyboardLightGray' },
    { displayName: '2', className: 'keyboardLightGray' },
    { displayName: '3', className: 'keyboardLightGray' },
    { displayName: '棕', className: 'keyboardBrown' },
    { displayName: '綠', className: 'keyboardGreen' },
    { displayName: '4', className: 'keyboardLightGray' },
    { displayName: '5', className: 'keyboardLightGray' },
    { displayName: '6', className: 'keyboardLightGray' },
    { displayName: '黃', className: 'keyboardYellow' },
    { displayName: '橘', className: 'keyboardOrange' },
    { displayName: '7', className: 'keyboardLightGray' },
    { displayName: '8', className: 'keyboardLightGray' },
    { displayName: '9', className: 'keyboardLightGray' },
    { displayName: 'F', className: 'keyboardWhite' },
    { displayName: '更多', className: 'keyboardGray' },
    { displayName: 'C', className: 'keyboardLightGray' },
    { displayName: '0', className: 'keyboardLightGray' },
    { displayName: '', className: 'keyboardLightGray' },
  ]

  lstBusRoute: any[] = [];


  constructor(
    private fb: FormBuilder,
    private cityBusService: CityBusService,
    private locationService: LocationService,
    private locatorService: LocatorService,
    private BasicService: BasicService,
    private dialog: MatDialog,
    private router: Router) {

  }
  async ngOnInit() {
    // form 有異動就直接搜尋資料
    this.myForm.valueChanges.pipe(

      switchMap(formVal => {
        // 城市
        const city = formVal?.city ?? '';
        // 路線名稱
        const routeName = formVal?.routeName ?? '';
        // 無障礙車輛
        const vehicleType = formVal?.vehicleType;

        return forkJoin([
          this.cityBusService.getEstimatedTimeOfArrival(city, routeName, `PlateNumb ne '-1'`),
          this.cityBusService.getRoute(city, routeName),
          this.cityBusService.getVehicle(city, vehicleType)])
          .pipe(
            map((val: any[]) => {
              let lstBusN1EstimateTime = (val[0] as BusN1EstimateTime[]);
              let lstBusRoute = (val[1] as BusRoute[]);
              let lstBusVehicleInfo = (val[2] as BusVehicleInfo[]);
              debugger
              // 所有的即時資料的車牌號碼
              const lstPlantNumb = Array.from(new Set(lstBusN1EstimateTime.map(n1 => n1.PlateNumb)));
              const filterVehicle = lstPlantNumb.filter(pn => lstBusVehicleInfo.find(bv => bv.PlateNumb === pn))

              // 以 車牌 為群組名稱，群組化資料
              const newLstBusN1EstimateTime = filterVehicle.map(pn => {
                // 取出所有符合該車牌的資料
                const lstMatchPlantNumb = lstBusN1EstimateTime.filter(n1 => n1.PlateNumb === pn);

                return lstMatchPlantNumb
              });

              return lstBusRoute.filter(route => newLstBusN1EstimateTime.find(n1 => n1.find(nn1 => nn1.RouteUID === route.RouteUID)));
            })
          )
      }),
    ).subscribe(val => {
      console.log(val);
      this.lstBusRoute = val;
    });


    // 取得縣市清單
    this.options = await this.BasicService.getCity();
    // 取得目前座標
    const currentPos = await this.locationService.getPosition();
    // 取得目前行政區
    const currentDistrict = await this.locatorService.getDistrict(currentPos.lat, currentPos.lng);
    // 將目前行政區設為預設搜尋選項
    this.myForm.patchValue({ city: currentDistrict[0].City });


  }

  /** 退回鍵 */
  backSpace() {
    const currentRouteName: string = this.routeNameFrmCtrl?.value ?? '';

    this.routeNameFrmCtrl?.patchValue(currentRouteName.slice(0, currentRouteName.length - 1));
  }

  /** 搜尋資料 */
  search(routeName: string) {
    this.combineSearchString(routeName);
  }


  changeCity(e: any) {
    this.cityFrmCtrl.setValue(e.target.value)
  }

  showRouteImage(imageUrl: string) {
    const config: MatDialogConfig = {
      data: imageUrl,
      width: '60vw',
      // height: '60vh'
    }
    const ref = this.dialog.open(RouteImageDialogComponent, config);
    ref.afterClosed().subscribe(routeName => {
      if (routeName) {
        this.combineSearchString(routeName);
      }

    })

  }

  showMoreBtn() {
    const config: MatDialogConfig = {
      width: '60vw',
      height: '60vh'
    }
    const ref = this.dialog.open(MoreButtonDialogComponent, config);
    ref.afterClosed().subscribe(routeName => {
      if (routeName) {
        this.combineSearchString(routeName);
      }

    })
  }

  addfavarite() {

  }

  redirect(routeName: string) {
    this.router.navigate(['/busStatus', this.myForm.get('city')?.value, routeName])
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

  // private _filter(value: string): BaseCity[] {
  //   let result = [];
  //   if (value) {
  //     const filterValue = value;
  //     result = this.options.filter(option => option.CityName.includes(filterValue))
  //   } else {
  //     result = this.options;
  //   }
  //   return result;
  // }

}

