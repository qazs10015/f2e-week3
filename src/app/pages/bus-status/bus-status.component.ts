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

    private deviceDetectorService: DeviceDetectorService) {

  }
  async ngOnInit() {
    // form ??????????????????????????????
    this.myForm.valueChanges.pipe(

      switchMap(formVal => {
        // ??????
        const city = formVal?.city ?? '';
        // ????????????
        const routeName = formVal?.routeName ?? '';
        // ???????????????
        const vehicleType = formVal?.vehicleType;

        return forkJoin([
          this.cityBusService.getRoute(city, routeName),
          this.cityBusService.getVehicle(city, vehicleType),
          this.cityBusService.getRealTimeByFrequency(city, routeName)
        ])
          .pipe(
            map((val: any[]) => {
              let lstBusRoute = (val[0] as BusRoute[]);
              let lstBusVehicleInfo = (val[1] as BusVehicleInfo[]);
              let lstBusRealTimeInfo = (val[2] as BusA1Data[]);

              // ????????????????????????????????????
              const lstPlantNumb = Array.from(new Set(lstBusRealTimeInfo.map(item => item.PlateNumb)));
              const filterVehicle = lstPlantNumb.filter(pn => lstBusVehicleInfo.find(bv => bv.PlateNumb === pn))


              // ??? ?????? ?????????????????????????????????
              const newLstBusN1EstimateTime = filterVehicle.map(pn => {
                // ????????????????????????????????????
                const lstMatchPlantNumb = lstBusRealTimeInfo.filter(item => item.PlateNumb === pn)

                return lstMatchPlantNumb
              });

              return lstBusRoute.filter(route => newLstBusN1EstimateTime.find(item => item.find(info => info.RouteUID === route.RouteUID)));
            })
          )
      }),
    ).subscribe(val => {
      console.log(val);
      this.lstBusRoute = val;
    });


    // ??????????????????
    this.options = await this.BasicService.getCity();
    // ??????????????????
    const currentPos = await this.locationService.getPosition();
    // ?????????????????????
    const currentDistrict = await this.locatorService.getDistrict(currentPos.lat, currentPos.lng);
    // ??????????????????????????????????????????
    this.myForm.patchValue({ city: currentDistrict[0].City });


  }

  /** ????????? */
  backSpace() {
    const currentRouteName: string = this.routeNameFrmCtrl?.value ?? '';

    this.routeNameFrmCtrl?.patchValue(currentRouteName.slice(0, currentRouteName.length - 1));
  }

  /** ???????????? */
  search(routeName: string) {
    this.combineSearchString(routeName);
  }


  changeCity(e: any) {
    this.cityFrmCtrl.setValue(e.target.value)
  }

  showRouteImage(imageUrl: string) {
    const config: MatDialogConfig = {
      data: imageUrl,
      width: '90vw',
      height: '80vh',
    }
    const ref = this.dialog.open(RouteImageDialogComponent, config);
  }

  showMoreBtn() {
    const config: MatDialogConfig = {
      width: '90vw',
      height: '60vh'
    }
    const ref = this.dialog.open(MoreButtonDialogComponent, config);
    ref.afterClosed().subscribe(routeName => {
      if (routeName) {
        this.combineSearchString(routeName);
      }

    })
  }

  changeFavoriteClass(city: string, routeName: string) {
    return this.utilityService.isSaveFavorite(city, routeName) ? 'fas fa-heart red' : 'far fa-heart';
  }

  /** ???????????? */
  addFavorite(routeName: string) {
    this.utilityService.addOrRemoveFavorite(this.myForm.get('city')?.value, routeName);
  }


  /** ?????? */
  redirect(routeName: string) {
    this.router.navigate(['/busStatus', this.myForm.get('city')?.value, routeName])
  }

  /** ?????? */
  async showScheduleList(routeName: string) {

    const lstSchedule = await this.cityBusService.getScheduleList(this.myForm.get('city')?.value, routeName);

    const timeTables = lstSchedule.map(item => item.Timetables);
    // timeTables.map(t => t.map(item => item.StopTimes))
    const sortTimeTables = timeTables.map(item => item.sort((a, b) => (Number(a.TripID) - Number(b.TripID))))
    const stopTimes = sortTimeTables.map(st => st.map(item => item.StopTimes));
    const newStopTimes = stopTimes.map(stopTimes => {
      // ?????????????????????
      const stopName = stopTimes.find(stItem => stItem[0].StopName.Zh_tw)![0].StopName.Zh_tw;
      const lstArrivalTime = stopTimes.map(stItem => stItem.map(item => item.ArrivalTime)[0]);
      return { stopName, lstArrivalTime }
    });

    const config: MatDialogConfig = {
      data: newStopTimes,
      width: '90vw',
      // height: '60vh'
    }
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
        hasBackdrop: false
      }
      const ref = this.dialog.open(KeyboardDialogComponent, config);
      ref.afterOpened().subscribe(() => {
        // ?????? dialog ?????????????????????????????????
        ref.componentInstance.backSpaceEvent.subscribe(() => this.backSpace());
        ref.componentInstance.resetEvent.subscribe(() => this.myForm.get('routeName')?.reset());
        ref.componentInstance.showMoreEvent.subscribe(() => this.showMoreBtn());
        ref.componentInstance.searchEvent.subscribe((val) => this.search(val));
      });
    }

  }

  /** ?????????????????? */
  private combineSearchString(routeName: string) {
    const currentRouteName = this.routeNameFrmCtrl?.value ?? '';
    if (isNaN(Number(routeName))) {
      this.routeNameFrmCtrl?.patchValue(routeName);
    } else {
      this.routeNameFrmCtrl?.patchValue(currentRouteName + routeName);
    }
  }

}

